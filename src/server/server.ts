import express from 'express';
import 'dotenv/config';
import { JSONParseError } from './shared/middleware';
import './shared/services/TranslationsYup';
import { router } from './routes';
import cors from 'cors';

const server = express();

server.use(cors({
  origin: process.env.ENABLED_CORS?.split(';') || []
}));
// fetch('http://localhost:3333/cidades')
// .then(data => data.json())
// .then(console.log)
// .catch(console.log)

server.use(express.json());
server.use(JSONParseError);
server.use(router);

export { server };

