const request = require('supertest');
const { schema } = require('../../schemas/posts.js');
const baseUrl = require('../../server/baseUrl');


describe('Contract testing of endpoint /products', () => {
  it('validate contract of POST in /posts', (done) => {
    request(baseUrl)
      .post('/api/Login')
      .send({
        servico: 'ClaroEcommerce5',
        senha: '$81oA9-jp?0$0j5X',
      })      
      .end((err, res) => {
        schema.validate(res.body[6]);
        done();
      });
    })  })
