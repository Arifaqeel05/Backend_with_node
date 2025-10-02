import ConnectDBfunction from './db/index.js';
import dotenv from 'dotenv';

dotenv.config(
    {
        path:"./env"
    }
)

ConnectDBfunction()