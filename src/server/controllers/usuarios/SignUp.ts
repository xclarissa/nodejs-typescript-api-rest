import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { UsuariosProvider } from '../../database/providers/usuarios';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';

interface IBodyProps extends Omit<IUsuario, 'id'> { }

export const signUpValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().email().required().min(5),
    senha: yup.string().required().min(6).matches(
      /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Senha deve conter 6 caracteres, no mínimo um caractere maiúsculo, um numero e um caracter especial'
    )
  })),
}));

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await UsuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};