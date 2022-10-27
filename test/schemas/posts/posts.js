describe('GET /posts', () => {
  it('Deve validar o schema de uma lista de posts', done => {
    const postsList = Joi.object().keys({
      nomeSistema: Joi.string(),
      tokenSessao: Joi.string()}
    )
    
    
     
    ;
    request
    .post("/api/Login")
      //.expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        joiAssert(res.body, postsList);
        done(res);
      });
  });
});