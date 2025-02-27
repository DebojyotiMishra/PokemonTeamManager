const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  type: {
    type: String,
    required: [true, 'Please add a type'],
    enum: ['Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 
           'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy', 'Normal']
  },
  level: {
    type: Number,
    required: [true, 'Please add a level'],
    min: 1,
    max: 100
  },
  moves: {
    type: [String],
    validate: {
      validator: function(val) {
        return val.length <= 4;
      },
      message: 'Pokémon can only have up to 4 moves'
    }
  },
  trainerName: {
    type: String,
    default: 'Ash'
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);