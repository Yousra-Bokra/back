import express from "express";

import {user1, user2, user3, user4, user5, loginUser , logoutUser, UserProfile} from '../controller/Usercontroller.js'

import verifyToken from "../middlewares/Usermidddle.js";

const route = express.Router();

route.post('/user' , user1)
route.get('/users', verifyToken, user2); //All user get 
route.get('/user/:id', verifyToken, user3);  
route.put('/user/:id', user4);  //PUT    four  :5000/api/v1/user/69f1e661744b505831cf2b5e  yaha user ki id dalaenge user change ho gah mongo db me 
route.delete('/user/:id', user5);
route.post('/login', loginUser);
route.post('/logout', logoutUser);
route.get('/user-profile' , UserProfile);

export default route