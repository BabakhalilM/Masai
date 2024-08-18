import express from 'express';
import { allUsers,  deleteCustomer,  getCustomerById,  login,  logout, register, token, updateCustomer } from '../controllers/login.js';
const loginrouter = express.Router();

loginrouter.post('/register', register);
loginrouter.get('/allusers', allUsers);
loginrouter.post('/login', login);
loginrouter.post('/token', token);
loginrouter.post('/logout', logout);

loginrouter.get('/user/:id',getCustomerById );
loginrouter.patch('/user/:id',updateCustomer);
loginrouter.delete('/user/:id',deleteCustomer);
export default loginrouter;

