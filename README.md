# Tinda

A small app

## Requirements

1. NodeJS

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env`
4. Configure your database settings in `.env`
5. Initialize database with sample data: `node ace migration:fresh --seed`
6. Generate app key: `node ace generate:key`
7. Run migrations: `node ace migration:run`
8. Start the server: `node ace serve --watch`

## Development

The app is built with:

- AdonisJS 6
- MySQL
- Node.js 20+

## Testing

Run `node ace test` to execute tests

### Migration

- node ace migration:refresh --seed
