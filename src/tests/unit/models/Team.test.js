const mongoose = require("mongoose");
const Team = require("../../../models/Team");
const Pokemon = require("../../../models/Pokemon");

describe("Team Model Test", () => {
  it("should create & save team successfully", async () => {
    const validTeam = new Team({
      name: "Ash's Team",
      description: "Kanto Region Team",
    });
    const savedTeam = await validTeam.save();

    expect(savedTeam._id).toBeDefined();
    expect(savedTeam.name).toBe("Ash's Team");
    expect(savedTeam.description).toBe("Kanto Region Team");
  });

  it("should fail to save team without required name", async () => {
    const teamWithoutName = new Team({
      description: "Test Description",
    });

    let err;
    try {
      await teamWithoutName.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it("should not allow duplicate team names", async () => {
    await Team.create({
      name: "Elite Four",
      description: "Strong trainers",
    });

    const duplicateTeam = new Team({
      name: "Elite Four",
      description: "Another team",
    });

    let err;
    try {
      await duplicateTeam.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.code).toBe(11000); // MongoDB duplicate key error code
  });
});
