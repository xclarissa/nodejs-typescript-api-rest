import * as getAll from './GetAll';
import * as getById from './GetById';
import * as create from './Create';
import * as update from './Update';
import * as deleteById from './Delete';
// import * as count from './Count';

export const CidadesProvider = {
  ...getAll,
  ...getById,
  ...create,
  ...update,
  ...deleteById,
  ...count
};