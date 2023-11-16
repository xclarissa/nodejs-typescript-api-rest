import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';
describe('Cidades - Update', () => {
  it('update record', async () => {
    const response = await testServer.post('/cidades').send({
      nome: 'Olinda'
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const updatedRecord = await testServer.put(`/cidades/${response.body}`).send({ nome: 'Rio de Janeiro' });

    expect(updatedRecord.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('try to update nonexistent record', async () => {
    const response = await testServer.put('/cidades/99999').send({ nome: 'Rio de Janeiro' });

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});