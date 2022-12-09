import dotenv from 'dotenv';
import path from 'path';

const env = dotenv.config({ path: path.join(__dirname, '../../.env') });

export default env;