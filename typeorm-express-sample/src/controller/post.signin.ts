import {NextFunction, Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {Account} from '../entity/Account'
import sendError from '../utils/error'
import {getTokenById} from '../middlewares/grantToken'

interface PostSigninBody{
  email: string,
  password: string
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export async function postSigninHandler(req: Request, res: Response, next: NextFunction){
  const body: PostSigninBody = req.body;
  const email = body.email;
  const password = body.password;

  await delay(1000);
  
  const account = await getRepository(Account).findOne({ email });
  if (!account){
    res.status(400).json({ 
      error: "user not found"
    });
  }

  if (password != account.password){
    res.status(400).json({ 
      error: "password not correct"
    });
  }

  const accessToken = await getTokenById(account.id);
  
  res.status(200).json({ 
    access_token: accessToken, 
    expires_in: "None"
  });
}