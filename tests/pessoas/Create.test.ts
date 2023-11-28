import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Create', () => {
  it('should create a register', async () => {
    const response = await testServer.post('/pessoas').send({
      nomeCompleto: 'Clarissa Carla Xavier',
      email: 'clarissaxr@gmail.com',
      cidadeId: 2
    });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });
});