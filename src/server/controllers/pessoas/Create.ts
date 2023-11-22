import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { PessoaProvider } from '../../database/providers/pessoa';
import { validation } from '../../shared/middleware';
import { IPessoa } from '../../database/models';

interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const createValidation = validation(get => ({
  body: get<IBodyProps>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().email().required(),
    cidadeId: yup.number().integer().required()
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await PessoaProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};