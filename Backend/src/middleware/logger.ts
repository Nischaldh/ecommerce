import type { Context } from "koa";
import { LogContent } from "../types/global.types.js";
import { LogWriter } from "../lib/logWriter.js";


const logger = async (ctx:Context,next:()=>Promise<void>)=>{
    const {method, url , header} = ctx.request;
    const host = header.host;
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    const content:LogContent = {
        method, 
        url,
        host,
        ms
    }
    LogWriter(content);
}

export default logger;