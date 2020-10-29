import { Request, Response } from "express";
import express from "express"
import Authentication from "../utils/authentication"
import RequestLimiter from "../utils/requestLimiter"
import TextFormater from "../utils/textFormater"

const router = express.Router();

router.post('/', async function(req:Request, res:Response) {
    const text = req.body.text
    if(!text){
        res.status(400)
        res.send({sucess:false, message :'No text found'})
        return
    }

    const token:string = req.headers.token as string || ''
    const correct = await Authentication.isTokenCorrect(token)
    if(correct !== true){
        res.status(401)
        res.send({sucess:false, message :'Your token is incorrect'})
        return
    }

    const user = await Authentication.getUserByToken(token)
    const remaining = await RequestLimiter.remainingWords(user)
    const wordsCount = (text.split(' ')).length

    if( remaining - wordsCount <= 0){
        res.status(402)
        res.send({sucess:false, message: 'Request limit exceeded, upgrade to prenium version'})
        return
    }
    await RequestLimiter.addWordsUsedToday(wordsCount, user)
    const justifiedText = TextFormater.justify(text)

    res.status(200)
    res.send(justifiedText)
});
 
export default router;
