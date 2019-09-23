// Conversação usando dialog usando console

const builder = require('botbuilder')
const connector = new builder.ConsoleConnector().listen()

const bot = new builder.UniversalBot(connector)

bot.dialog('/', [
  (session) => {
    builder.Prompts.text(session, 'Oi, tudo bem?')
  },
  (session) => {
    builder.Prompts.text(session, 'Qual é o seu nome?')
  },
  (session, results) => {
    let msg = results.response;
    session.send(`Oi ${msg}, como posso lhe ajudar?`)
  }
])