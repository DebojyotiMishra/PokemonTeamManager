const express = require('express');
const router = express.Router();
const {
  getPokemon,
  getSinglePokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
  getTeams,
  getSingleTeam,
  createTeam,
  updateTeam,
  deleteTeam
} = require('../controllers/pokemonController');

// Pokemon routes
router.route('/pokemon')
  .get(getPokemon)
  .post(createPokemon);

router.route('/pokemon/:id')
  .get(getSinglePokemon)
  .put(updatePokemon)
  .delete(deletePokemon);

// Team routes
router.route('/teams')
  .get(getTeams)
  .post(createTeam);

router.route('/teams/:id')
  .get(getSingleTeam)
  .put(updateTeam)
  .delete(deleteTeam);

module.exports = router;