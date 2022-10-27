var fs = require('fs');
const faker=require('faker');



let randomText = ""
let testEmail = ""
var EmailInicio = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
let nroPedido = faker.datatype.number();
for (var i = 0; i < 3; i++){
    const faker=require('faker');
    const fs = require('fs');
    randomText += EmailInicio.charAt(Math.floor(Math.random() * EmailInicio.length));
    testEmail = randomText + '@gmail.com'
    

}
var Massa = {
    "valor": "015",
    "bandeira": "Mastercard",
    "cardHolder": "Autorizacao Com AntiFraude",
    "cardNumber": "4792206714474704",
    "cardExpirationDate": "202211",
    "cardSecurityCode": "640",
    "isCaptureAutomatic" : false,
    "reference": nroPedido,
    "method": "1",
    "numberOfPayment": "1",
    "billing": {
      "customerIdentity": "1245",
      "name": "Autorizacao Com AntiFraude",
      "address": "Rua Copacabana",
      "address2": "Santa Teresinha",
      "city": "SP",
      "state": "Sao Paulo",
      "postalCode": "02461000",
      "country": "BR",
      "phone": "11 660731175",
      "email": "teste@teste.com.br"
    },
    "fraud": true,
    "fraudData": {
      "costumerIP": "177.139.52.16",
      "device": "4738d516f09cab3a2c1ee973bec88a5a367a59e4",
      "name": "REDE Teste",
      "document": "87840611036",
      "phonePrefix": "11",
      "phoneNumber": "660731175",
      "address": "Av. Republica do Brasil",
      "addressNumber": "1988",
      "infoAddress2": "casa 2",
      "infoAddressNumber2": "Fundos",
      "address2": "condominio central",
      "city": "Sao Paulo",
      "state": "SP",
      "postalCode": "08742000",
      "country": "BR",
      "email": "teste@teste.com",
      "purchaseTotalsCurrency": "BRL",
      "itens": [
        {
          "productName": "Produto teste 1",
          "quantity": "1",
          "price": "100",
          "productCode": "004",
          "productSKU": "SK004"
        }
      ],
      "mdd": [
        {
          "mddFieldID": "1",
          "mddFieldValue": "CPF"
        }
      ]
     }
  }
  ;

var originalRequestTransacao = JSON.stringify(Massa, null, 1)


fs.writeFileSync('./Payloads/MassaTest/RequestTransacao.json', originalRequestTransacao);

var RequestTransacaotring = fs.readFileSync('./Payloads/MassaTest/RequestTransacao.json');

var note = JSON.parse(RequestTransacaotring);
