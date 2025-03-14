const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../server");
const Team = require("../../../models/Team");
const Pokemon = require("../../../models/Pokemon");

describe("Team API Integration Tests", () => {
  describe("GET /api/teams", () => {
    it("should get all teams", async () => {
      await Team.create({
        name: "Red's Team",
        description: "Champion Team",
      });

      const res = await request(app).get("/api/teams");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe("Red's Team");
    });
  });

  describe("GET /api/teams/:id", () => {
    it("should get team with its pokemon", async () => {
      const team = await Team.create({
        name: "Blue's Team",
        description: "Rival Team",
      });

      await Pokemon.create({
        name: "Blastoise",
        level: 65,
        team: team._id,
      });

      const res = await request(app).get(`/api/teams/${team._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.team.name).toBe("Blue's Team");
      expect(res.body.data.pokemon.length).toBe(1);
      expect(res.body.data.pokemon[0].name).toBe("Blastoise");
    });

    it("should return 404 for non-existent team", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/teams/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe("Team not found");
    });
  });
});
