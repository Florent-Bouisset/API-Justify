import Connection from "../database/db"
import UserUtils from '../utils/userUtils'
import user from './userInterface'

const maxWordsPerDay = 80000; 

class RequestLimiter{
    public static async remainingWords(user: user):Promise<number>{
        const userInDb = await UserUtils.getUser(user.email)
        const userUpToDate = await RequestLimiter.updateRemainingWords(userInDb)
        return maxWordsPerDay - userUpToDate.wordsUsedToday
    
    }
    private static async updateRemainingWords(user: user):Promise<user>{
        const today = new Date()
        today.setHours(0, 0, 0, 0);

        const lastRequest = new Date(user.dateOfLastRequest);
        lastRequest.setHours(0, 0, 0, 0);

        const isNewDay = !(today.getTime() === lastRequest.getTime())
        if(isNewDay){
            const connect = new Connection()
            const db = await connect.connectToMongo()
            const userUpdated = user
            userUpdated.dateOfLastRequest = new Date()
            userUpdated.wordsUsedToday = 0
            await db.collection('users').update(user, userUpdated)
            return userUpdated
        }
        return user
    }

    public static async addWordsUsedToday(wordsAmount: number, user:user):Promise<void> {
        const connect = new Connection()
        const db = await connect.connectToMongo()
        const userUpdated = Object.assign({}, user);
        userUpdated.wordsUsedToday += wordsAmount
        await db.collection('users').update(user, userUpdated)
    }
}

export default RequestLimiter