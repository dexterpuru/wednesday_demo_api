const request = require('supertest');
const app = require('../../app');

let token;

beforeAll(async () => {
  const authresponse = await request(app)
    .post('/api/login')
    .send({
      email: 'rcrimmins0@cnn.com',
      password: 'NpAwQjd0o',
    });
  token = authresponse.body.token;
});

afterAll(() => {
  token = {};
});


describe('GET /api/nearbycars', () => {
  test('Retreving available list of cars', async () => {
    const response = await request(app)
      .get('/api/nearbycars/?lng=53.088415&lat=15.904740&maxDistance=10000000')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode)
      .toBe(200);
    expect(response.body.length)
      .toBe(5);
  }, 20000);
});
