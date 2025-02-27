# Pokémon Team Manager

A Node.js application for managing Pokémon teams with MongoDB.

## Features

- Create, read, update, and delete Pokémon in teams
- Team management (up to 6 Pokémon per team)
- Environment-specific configurations
- RESTful API endpoints

## Tech Stack

- Node.js with Express
- MongoDB with Mongoose
- Environment variables with dotenv

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up MongoDB locally or update connection strings in .env files
4. Run the development server: `NODE_ENV=dev npm run dev`

## Environment Configuration

The application supports three environments:
- Development (dev): Local development
- Release (release): Pre-production testing
- Production (prod): Production deployment

## API Endpoints

### Pokémon Operations
- `GET /api/pokemon` - Get all Pokémon
- `GET /api/pokemon/:id` - Get a specific Pokémon
- `POST /api/pokemon` - Create a new Pokémon
- `PUT /api/pokemon/:id` - Update a Pokémon
- `DELETE /api/pokemon/:id` - Delete a Pokémon

### Team Operations
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get a specific team with its Pokémon
- `POST /api/teams` - Create a new team
- `PUT /api/teams/:id` - Update a team
- `DELETE /api/teams/:id` - Delete a team and its Pokémon

## Sample Pokémon Object

```json
{
  "name": "Pikachu",
  "type": "Electric",
  "level": 25,
  "moves": ["Thunderbolt", "Quick Attack", "Iron Tail", "Electro Ball"],
  "trainerName": "Ash",
  "team": "60d21b4667d0d8992e610c85"
}
```

## Sample Team Object

```json
{
  "name": "Elite Four Team",
  "user": "ash_ketchum"
}
```
*/
