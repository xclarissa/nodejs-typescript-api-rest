import { setLocale } from 'yup';
import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuarios - Cadastrar', () => {
  it('should create a user', async () => {
    const response = await testServer.post('/cadastrar').send({
      nome: 'Ciclana',
      email: 'ciclana@mail.com',
      senha: 'C@jnf4567'
    });

    expect(response.status).toEqual(StatusCodes.CREATED);
  });

  it('should create a user 2', async () => {
    const response = await testServer.post('/cadastrar').send({
      nome: 'Fulana',
      email: 'fulana@gmail.com',
      senha: 'C@jnf4567'
    });

    expect(response.status).toEqual(StatusCodes.CREATED);
  });

  it('should throw an error for two same emails', async () => {
    const firstResponse = await testServer.post('/cadastrar').send({
      nome: 'Pedro',
      email: 'pedroaa@gmail.com',
      senha: 'C@jnf4567'
    });

    expect(firstResponse.status).toEqual(StatusCodes.CREATED);
    expect(typeof firstResponse.body).toBe('number');

    const secondResponse = await testServer.post('/cadastrar').send({
      nome: 'Junior',
      email: 'pedroaa@gmail.com',
      senha: 'C@jnf4567'
    });

    expect(secondResponse.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(secondResponse.body).toHaveProperty('errors.default');

  });

  it('should throw an error when register without email', async () => {
    const response = await testServer.post('/cadastrar').send({
      nome: 'Pedro',
      senha: 'C@jnf4567'
    });

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');

  });

  it('should throw an error when register an invalid email', async () => {
    const response = await testServer.post('/cadastrar').send({
      nome: 'Pedro',
      email: 'a@f.c',
      senha: 'C@jnf4567'
    });

    expect(response.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors');

  });

  it('should throw an error when register without name', async () => {
    const response = await testServer.post('/cadastrar').send({
      email: 'pedroaa@gmail.com',
      senha: 'C@jnf4567'
    });

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.nome');

  });

  it('should throw an error when register without password', async () => {
    const response = await testServer.post('/cadastrar').send({
      nome: 'Pedro',
      email: 'pedroaa@gmail.com',
    });

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.senha');

  });


});