import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Cidades - Get All', () => {
  it('should get all records', async () => {
    const response = await testServer.post('/cidades').send({
      nome: 'Olinda'
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const getResponse = await testServer.get('/cidades').send();

    expect(Number(getResponse.header['x-total-count'])).toBeGreaterThan(0);
    expect(getResponse.statusCode).toEqual(StatusCodes.OK);
    expect(getResponse.body.length).toBeGreaterThan(0);
  });

});