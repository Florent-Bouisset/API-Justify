import Connection from "../database/db"
import user from './userInterface'

const maxWordsPerDay = 80000; 

class RequestLimiter{
    public static async remainingWords(user: user):Promise<number>{
        const userUpToDate = await RequestLimiter.updateRemainingWords(user)
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
            await db.updateOne(user, userUpdated)
            return userUpdated
        }
        return user
    }

}

export default RequestLimiter