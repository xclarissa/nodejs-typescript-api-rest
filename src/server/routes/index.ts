import { Router } from 'express';
import { CidadesController } from '../controllers';
import { PessoaController } from '../controllers/pessoas';
import { UsuariosController } from '../controllers/usuarios';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/teste', (_, res) => {
  return res.send('olarrr, dev!');
});

router.get('/cidades', ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.get('/cidades/:id', ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.post('/cidades', ensureAuthenticated, CidadesController.createValidation, CidadesController.create);
router.put('/cidades/:id', ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', ensureAuthenticated, CidadesController.deleteValidation, CidadesController.deleteById);

router.get('/pessoas', ensureAuthenticated, PessoaController.getAllValidation, PessoaController.getAll);
router.get('/pessoas/:id', ensureAuthenticated, PessoaController.getByIdValidation, PessoaController.getById);
router.post('/pessoas', ensureAuthenticated, PessoaController.createValidation, PessoaController.create);
router.put('/pessoas/:id', ensureAuthenticated, PessoaController.updateByIdValidation, PessoaController.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoaController.deleteValidation, PessoaController.deleteById); 

router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);
router.post('/cadastrar', UsuariosController.signUpValidation, UsuariosController.signUp);

export { router };