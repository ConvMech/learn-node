import {NextFunction, Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {Account} from '../entity/Account'
import sendError from '../utils/error'
import {getTokenById} from '../middlewares/grantToken'

interface PostSigninBody{
  email: string,
  password: string
}

export async function postSigninHandler(req: Request, res: Response, next: NextFunction){
  const body: PostSigninBody = req.body;
  const email = body.email;
  const password = body.password;
  
  const account = await getRepository(Account).findOne({ email });
  if (!account) return sendError(400, 'invalid email', next);

  if (password != account.password) return sendError(400, 'invalid password', next);

  const accessToken = await getTokenById(account.id);

  res.status(200).json({ 
    access_token: accessToken, 
    expires_in: "None"
  });
}