const request = require('supertest');
const { schema } = require('../../schemas/posts.js');
const baseUrl = require('../../server/baseUrl');


describe('Contract testing of endpoint /products', () => {
  it('validate contract of POST in /posts', (done) => {
    request(baseUrl)
      .post('/api/Login')
      .send({
        servico: 'xxxxxxxxxxx',
        senha: 'xxxxxxxxxxx',
      })      
      .end((err, res) => {
        schema.validate(res.body[6]);
        done();
      });
    })  })
