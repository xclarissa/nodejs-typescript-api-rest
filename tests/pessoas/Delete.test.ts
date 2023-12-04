import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Pessoas - Delete', () => {
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

  it('should delete record', async () => {
    const response = await testServer.post('/pessoas').send({
      nomeCompleto: 'Someone here',
      email: 'someone@gmail.com',
      cidadeId
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const deletedRecord = await testServer.delete(`/pessoas/${response.body}`).send();

    expect(deletedRecord.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it('try to delete nonexistent record', async () => {
    const response = await testServer.delete('/pessoas/6').send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});