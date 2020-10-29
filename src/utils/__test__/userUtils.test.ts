import UserUtils from '../userUtils'

test('Can create an user', async ()=> {
    const user = await UserUtils.createUser('jeandupont@gmail.com')
    expect(user).toBeTruthy()
})

test('Can retrieve user by email', async ()=> {
    const randomNumber = (new Date()).getTime() 
    const userEmail = 'amelie' + randomNumber + 'gmail.com'

    const userCreated = await UserUtils.createUser(userEmail)
    const userRetrieved = await UserUtils.getUser(userEmail)
    expect(userRetrieved).toBeTruthy()
    expect(userRetrieved).toEqual(userCreated)

})


