import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';
describe('Cidades - Create', () => {
  it('should create record', async () => {
    const response = await testServer.post('/cidades').send({
      nome: 'Recife'
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });

  it('must create a record with less than three characters', async () => {
    const response = await testServer.post('/cidades').send({
      nome: 'Re'
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.nome');
  });

});