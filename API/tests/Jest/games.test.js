require('dotenv').config();

const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);

const session = require('supertest-session');
let testSession = session(app);

describe("API e2e", ()=>{
  beforeEach(function(done){
    testSession.post('/v1/users/login')
      .send({pseudo: "Tutu",password: "test"})
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  })
  describe('Games routes', ()=>{
    it('Should get all games in database', async() => {
      const response = await request.get('/v1/games');
      expect(response.status).toBe(200);
    });
    it('Should get game details from game ID', async() => {
      let gameId = 21;
      const response = await request.get('/v1/games/' + gameId);
      expect(response.status).toBe(200);
      expect (response.text).toContain("Metroid Dread");
    });
    it('Should get a game object from RAWG API', async() => {
      let game = 
        {
          platformId: 7,
          gameTitle: "Super Mario Odyssey",
        };
      const response = await testSession.post('/v1/games/newgame').send({...game});
      expect(response.status).toBe(200);
      expect(response.text).toContain("{\"name\":\"Super Mario Odyssey\",\"platforms\":[\"Nintendo Switch\"],\"released\":\"2017-10-27\",\"background_image\":\"https://media.rawg.io/media/games/267/267bd0dbc496f52692487d07d014c061.jpg\",\"genres\":[\"Platformer\",\"Arcade\"]}");
    });
    it('Should post a new game to DB', async() => {
      game = 
        {
          name: "Metroid Prime 18",
          platforms: ["Nintendo Switch"],
          released: "2014-02-23",
          background_image: "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
          genres: ["Platformer","Action"]
        };
      const response = await testSession.post('/v1/games/').send({...game});
      expect(response.status).toBe(201);
      expect(response.text).toContain("The game has been saved into database");
    });
    it('Should delete a game from DB', async() => {
      gameTitle = game.name;
      const response = await testSession.delete('/v1/games/' + gameTitle);
      expect(response.status).toBe(200);
      expect(response.text).toContain("The game has been deleted from database");
    });
  });
})