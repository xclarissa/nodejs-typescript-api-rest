import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Get All', () => {
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

  it('should get all registers', async () => {
    const response = await testServer.post('/pessoas').send({
      nomeCompleto: 'Someone here',
      email: 'someone@gmail.com',
      cidadeId
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const getAllData = await testServer.get('/pessoas').send();

    expect(Number(getAllData.header['x-total-count'])).toBeGreaterThan(0);
    expect(getAllData.headers).toHaveProperty('access-control-expose-headers', 'x-total-count');
  });

  it('should get all data > 0', async () => {
    const getAllData = await testServer.get('/pessoas').send();

    expect(getAllData.statusCode).toEqual(StatusCodes.OK);
    expect(getAllData.body.length).toBeGreaterThan(0);
  });
});