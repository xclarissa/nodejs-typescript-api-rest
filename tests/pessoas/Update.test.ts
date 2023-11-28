import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - Update', () => {
  it('should update register', async () => {
    const response = await testServer.post('/pessoas').send({
      nomeCompleto: 'Someone here',
      email: 'someone@gmail.com',
      cidadeId: 2
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const updateResponse = await testServer.put(`/pessoas/${response.body}`).send({
      nomeCompleto: 'Maria José',
      email: 'mariaj@gmail.com',
      cidadeId: 2
    });
    
    expect(updateResponse.statusCode).toEqual(StatusCodes.NO_CONTENT);
    expect(updateResponse.body).toHaveProperty('nomeCompleto');
    

  });
});