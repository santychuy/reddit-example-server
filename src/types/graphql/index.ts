import { Connection } from 'typeorm';
import { Request, Response } from 'express';

export type MyContext = {
  connection: Connection;
  req: Request;
  res: Response;
};
