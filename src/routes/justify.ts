import express from "express"

const router = express.Router();

router.get('/', async function(req:Request, res:Response) {
    // check if has authentication
    // check text
    // justify text
    // send text justified
    res.send('ok')
});
 
export default router;
