import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Get All', () => {
  it('should get all registers', async () => {
    const response = await testServer.post('/pessoas').send({
      nomeCompleto: 'Someone here',
      email: 'someone@gmail.com',
      cidadeId: 2
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const getAllData = await testServer.get('/pessoas').send();

    expect(Number(getAllData.header['x-total-count'])).toBeGreaterThan(0);
    expect(getAllData.headers).toHaveProperty('access-control-expose-headers', 'x-total-count');
  });

  it('should get all data > 0', async () => {
    const getAllData = await testServer.get('/pessoas').send();

    expect(getAllData.statusCode).toEqual(StatusCodes.OK);
    expect(getAllData.body.length).toBeGreaterThan(0);
  });
});