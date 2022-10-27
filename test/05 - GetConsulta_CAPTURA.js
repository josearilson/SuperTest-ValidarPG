const expect = require('chai').expect;
const request = require('supertest');
const envVariables = require('../env.json');
const fs = require('fs');
const IDdaTransacao = fs.readFileSync('./Payloads/MassaTest/transactionIdGerado.json', 'utf8')

describe('GET - Realiza consulta da transação CAPTURADA', () => {
  it('Deve realizar a consulta da transação - CAPTURADA', (done) => {
    request(`${envVariables.baseUrl}`)
      .get('/api/ConsultarPagamento/' + IDdaTransacao)
      .set('Authorization', `Bearer ${envVariables.token}`)


      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.be.equal(200)
        expect(res.body.status).to.be.equal(8)
        expect(res.body.message).to.be.equal('CAPTURED')
        expect(res.body).not.to.be.null
        return done();
      });

  }).timeout(10000);

}) 