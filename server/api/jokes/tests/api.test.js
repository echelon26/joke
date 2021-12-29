const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../../index')
chai.use(chaiHttp)
const expect = chai.expect
const should = chai.should()
const Joke = require('../models/joke')

describe('Api Endpoints', () => {

    describe('/GET jokes', () => {
        it('it should get jokes', (done) => {
            chai.request(app)
                .get('/api/jokes/')
                .end((err, res) => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.jokes).to.be.an('array')
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
})
