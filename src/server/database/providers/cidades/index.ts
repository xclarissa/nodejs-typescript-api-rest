import * as getAll from './GetAll';
import * as getById from './GetById';
import * as create from './Create';
import * as update from './UpdateById';
import * as deleteById from './DeleteById';
import * as count from './Count';

export const CidadesProvider = {
  ...getAll,
  ...getById,
  ...create,
  ...update,
  ...deleteById,
  ...count
};