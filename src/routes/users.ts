import { Request, Response } from "express";
import express from "express"

import TextFormater from '../services/textFormater';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req:Request, res:Response) {
  // const originText = req.body
  // const originText = "Phase 3. Add (to your linked list of strings) nodening the spaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaces that separate the words (after you add a word to your list, you can add the space(s) that follow it). There will normally be one space, but if the word ends with a period, exclamation point, or question mark, there should be two spaces. For example, if the text so far is Hello. I love you The list will look like:"
  const droitHomme = "Les représentants465555555555555555811154864ze1za2.e1q23d168z23q1dqzdf89qz1d352198qza4e98za4e8748.nt que l ignorance, l oubli ou le mépris des droits de l homme sont les seules causes des malheurs publics et de la corruption des gouvernements, ont résolu d exposer, dans une déclaration solennelle, les droits naturels, inaliénables et sacrés de l homme, afin que cette déclaration, constamment présente à tous les membres du corps social, leur rappelle sans cesse leurs droits et leurs devoirs ; afin que les actes du pouvoir législatif, et ceux du pouvoir exécutif, pouvant être à chaque instant comparés avec le but de toute institution politique, en soient plus respectés ; afin que les réclamations des citoyens, fondées désormais sur des principes simples et incontestables, tournent toujours au maintien de la Constitution et au bonheur de t"

  const justifiedText = TextFormater.justify(droitHomme)

  res.send(justifiedText);
});

export default router;
