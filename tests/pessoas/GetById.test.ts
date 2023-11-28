import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Pessoas - Get By Id', () => {
  it('should get a single register', async () => {
    const response = await testServer.post('/pessoas').send({
      nomeCompleto: 'Clarissa Carla Xavier',
      email: 'clarissaxr@gmail.com',
      cidadeId: 2
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const getResponse = await testServer.get(`/pessoas/${response.body}`).send();

    expect(getResponse.statusCode).toEqual(StatusCodes.OK);
    expect(getResponse.body).toHaveProperty('nomeCompleto', 'Clarissa Carla Xavier');
  });
});