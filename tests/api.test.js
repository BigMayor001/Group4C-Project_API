const request = require('supertest');
const app = require('../App.js');

describe('GET /api/notes', () => {
  test('returns 200 and an array of notes', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/notes/:id', () => {
  test('returns 200 and the note when it exists', async () => {
    const res = await request(app).get('/api/notes/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('content');
  });

  test('returns 404 when the note does not exist', async () => {
    const res = await request(app).get('/api/notes/9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('POST /api/notes', () => {
  test('returns 201 and the created note when title and content are provided', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'Test note', content: 'From the test suite', author: 'jest' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Test note');
    expect(res.body).toHaveProperty('content', 'From the test suite');
    expect(res.body).toHaveProperty('author', 'jest');
  });

  test('returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ content: 'No title here' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('returns 400 when content is missing', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'No content here' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('defaults author to "unknown" when not provided', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'No author', content: 'Should default author' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('author', 'unknown');
  });
});

describe('PUT /api/notes/:id', () => {
  test('returns 200 and the updated note when it exists', async () => {
    const res = await request(app)
      .put('/api/notes/1')
      .send({ title: 'Updated title' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('title', 'Updated title');
  });

  test('returns 400 when no title or content is provided', async () => {
    const res = await request(app).put('/api/notes/1').send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('returns 404 when the note does not exist', async () => {
    const res = await request(app)
      .put('/api/notes/9999')
      .send({ title: 'Does not matter' });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('DELETE /api/notes/:id', () => {
  test('returns 200 and a success message when the note exists', async () => {
    const create = await request(app)
      .post('/api/notes')
      .send({ title: 'Delete me', content: 'Temporary' });
    const id = create.body.id;

    const res = await request(app).delete(`/api/notes/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('note');
  });

  test('returns 404 when the note does not exist', async () => {
    const res = await request(app).delete('/api/notes/9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});