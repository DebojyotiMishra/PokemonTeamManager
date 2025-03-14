const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../server");
const Pokemon = require("../../../models/Pokemon");
const Team = require("../../../models/Team");

describe("Pokemon API Integration Tests", () => {
  let team;

  beforeEach(async () => {
    team = await Team.create({
      name: "Test Team",
      description: "Test Description",
    });
  });

  describe("GET /api/pokemon", () => {
    it("should get all pokemon", async () => {
      await Pokemon.create({
        name: "Pikachu",
        level: 25,
        team: team._id,
      });

      const res = await request(app).get("/api/pokemon");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe("Pikachu");
    });
  });

  describe("POST /api/pokemon", () => {
    it("should create a new pokemon", async () => {
      const res = await request(app)
        .post("/api/pokemon")
        .send({
          name: "Charizard",
          level: 36,
          team: team._id,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Charizard");
    });

    it("should fail if team already has 6 pokemon", async () => {
      for (let i = 1; i <= 6; i++) {
        await Pokemon.create({
          name: `Pokemon ${i}`,
          level: i * 10,
          team: team._id,
        });
      }

      const res = await request(app)
        .post("/api/pokemon")
        .send({
          name: "One Too Many",
          level: 50,
          team: team._id,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe("Team already has 6 Pokémon (maximum limit)");
    });
  });
}); 