import fs from 'fs/promises';
import { LogContent } from '../types/global.types.js';


export const LogWriter = async (content:LogContent)=>{
    const {method , url , host, ms} = content;
    try {
        const logEntry = `Request in ${url} from ${host} with method ${method} in ${ms} ms\n`;
        await fs.appendFile(new URL('../logger.txt', import.meta.url), logEntry, "utf8");
        console.log("Log entry added");
    } catch (error:any) {
        console.log("Error while logging.", error.message);
        
    }
}