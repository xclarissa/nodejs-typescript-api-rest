import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Update', () => {
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

  it('should update register', async () => {
    const response = await testServer.post('/pessoas').send({
      nomeCompleto: 'Someone here',
      email: 'someone@gmail.com',
      cidadeId
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const updateResponse = await testServer.put(`/pessoas/${response.body}`).send({
      nomeCompleto: 'Maria José',
      email: 'mariaj@gmail.com',
      cidadeId
    });

    expect(updateResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });
});