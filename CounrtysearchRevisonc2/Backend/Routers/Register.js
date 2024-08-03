import {Router} from 'express';
import { login, register } from '../Controlls/User.js';

const registerrouter=Router();

registerrouter.post('/register',register);
registerrouter.post('/login',login);

export default registerrouter;