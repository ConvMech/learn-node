import {PostController} from "./controller/PostController";
import {postSigninHandler} from "./handler/post.signin"
import {postSignInValidator} from "./types/account.validator"
import {checkJwt} from "./middlewares/checkJwt"

export const Routes = [{
    method: "get",
    route: "/posts",
    controller: PostController,
    middlewares: checkJwt,
    action: "all"
}, {
    method: "get",
    route: "/posts/:id",
    controller: PostController,
    action: "one"
}, {
    method: "post",
    route: "/posts",
    controller: PostController,
    action: "save"
}, {
    method: "delete",
    route: "/posts/:id",
    controller: PostController,
    action: "remove"
}];

export const SignInRoutes = [
  {
    route: '/signin',
    method: 'post',
    handler: postSigninHandler,
    validator: postSignInValidator,
  }
]