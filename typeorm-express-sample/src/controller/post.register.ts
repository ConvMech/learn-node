import {NextFunction, Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {Account} from '../entity/Account'

interface PostRegisterBody{
  name: string,
  email: string,
  password: string
}

export async function postRegisterHandler(request: Request, response: Response, next: NextFunction){
  const body: PostRegisterBody = request.body;

  const newAccount = getRepository(Account).create({
    name: body.name,
    email: body.email,
    password:body.password,
  });

  const acc = await getRepository(Account).save(newAccount);

  response.status(200).json({ id: acc.id });
}