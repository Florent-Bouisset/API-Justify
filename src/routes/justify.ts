import { Request, Response } from "express";
import express from "express"
import Authentication from "../utils/authentication"
import RequestLimiter from "../utils/requestLimiter"
import TextFormater from "../utils/textFormater"

const router = express.Router();

router.get('/', async function(req:Request, res:Response) {
    const text = "Les représentants465555555555555555811154864ze1za2.e1q23d168z23q1dqzdf89qz1d352198qza4e98za4e8748.nt que l ignorance, l oubli ou le mépris des droits de l homme sont les seules causes des malheurs publics et de la corruption des gouvernements, ont résolu d exposer, dans une déclaration solennelle, les droits naturels, inaliénables et sacrés de l homme, afin que cette déclaration, constamment présente à tous les membres du corps social, leur rappelle sans cesse leurs droits et leurs devoirs ; afin que les actes du pouvoir législatif, et ceux du pouvoir exécutif, pouvant être à chaque instant comparés avec le but de toute institution politique, en soient plus respectés ; afin que les réclamations des citoyens, fondées désormais sur des principes simples et incontestables, tournent toujours au maintien de la Constitution et au bonheur de t"

    const token = req.body.token // fix
    const correct = await Authentication.isTokenCorrect(token)

    if(correct !== true){
        res.status(401)
        res.send('Your token is not correct')
    }

    const user = await Authentication.getUserByToken(token)
    const remaining = await RequestLimiter.remainingWords(user)
    // fix
    if( remaining - 10 <= 0){
        res.status(429)
        res.send('Request limit exceeded')
    }

    const justifiedText = TextFormater.justify(text)

    res.status(200)
    res.send(justifiedText)
});
 
export default router;
