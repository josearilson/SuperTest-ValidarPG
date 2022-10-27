
const expect = require('chai').expect;
const request = require('supertest');
const envVariables = require('../env.json');
const credencial = require('../credencial/credencial.json');
const fs = require('fs');

describe('POST - Gerar Access Token', () => {
    it('testes', (done) => {
        request(`${envVariables.baseUrl}`)
            .post('/api/Login')
            .send(credencial)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                transactionId = res.body.transactionId
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).not.to.be.null;
                envVariables.token = res.body.tokenSessao;
                fs.writeFileSync("env.json", JSON.stringify(envVariables));
            
            });
            done();
    
})}).timeout(10000);