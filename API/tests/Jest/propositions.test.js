require('dotenv').config();

const session = require('supertest-session');
const app = require('../../app');

const registeredUser = { pseudo: process.env.USER_PSEUDO, password: process.env.USER_PW };
const registeredUser1 = { pseudo: process.env.USER_PSEUDO1, password: process.env.USER_PW1 };
const registeredUserId = 1;
const registeredUserId1 = 35;

const adminUser = { pseudo: process.env.ADMIN_PSEUDO, password: process.env.ADMIN_PW };
const publishingDate = { publishing_date: '2022-06-06' };
const publishingDate1 = { publishing_date: '2022-05-30' };

// Mat-Mat
const userSession = session(app);
// Benoît Safari
const userSession1 = session(app);
// Yves Signal
const adminSession = session(app);

describe('API e2e', () => {
  describe('Propositions routes', () => {
    beforeAll(async () => {
      await userSession.post('/v1/users/login').send(registeredUser);
      await userSession1.post('/v1/users/login').send(registeredUser1);
      await adminSession.post('/v1/users/login').send(adminUser);
    });
    it("Should get a 400 because user can't publish a new movie for now", async () => {
      const response = await userSession1.get(`/v1/propositions/hasPendingProposition/${registeredUserId1}`);
      expect(response.status).toBe(400);
    });
    it("Should get true because the user doesn't have a pending proposition", async () => {
      const response = await userSession.get(`/v1/propositions/hasPendingProposition/${registeredUserId}`);
      expect(response.status).toBe(200);
      expect(response.text).toContain('false');
    });
    it('Should get all available slots, logged as user (no proposition pending)', async () => {
      const response = await userSession.get('/v1/propositions/availableSlots');
      expect(response.status).toBe(200);
      expect(response.text).toContain('season_number');
    });
    it('Should get all the pending propositions, logged as admin', async () => {
      const response = await adminSession.get('/v1/propositions/pendingPropositions');
      expect(response.status).toBe(200);
    });
    it("Should get the user's pending proposition, logged as user", async () => {
      const response = await userSession1.get(`/v1/propositions/${registeredUserId1}`);
      expect(response.status).toBe(200);
    });
    it('Should get a 400, because this slot is already taken', async () => {
      const response = await userSession.put('/v1/propositions/book').send(publishingDate1);
      expect(response.status).toBe(400);
    });
    it('Should book a slot, logged as user, with no proposition pending', async () => {
      const response = await userSession.put('/v1/propositions/book').send(publishingDate);
      expect(response.status).toBe(201);
    });
    afterAll(async () => {
      await adminSession.put('/v1/propositions/unbook').send(publishingDate);
    });
  });
});
