// Conversação com Emulator

const restify = require('restify')
const builder = require('botbuilder')

const server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s aplicação executando na porta %s', server.name, server.url)
})


const connector = new builder.ChatConnector({
  appId: '',
  appPassword: ''
})

const bot = new builder.UniversalBot(connector,[
  (session) => {
    builder.Prompts.text(session, 'Olá, tudo bem?')
  },
  (session) => {
    builder.Prompts.text(session, 'Como voce se chama?')
  },
  (session, results) => {
    let msg = results.response
    session.send(`Oi ${msg}, em que posso ajudar?`)
  }
])

// endpoint para executar as mensagens para o usuario
server.post('/api/messages', connector.listen())