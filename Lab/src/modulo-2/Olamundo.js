// restify
// Levanta o servidor para o bot ser usado dentro do emulador

const restify = require('restify')
const builder = require('botbuilder')

// Configuração do Server via Restify
const server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, function(){
  console.log('%s aplicação executando na porta %s ', server.name, server.url)
})

// Criação de chat connector para comunicar com o serviço do bot framework
const connector = new builder.ChatConnector({
  appId: '',
  appPassword: ''
})

// endpoint para executar as mensagens para os usuarios via Bot Emulator
server.post('/api/messages', connector.listen())

// Dialogos
const bot = new builder.UniversalBot(connector, function(session){
  session.send('Voce disse: %s ', session.message.text)
})
