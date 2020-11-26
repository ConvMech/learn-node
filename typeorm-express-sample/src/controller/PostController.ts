import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Post} from "../entity/Post";
import {Account} from "../entity/Account"
import { getConnection, createQueryBuilder } from 'typeorm';
 
interface PostPostBody {
  title: string;
  text: string;
}

export class PostController {

    private postRepository = getRepository(Post);

    async all(request: Request, response: Response, next: NextFunction) {
      
      const postList = await getConnection()
      .getRepository(Post)
      .createQueryBuilder("post")
      .select('post')
      // .from(Post, 'post')
      .leftJoinAndSelect("post.account", "acc")
      .orderBy('post.id', 'DESC')
      .getMany();
      
      var result : any = []
      postList.forEach(post => {
        let newPost = Object.assign({}, post, { 
          accountId: post.account.id,
          accountName: post.account.name  
        }); 
        delete newPost.account;
        result.push(newPost);
      });

      response.status(200).json(result);

      // const postList =  await getRepository(Post)
      // .createQueryBuilder("post")
      // //.leftJoinAndSelect("post.account", "account")
      // //  .select("account.id")
      // .getMany();
  
      // console.log(postList)

      // return response.status(200).json(postList);   
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.postRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
      const body: PostPostBody = request.body;

      const newPost = getRepository(Post).create({
        title: body.title,
        text: body.text,
        photo:null,
        account: { id: request.user.id } as Account,
      });
      const post = await getRepository(Post).save(newPost);
    
      response.status(201).json({ id: post.id });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let postToRemove = await this.postRepository.findOne(request.params.id);
        await this.postRepository.remove(postToRemove);
    }

}