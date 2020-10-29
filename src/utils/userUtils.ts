import Connection from "../database/db"
import { v4 as uuidv4 } from 'uuid';
import user from './userInterface'

class UserUtils {

    /**
     * Create the user and insert it in the database
     * @param email 
     * @returns the user object
     */
    public static async createUser(userEmail: string):Promise<user> { 
        const connection = new Connection()
        const db = await connection.connectToMongo()

        const newUser:user = {
            email : userEmail,
            token : UserUtils.generateToken(),
            dateOfLastRequest : new Date(),
            wordsUsedToday : 0
        }
        const copy = Object.assign({}, newUser);
        db.collection('users').insertOne(copy)

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

    public static async getUser(email: string):Promise<user> { 
        const connection = new Connection()
        const db = await connection.connectToMongo()
        const result = await db.collection('users').findOne({'email': email})
        if(result._id){
            delete result._id
        }
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


export default UserUtils

