/* Conversação, bot que pergunta o time de futebol de coração*/

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
    builder.Prompts.text(session, 'Oi, Qual é seu nome?')
  },
  (session, results) => {
    let nome = results.response
    session.send(`Olá, ${nome}`)

    session.beginDialog('/perguntarTimeCoracao')
  }
])

bot.dialog('/perguntarTimeCoracao', [
  (session) => {
    builder.Prompts.text(session, 'Qual seu time de futebol do coração')
  },

  (session, results) => {
    let timeCoracao = results.response
    session.endDialog(`Vamos torcer para o ${timeCoracao} pra ganhar o campeonato`)
  
    session.beginDialog('/perguntarLugarFavorito')
  }
])

bot.dialog('/perguntarLugarFavorito', [
  session => {
    builder.Prompts.text(session, 'Qual seu lugar preferido?')
  },
  (session, results) => {
    let lugar = results.response

    // session.endDialog(`Eu tambem ja fui para ${lugar}, é bem legal`)
    session.endDialog(`Eu tambem ja fui para **${lugar}**, é bem legal`)
  }
])