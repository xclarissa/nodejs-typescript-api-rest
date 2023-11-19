import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';
import { cidadesPernambuco } from '../../shared/constants/cidadesPernambuco';

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.cidade).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const cidadesToInsert = cidadesPernambuco.map(nomeCidade => ({ nome: nomeCidade }));
  await knex(ETableNames.cidade).insert(cidadesToInsert);
};