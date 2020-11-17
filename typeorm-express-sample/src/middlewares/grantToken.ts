import { Account } from '../entity/Account'
import jwt from 'jsonwebtoken';
import {getRepository} from 'typeorm';

const jwtSecret = 'jwt_secret';

export async function getTokenById(id: number){
  const account  = await getRepository(Account).findOne({ id });
  const accessToken = jwt.sign({ id: account.id }, jwtSecret);
  return accessToken;
}
