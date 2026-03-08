import type { Context } from "koa";

export const signIn = (ctx:Context)=>{
    ctx.body = {
        message:"Sign in Route called"
    }

}

export const logIn =(ctx:Context)=>{
    ctx.body = {
        message:"Log in Route Called"
    }
}