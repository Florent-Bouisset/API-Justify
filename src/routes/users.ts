import { Request, Response } from "express";
import express from "express"

 // import TextFormater from '../services/textFormater';
import UserUtils from "../utils/user-utils";
import user from "../utils/userInterface";

const router = express.Router();

router.get('/', async function(req:Request, res:Response) {
  const email = req.body

  //check if email is a valid mail
  let user:user;
  if(await UserUtils.userExist(email)){
    user = await UserUtils.getUser(email)
    res.status(200)
  } else {
    user = await UserUtils.createUser(email)
    res.status(201)
  }

  if(user.token){
    res.send({token: user.token})
  } else {
    res.status(500)
    res.send('server error')
  }

});

export default router;


