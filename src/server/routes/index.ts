import { Router } from 'express';
import { CidadesController } from '../controllers';
import { PessoaController } from '../controllers/pessoas';

const router = Router();

router.get('/teste', (_, res) => {
  return res.send('olarrr, dev!');
});

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteValidation, CidadesController.deleteById);

router.get('/pessoas', PessoaController.getAllValidation, PessoaController.getAll);
router.get('/pessoas/:id', PessoaController.getByIdValidation, PessoaController.getById);
router.post('/pessoas', PessoaController.createValidation, PessoaController.create);
router.put('/pessoas/:id', PessoaController.updateByIdValidation, PessoaController.updateById);
router.delete('/pessoas/:id', PessoaController.deleteValidation, PessoaController.deleteById);

// router.post('/cadastrar', PessoaController.createValidation, PessoaController.create);
// router.post('/entrar', PessoaController.createValidation, PessoaController.create);

export { router };