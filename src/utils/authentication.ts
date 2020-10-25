import Connection from "./db"
import user from './userInterface'


class Authentication{
    /**
     * verify if token exist
     * @param token token that is checked
     */
    public static async isTokenCorrect(token: string): boolean{
        const connection = new Connection()
        const db = await connection.connectToMongo()
        const user = await db.collection('users').findOne({'token':token})
        return (user ==! null)
    }


    /**
     * search with token and get the user corresponding 
     * @param token the token you search
     */
    private static async getUserByToken(token: string): user{
        const connection = new Connection()
        const db = await connection.connectToMongo()
        const user = await db.collection('users').findOne({'token':token})
        return user
    }
}

export default Authentication