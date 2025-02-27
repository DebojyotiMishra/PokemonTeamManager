const Pokemon = require("../models/Pokemon");
const Team = require("../models/Team");

// @desc    Get all Pokémon
// @route   GET /api/pokemon
// @access  Public
exports.getPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.find();

    res.status(200).json({
      success: true,
      count: pokemon.length,
      data: pokemon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get single Pokémon
// @route   GET /api/pokemon/:id
// @access  Public
exports.getSinglePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);

    if (!pokemon) {
      return res.status(404).json({
        success: false,
        error: "Pokémon not found",
      });
    }

    res.status(200).json({
      success: true,
      data: pokemon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Create new Pokémon
// @route   POST /api/pokemon
// @access  Public
exports.createPokemon = async (req, res) => {
  try {
    const team = await Team.findById(req.body.team);
    if (!team) {
      return res.status(404).json({
        success: false,
        error: "Team not found",
      });
    }

    const pokemonCount = await Pokemon.countDocuments({ team: req.body.team });
    if (pokemonCount >= 6) {
      return res.status(400).json({
        success: false,
        error: "Team already has 6 Pokémon (maximum limit)",
      });
    }

    const pokemon = await Pokemon.create(req.body);

    res.status(201).json({
      success: true,
      data: pokemon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update Pokémon
// @route   PUT /api/pokemon/:id
// @access  Public
exports.updatePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!pokemon) {
      return res.status(404).json({
        success: false,
        error: "Pokémon not found",
      });
    }

    res.status(200).json({
      success: true,
      data: pokemon,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete Pokémon
// @route   DELETE /api/pokemon/:id
// @access  Public
exports.deletePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);

    if (!pokemon) {
      return res.status(404).json({
        success: false,
        error: "Pokémon not found",
      });
    }

    await pokemon.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Team controller methods

// @desc    Get all teams
// @route   GET /api/teams
// @access  Public
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find();

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get single team with its Pokémon
// @route   GET /api/teams/:id
// @access  Public
exports.getSingleTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        error: "Team not found",
      });
    }

    const pokemon = await Pokemon.find({ team: req.params.id });

    res.status(200).json({
      success: true,
      data: {
        team,
        pokemon,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Create new team
// @route   POST /api/teams
// @access  Public
exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);

    res.status(201).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update team
// @route   PUT /api/teams/:id
// @access  Public
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        error: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Delete team and its Pokémon
// @route   DELETE /api/teams/:id
// @access  Public
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        error: "Team not found",
      });
    }

    await Pokemon.deleteMany({ team: req.params.id });

    await team.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
