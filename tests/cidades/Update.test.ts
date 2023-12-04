import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';
describe('Cidades - Update', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'update-cidades@gmail.com';
    await testServer.post('/cadastrar').send({
      nome: 'teste delete',
      email,
      senha: 'Senha@12345'
    });

    const signInResponse = await testServer.post('/entrar').send({
      email,
      senha: 'P@123456'
    });

    accessToken = signInResponse.body.accessToken;

  });

  it('update record', async () => {
    const response = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Paulista'
      });


    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const updatedRecord = await testServer.put(`/cidades/${response.body}`).send({ nome: 'Rio de Janeiro' });

    expect(updatedRecord.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('try to update nonexistent record', async () => {
    const response = await testServer.put('/cidades/99999').send({ nome: 'Rio de Janeiro' });

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default');
  });
});