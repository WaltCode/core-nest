import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({
  path: resolve(process.cwd(), './.env'),
});

export const AppConfig = {
    Databases: {
        // postgres: {
        //     HOST: process.env.
        // }
    },
    Services: {
        jwt: {
            secret: process.env.JWT_SECRET,
            expiry: process.env.JWT_EXPIRY,
        },
        
    }
}

