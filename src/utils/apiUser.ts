import Connection from "./db"
import { v4 as uuidv4 } from 'uuid';
import user from './userInterface'

class ApiUser {

    /**
     * Create the user and insert it in the database
     * @param email 
     * @returns the user object
     */
    public static async createUser(userEmail: string):Promise<string> { 
        const connection = new Connection()
        const db = await connection.connectToMongo()

        const newUser:user = {
            email : userEmail,
            token : ApiUser.generateToken(),
            todayDate : new Date(),
            wordsUsedToday : 0
        }
        db.collection('users').insertOne(newUser)
        console.log("user created");
        return newUser
    }

    /**
     * Generate a random token
     */
    private static generateToken():string{
        const token = uuidv4()
        return token
    }


    /**
     * Get the user object in the database
     * @param email the email of the user
     * @returns the user object, or null if not found
     */

    public static async getUser(email: string):Promise<string> { 
        const connection = new Connection()
        const db = await connection.connectToMongo()
        const result = await db.collection('users').findOne({'email': email})
        console.log(result)
        return result
    }


    /**
     * Search in the database if a user exists with that email
     * @param email the email of the user
     * @returns true if exist
     */
    public static async userExist(email: string):Promise<boolean>{
        const connection = new Connection()
        const db = await connection.connectToMongo()
        const result = await db.collection('users').findOne({'email': email})
        return (result !== null)
    }
}


export default ApiUser


// ApiUser.createUser("ciyciy@ema.fr")
// ApiUser.userExist('toto@gmail.com')
//     .then(res => console.log(res, 'toto'))
// ApiUser.userExist('toto56@gmail.com')
//     .then(res => console.log(res, 'toto56'))

// ApiUser.getUser('toto555@gmail.com')
