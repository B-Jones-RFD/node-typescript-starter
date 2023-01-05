import request from 'supertest'
import app from './setupTestApp'

describe('Root Tests', () => {
  it('should test that the test runner is working', () => {
    expect(true).toBe(true)
  })

  it('should return echo message', (done) => {
    //arrange
    const route = '/api/v1'
    const responseText = 'Successful communication with service'

    //act
    request(app).get(route).expect(200, responseText, done)
  })
})
