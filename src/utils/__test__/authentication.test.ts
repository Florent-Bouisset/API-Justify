import Authentication from '../authentication'
import UserUtils from '../userUtils'
import user from '../userInterface'

test('token should be incorrect 1', async () => {
    const result = await Authentication.isTokenCorrect('zakjebnjkqnxzqip')
    expect(result).toBe(false)
}) 

test('token should be incorrect 2', async () => {
    const result = await Authentication.isTokenCorrect('')
    expect(result).toBe(false)
}) 

test('token should be correct', async () => {
    const user:user = await UserUtils.createUser('charlepetit@gmail.com')
    const result = await Authentication.isTokenCorrect(user.token)
    expect(result).toBe(true)
}) 

test('should get the user', async ()=>{
      const user:user = await UserUtils.createUser('juliedurand@gmail.com')
      const userFound:user = await Authentication.getUserByToken(user.token)
      expect(userFound).toEqual(user)
})