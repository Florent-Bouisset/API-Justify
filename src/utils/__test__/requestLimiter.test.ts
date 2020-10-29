import RequestLimiter from '../requestLimiter'
import UserUtils from '../userUtils'

test('new user should have 80.000 words remaining', async () => {
   const user = await UserUtils.createUser('joe@gmail.com')
   const remaining = await RequestLimiter.remainingWords(user)
   expect(remaining).toEqual(80000)
});


test('user should have 80000 - 30 words remaining', async () => {
    const randomNumber = (new Date()).getTime() 
    const userEmail = 'jack' + randomNumber + 'gmail.com'

    const user = await UserUtils.createUser(userEmail)
    await RequestLimiter.addWordsUsedToday(30, user)
    const remaining = await RequestLimiter.remainingWords(user)
    expect(remaining).toEqual(79970)
 });
 
 test('update words count several time ', async () => {
    const randomNumber = (new Date()).getTime() 
    const userEmail = 'john' + randomNumber + 'gmail.com'

    const user = await UserUtils.createUser(userEmail)
    await RequestLimiter.addWordsUsedToday(30, user)

    const userUpToDate = await UserUtils.getUser(user.email)
    await RequestLimiter.addWordsUsedToday(300, userUpToDate)

    const remaining = await RequestLimiter.remainingWords(userUpToDate)
    expect(remaining).toEqual(79670)
 });
 