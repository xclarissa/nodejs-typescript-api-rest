import { Router } from 'express';
import { CidadesController } from '../controllers';

const router = Router();


router.get('/teste', (_, res) => {
  return res.send('olarrr dev');
});


router.post('/cidades', CidadesController.createValidation, CidadesController.create);


export { router };