import * as getAll from './GetAll';
import * as getById from './GetById';
import * as create from './Create';
import * as updateById from './Update';
import * as deleteById from './Delete';

export const CidadesController = {
  ...getAll,
  ...getById,
  ...create,
  ...updateById,
  ...deleteById
};