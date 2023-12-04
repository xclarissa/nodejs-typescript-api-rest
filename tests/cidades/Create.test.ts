import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Cidades - Create', () => {
  let accessToken = '';

  beforeAll(async () => {
    const email = 'create-cidades@gmail.com';
    await testServer.post('/cadastrar').send({
      nome: 'teste',
      email,
      senha: 'Senha@12345'
    });

    const signInResponse = await testServer.post('/entrar').send({
      email,
      senha: 'Senha@12345'
    });

    accessToken = signInResponse.body.accessToken;
  });

  it('should create record without token', async () => {
    const response = await testServer
      .post('/cidades')
      .send({
        nome: 'Recife'
      });

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default');
  });

  it('should create record', async () => {
    const response = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Recife'
      });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });

  it('must create a record with less than three characters', async () => {
    const response = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Re'
      });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.nome');
  });

});