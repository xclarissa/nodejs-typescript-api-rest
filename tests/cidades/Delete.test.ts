import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';
describe('Cidades - Delete', () => {
  it('delete record', async () => {
    const response = await testServer.post('/cidades').send({
      nome: 'Olinda'
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const deletedRecord = await testServer.delete(`/cidades/${response.body}`).send();

    expect(deletedRecord.statusCode).toEqual(StatusCodes.NO_CONTENT);

  });

  it('try to delete nonexistent record', async () => {
    const response = await testServer.delete('/cidades/99999').send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});