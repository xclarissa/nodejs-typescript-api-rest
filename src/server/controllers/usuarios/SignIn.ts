import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { UsuariosProvider } from '../../database/providers/usuario';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';
import { PasswordCrypto } from '../../shared/services/PasswordCrypto';

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> { }

export const signInValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    email: yup.string().email().required().min(5),
    senha: yup.string().required().min(6).matches(
      /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Senha deve conter 6 caracteres, no mínimo um caractere maiúsculo, um numero e um caracter especial'
    )
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body;

  const result = await UsuariosProvider.getByEmail(email);
  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha inválidos'
      }
    });
  }

  const passwordMatch = PasswordCrypto.verifyPassword(senha, result.senha);
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha inválidos'
      }
    });
  } else {
    return res.status(StatusCodes.OK).json({ accessToken: 'teste.teste.teste' });
  }

  // return res.status(StatusCodes.CREATED).json(result);
};