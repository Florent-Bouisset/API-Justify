import Authentication from './authentication'
import user from './userInterface'

test('token should be incorrect 1', async () => {
    const result = await Authentication.isTokenCorrect('zakjebnjkqnxzqip')
    expect(result).toBe(false)
}) 


test('token should be incorrect 2', async () => {
    const result = await Authentication.isTokenCorrect('')
    expect(result).toBe(false)
}) 

test('token should be correct', async () => {
    const result = await Authentication.isTokenCorrect('5cc580b0-e03f-4860-9569-1b7f6a2a6c71')
    expect(result).toBe(true)
}) 

test('should get the user', async ()=>{
    const expected:user =     {
        email: 'ciyciy@ema.fr',
        token: '5cc580b0-e03f-4860-9569-1b7f6a2a6c71',
        todayDate: ISODate("2020-10-25T18:32:46.242Z"),
        wordsUsedToday: 0
      }
      const result = await Authentication.getUserByToken('5cc580b0-e03f-4860-9569-1b7f6a2a6c71')
      expect(resultUser).toBe(expected)
})