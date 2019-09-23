// desenvolver bot de console

const builder = require('botbuilder')
// criando um connector pra utilizar o bot via console
const connector = new builder.ConsoleConnector().listen()
const bot = new builder.UniversalBot(connector)

// Aqui, vamos criar o nosso diálogo para o nosso bot

bot.dialog('/', [
  function(session) {
    session.send('Olá mundo')
  }
])