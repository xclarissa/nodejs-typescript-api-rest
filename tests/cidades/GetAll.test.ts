import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Cidades - Get All', () => {
  let accessToken = '';
  beforeAll(async () => {
    const email = 'get-cidades@gmail.com';
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


  it('should get all records', async () => {
    const response = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: 'Olinda'
      });


    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const getResponse = await testServer.get('/cidades').send();

    expect(Number(getResponse.header['x-total-count'])).toBeGreaterThan(0);
    expect(getResponse.statusCode).toEqual(StatusCodes.OK);
    expect(getResponse.body.length).toBeGreaterThan(0);
  });

});