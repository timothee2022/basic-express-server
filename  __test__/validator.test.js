'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);

describe('Validator', () => {
  it('handles \'/person\' route without query param correctly', async () => {
    const response = await request.get('/person');

    expect(response.text).toEqual('What a great name');
  });

  it('handles \'/person\' route with query param correctly', async () => {
    const response = await request.get('/person').query({personName: 'fred'});

    expect(response.text).toEqual('fred is awesome');
  });
});