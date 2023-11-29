import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuarios - Entrar', () => {
  it('should login user', async () => {
    const response = await testServer.post('/entrar').send({
      email: 'ciclana@mail.com',
      senha: 'C@jnf4567'
    });

    expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it('should throw error when invalid password', async () => {
    const response = await testServer.post('/entrar').send({
      email: 'ciclana@mail.com',
      senha: 'cdcn1'
    });

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.senha');
  });
});