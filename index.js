
require('dotenv').config()
const Telegraf = require('telegraf').Telegraf
const dotaInfo = require('./DotaMatch')

console.log('Bot is running...')
const telegram = new Telegraf(process.env.BOT_TOKEN)

function startBot() {
  telegram.start(ctx => {
    const from = ctx.update.message.from

    ctx.reply(
      `Olá, ${from.first_name}!\n Faça o envio do ID partida que deseja as informações`,
    )
  })

  telegram.startPolling()
}

telegram.hears(/(\d{10})/, async ctx => {
  const [id] = ctx.match
  const info = new dotaInfo(id)
  const message = await info.robot()

  ctx.reply(message.title)
  ctx.reply(message.description)
})

startBot()
