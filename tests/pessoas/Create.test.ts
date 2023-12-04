import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Create', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-pessoas@gmail.com';
    await testServer.post('/cadastrar').send({
      nome: 'teste pessoas',
      email,
      senha: 'Senha@12345'
    });

    const signInResponse = await testServer.post('/entrar').send({
      email,
      senha: 'P@123456'
    });

    accessToken = signInResponse.body.accessToken;
  });

  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidades = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'teste pessoas'
      });

    cidadeId = resCidades.body;
  });

  it('should create a register without auth', async () => {
    const response = await testServer.post('/pessoas').send({
      nomeCompleto: 'Clarissa Carla Xavier',
      email: 'clarissaxr@gmail.com',
      cidadeId: 2
    });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });

  it('should create a register with auth', async () => {
    const response = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Clarissa Carla Xavier',
        email: 'clarissaxr@gmail.com',
        cidadeId
      });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });
});