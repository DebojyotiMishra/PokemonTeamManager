const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Pokemon = require('../models/Pokemon');
const Team = require('../models/Team');

describe('Pokemon API Endpoints', () => {
  beforeEach(async () => {
    await Pokemon.deleteMany({});
    await Team.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/pokemon', () => {
    it('should get all pokemon', async () => {
      const team = await Team.create({ name: 'Test Team' });
      await Pokemon.create({ 
        name: 'Pikachu',
        level: 5,
        team: team._id
      });

      const res = await request(app)
        .get('/api/pokemon')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe('Pikachu');
    });
  });

  describe('POST /api/pokemon', () => {
    it('should create a new pokemon', async () => {
      const team = await Team.create({ name: 'Test Team' });

      const res = await request(app)
        .post('/api/pokemon')
        .send({
          name: 'Charizard',
          level: 36,
          team: team._id
        })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Charizard');
    });

    it('should not create pokemon if team has 6 members', async () => {
      const team = await Team.create({ name: 'Full Team' });
      
      for (let i = 0; i < 6; i++) {
        await Pokemon.create({
          name: `Pokemon ${i}`,
          level: 5,
          team: team._id
        });
      }

      const res = await request(app)
        .post('/api/pokemon')
        .send({
          name: 'Extra Pokemon',
          level: 5,
          team: team._id
        })
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Team already has 6 Pokémon (maximum limit)');
    });
  });

  describe('DELETE /api/pokemon/:id', () => {
    it('should delete a pokemon', async () => {
      const team = await Team.create({ name: 'Test Team' });
      const pokemon = await Pokemon.create({
        name: 'Bulbasaur',
        level: 5,
        team: team._id
      });

      const res = await request(app)
        .delete(`/api/pokemon/${pokemon._id}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      const deletedPokemon = await Pokemon.findById(pokemon._id);
      expect(deletedPokemon).toBeNull();
    });
  });
});