const mongoose = require("mongoose");
const Pokemon = require("../../../models/Pokemon");
const Team = require("../../../models/Team");

describe("Pokemon Model Test", () => {
  it("should create & save pokemon successfully", async () => {
    const team = await Team.create({ name: "Test Team" });
    const validPokemon = new Pokemon({
      name: "Pikachu",
      level: 5,
      team: team._id,
    });
    const savedPokemon = await validPokemon.save();

    expect(savedPokemon._id).toBeDefined();
    expect(savedPokemon.name).toBe("Pikachu");
    expect(savedPokemon.level).toBe(5);
  });

  it("should fail to save pokemon without required fields", async () => {
    const pokemonWithoutName = new Pokemon({
      level: 5,
    });

    let err;
    try {
      await pokemonWithoutName.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it("should fail to save pokemon with invalid level", async () => {
    const team = await Team.create({ name: "Test Team" });
    const pokemonWithInvalidLevel = new Pokemon({
      name: "Pikachu",
      level: 101,
      team: team._id,
    });

    let err;
    try {
      await pokemonWithInvalidLevel.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
