const expect = require('chai').expect;
const request = require('supertest');
const envVariables = require('../env.json');
const fs = require('fs');
const IDdaTransacao = fs.readFileSync('./Payloads/MassaTest/transactionIdGerado.json', 'utf8')

describe('POST - Realiza Cancelamento da transação', () => {
   it('Deve realizar o Cancelamento da transação', (done) => {
    request(`${envVariables.baseUrl}`)
      .post('/api/CancelarPagamento')
      .set('Authorization', `Bearer ${envVariables.token}`)
      .send(

        {
          "transactionId": `${IDdaTransacao}`,
        })

      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.be.equal(200)
        expect(res.body.status).to.be.equal(6)
        expect(res.body.message).to.be.equal('CANCELLED')

        expect(res.body).not.to.be.null
        return done();
      });

  }).timeout(10000);

}) 