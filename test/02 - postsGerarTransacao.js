
const expect = require('chai').expect;
const request = require('supertest');
const envVariables = require('../env.json');
const {  GerarMassa} = require('../Payloads/MassaTest/GerarMassa');
const RequestTransacao = require('../Payloads//MassaTest/RequestTransacao.json');
const BadRequest400 = require('../Payloads//MassaTest/BadRequest400.json');
const TransacaoJaRealizada = ('../Payloads/MassaTest/RequestTransacaoJaRealizada.json');

const fs = require('fs');

describe('POST - Realizada Autorização de Pagamento', () => {
  it('CT01 - Gerar transação com sucesso', (done) => {
    request(`${envVariables.baseUrl}`)
      .post('/api/AutorizarPagamento')
      .set('Authorization', `Bearer ${envVariables.token}`)
      .send(RequestTransacao)
      .end((err, res) => {
        if (err) return done(err);
        transactionId = res.body.transactionId
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.status).to.be.equal(3);
        expect(res.body.message).to.be.equal('AUTHORIZED');
        expect(res.body.processors.antifraud).to.be.equal(null);
        expect(res.body).not.to.be.null;
        //IdTransacaoSalvo
        fs.writeFileSync('./Payloads/MassaTest/transactionIdGerado.json', transactionId);
        //ResponseSalvao
        fs.writeFile("ResponseSalvo.json", JSON.stringify(res.body, null, 1), function (error) {
          if (error) {
            return console.err(error)
          }

        });
      });
    done();
  }).timeout(10000);

  it('CT02 - Valida StatusCode 400 - 400Bad Request', (done) => {
    request(`${envVariables.baseUrl}`)
      .post('/api/AutorizarPagamento')
      .set('Authorization', `Bearer ${envVariables.token}`)
      .send(BadRequest400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.be.equal(400);
        return done();
      });

  }).timeout(10000);

  it('CT03 - Transação não autorizada - StatusCode 401Unauthorized', (done) => {
    request(`${envVariables.baseUrl}`)
      .post('/api/AutorizarPagamento')
      .set('Authorization', `Bearer`)
      .send(RequestTransacao)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.be.equal(401);
        return done();
      });

  }).timeout(10000);

  it('CT04 - Valida StatusCode 404 - Not Found', (done) => {
    request(`${envVariables.baseUrl}`)
      ///EndPoint errado
      .post('/AutorizarPagamento')
      .set('Authorization', `Bearer ${envVariables.token}`)
      .send(RequestTransacao)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.be.equal(404);
        return done();
      });

  }).timeout(10000);

  it('CT05 - Valida StatusCode 405 - Not Found', (done) => {
    request(`${envVariables.baseUrl}`)
      ///VERBO do EndPoint errado
      .get('/api/AutorizarPagamento')
      .set('Authorization', `Bearer ${envVariables.token}`)
      .send(TransacaoJaRealizada)
      .expect(405)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.be.equal(405);
        return done();
      });

  }).timeout(10000);
});