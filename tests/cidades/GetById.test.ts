import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';
describe('Cidades - Get by id', () => {
  it('should get record by id', async () => {
    const response = await testServer.post('/cidades').send({
      nome: 'Recife'
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const getRecord = await testServer.get(`/cidades/${response.body}`).send();

    expect(getRecord.statusCode).toEqual(StatusCodes.OK);
    expect(getRecord.body).toHaveProperty('nome');

  });

  it('try get nonexistent record', async () => {
    const response = await testServer.get('/cidades/99999').send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});