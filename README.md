# Group4C-Project API

A simple REST API for creating, retrieving, updating and deleting text notes.

Built with Node.js and Express.

## Setup

1. Clone the repo.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and adjust if needed:
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

The server runs on `http://localhost:3000` by default.

## Endpoints

| Method | Route           | Description              | Body                           |
|--------|-----------------|--------------------------|--------------------------------|
| GET    | `/`             | API info                 | -                              |
| GET    | `/notes`        | Retrieve all notes       | -                              |
| GET    | `/notes/:id`    | Retrieve a single note   | -                              |
| POST   | `/notes`        | Create a new note         | `{ "title": "...", "content": "..." }` |
| PUT    | `/notes/:id`    | Update an existing note   | `{ "title": "...", "content": "..." }` |
| DELETE | `/notes/:id`    | Delete a note             | -                              |

### Example

Create a note:
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My note","content":"Hello world"}'
```

## Error Handling

- `400` — missing `title` or `content` on `POST`/`PUT`.
- `404` — note not found, or unknown route.
- `500` — unexpected server error.

## Notes

Notes are stored in memory and reset on server restart.
