require('dotenv').config();

const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

const request = supertest(app);
const newUserSession = session(app);
const userSession = session(app);
const adminSession = session(app);

const newUser = { pseudo: 'Test', mail: 'Test@test.fr', password: 'Test' };
let newUserId;
const newUserLogin = { pseudo: 'Test', password: 'Test' };
const modifiedNewUser = { oldPassword: 'Test', mail: 'maibidon+tetedecon' };

const registeredUser = { pseudo: process.env.USER_PSEUDO, password: process.env.USER_PW };
const adminUser = { pseudo: process.env.ADMIN_PSEUDO, password: process.env.ADMIN_PW };

describe('API e2e', () => {
  describe('Users routes', () => {
    it('Should register a new user in database', async () => {
      const response = await request.post('/v1/users/register').send(newUser);
      expect(response.status).toBe(201);
      expect(response.text).toContain('Utilisateur enregistré avec succès');
    });
    it('Should send an error because user already exists', async () => {
      const response = await request.post('/v1/users/register').send(newUser);
      expect(response.status).toBe(400);
      expect(response.text).toContain('Ce pseudo ou cet email sont déjà enregistrés.');
    });
    it('Should log the new user', async () => {
      const response = await newUserSession.post('/v1/users/login').send(newUserLogin);
      newUserId = response.body.id;
      expect(response.status).toBe(200);
    });
    it('Should update a user with new mail', async () => {
      const response = await newUserSession.put(`/v1/users/modify/${newUserId}`).send(modifiedNewUser);
      expect(response.status).toBe(201);
    });
    it('Should log a user', async () => {
      const response = await userSession.post('/v1/users/login').send(registeredUser);
      console.log(response.body);
      expect(response.status).toBe(200);
    });
    it('Should see its own user infos', async () => {
      const response = await userSession.get('/v1/users/1');
      expect(response.status).toBe(200);
      expect(response.text).toContain('mail');
    });
    it('Should see another user infos', async () => {
      const response = await userSession.get('/v1/users/2');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Yves Signal');
    });
    it('Should log the admin', async () => {
      const response = await adminSession.post('/v1/users/login').send(adminUser);
      expect(response.status).toBe(200);
    });
    it('Should see all user infos', async () => {
      const response = await adminSession.get('/v1/users');
      expect(response.status).toBe(200);
    });
    it('Should update the user Test privileges to admin', async () => {
      const response = await adminSession.put(`/v1/users/togglePrivileges/${newUserId}`);
      console.log(response.body);
      expect(response.status).toBe(201);
      expect(response.text).toContain("Droits de l'utilisateur");
    });
    it('Should update the user Test privileges back to user', async () => {
      const response = await adminSession.put(`/v1/users/togglePrivileges/${newUserId}`);
      expect(response.status).toBe(201);
      expect(response.text).toContain("Droits de l'utilisateur");
    });
    it('Should delete the user Test', async () => {
      const response = await adminSession.delete(`/v1/users/${newUserId}`);
      expect(response.status).toBe(200);
      expect(response.text).toContain('supprimé');
    });
    it('Should not log the deleted user', async () => {
      const response = await request.post('/v1/users/login').send(newUserLogin);
      expect(response.status).toBe(400);
      expect(response.text).toContain("L'utilisateur demandé n'existe pas");
    });
  });
});
