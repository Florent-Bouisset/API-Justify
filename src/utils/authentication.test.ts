import Authentication from './authentication'

test('token should be incorrect 1', async () => {
    const result = await Authentication.isTokenCorrect('zakjebnjkqnxzqip')
    expect(result).toBe(false)
}) 


test('token should be incorrect 2', async () => {
    const result = await Authentication.isTokenCorrect('')
    expect(result).toBe(false)
}) 
