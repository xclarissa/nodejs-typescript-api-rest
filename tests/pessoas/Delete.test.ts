import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Pessoas - Delete', () => {
  it('should delete record', async () => {
    const response = await testServer.post('/pessoas').send({
      nomeCompleto: 'Someone here',
      email: 'someone@gmail.com',
      cidadeId: 2
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