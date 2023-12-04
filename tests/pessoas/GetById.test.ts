import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Pessoas - Get By Id', () => {
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

  it('should get a single register', async () => {
    const response = await testServer.post('/pessoas').send({
      nomeCompleto: 'Clarissa Carla Xavier',
      email: 'clarissaxr@gmail.com',
      cidadeId
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const getResponse = await testServer.get(`/pessoas/${response.body}`).send();

    expect(getResponse.statusCode).toEqual(StatusCodes.OK);
    expect(getResponse.body).toHaveProperty('nomeCompleto', 'Clarissa Carla Xavier');
  });
});