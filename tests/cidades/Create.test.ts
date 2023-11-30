import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';
import request from 'supertest';
import express from 'express';

const app = express();

const TOKEN = 'teste.teste.teste';
describe('Cidades - Create', () => {
  it('should create record', async () => {
    const response = await testServer.post('/cidades').send({
      nome: 'Recife'
    });

    request(app)
      .post('/cidades')
      .send({
        body: {
          nome: 'Recife'
        }
      })
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(200);

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });

  it('must create a record with less than three characters', async () => {
    const response = await testServer.post('/cidades').send({
      nome: 'Re'
    });

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.body.nome');
  });

});