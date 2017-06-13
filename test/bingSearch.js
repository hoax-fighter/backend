const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const server = require('../app')

describe('Bing', () => {

    it('should post to search word in web', (done => {
        describe('POST to get web search', () => {
            let word = {
                word: 'ahok'
            }
            chai.request(server)
                .post('/api/source/web')
                .send(word)
                .end((error, result) => {
                    // console.log(result.body.record)
                    result.body.record.should.be.a('array')
                    result.body.record.length.should.equal(25)
                    result.body.success.should.equal(true)
                })
        })
        done()
    }))

    it('should post to search word in news', (done => {
        describe('POST to get web search', () => {
            let word = {
                word: 'ahok'
            }
            chai.request(server)
                .post('/api/source/news')
                .send(word)
                .end((error, result) => {
                    // console.log(result.body.record)
                    result.body.record.should.be.a('array')
                    result.body.record.length.should.equal(25)
                    result.body.success.should.equal(true)
                })
        })
        done()
    }))

})
