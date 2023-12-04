import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Cidades - Delete', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'delete-cidades@gmail.com';
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

  it('delete record', async () => {
    const response = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Olinda'
      });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const deletedRecord = await testServer
      .delete(`/cidades/${response.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(deletedRecord.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('try to delete nonexistent record', async () => {
    const response = await testServer.delete('/cidades/99999').send();

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default');
  });
});