/* Conversação, bot que solicita o nome de usuario com uma mensagem de saudação usando beginDialog*/

const restify = require('restify')
const builder = require('botbuilder')

// configuração do server via restify

const server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(" %s Servidor rodando na porta %s", server.name, server.url)
})

//  Criação do chatConnector para comunicar com o serviço  do bot framework
const connector = new builder.ChatConnector({
  appId: '',
  appPassword: ''
})

server.post('/api/messages', connector.listen())

const bot = new builder.UniversalBot(connector)

bot.dialog('/', [
  session => {
    session.beginDialog('/saudacao')
  }
])

bot.dialog('/saudacao', [
  session => {
    builder.Prompts.text(session, 'Oi? qual é o seu nome?')
  },
  (session, results) => {
    let msg = results.response
    session.endDialog(`Oi ${msg}`)
  }
])