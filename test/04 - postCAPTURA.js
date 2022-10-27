const expect = require('chai').expect;
const request = require('supertest');
const envVariables = require('../env.json');
const fs = require('fs');
//converter para formato json
const IDdaTransacao = fs.readFileSync("./Payloads/MassaTest/transactionIdGerado.json", "utf8");

describe("POST - Realiza Capturar de Transação realizada", () => {
  it("Deve realizar CapturarPagamento", (done) => {
    request(`${envVariables.baseUrl}`)
      .post("/api/CapturarPagamento")
      .set('Authorization', `Bearer ${envVariables.token}`)
      .set("Accept", "application/json")
      .send({
        transactionId: `${IDdaTransacao}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.status).to.be.equal(8);
        expect(res.body.message).to.be.equal("CAPTURED");
        expect(res.body).not.to.be.null;
        return done();
      });
  }).timeout(10000);

  it("Valida status 400Bad Request - IdTransacao Invalido ou não informado", (done) => {
    request(`${envVariables.baseUrl}`)
      .post("/api/CapturarPagamento")
      .set('Authorization', `Bearer ${envVariables.token}`)

      .set("Accept", "application/json")
      .send({
        transactionId: "",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.be.equal(400);

        expect(res.body).not.to.be.null;
        return done();
      });
  }).timeout(10000);
});
