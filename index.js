const Telegraf = require('telegraf').Telegraf
const env = require('./.env')
const dotaInfo = require('./DotaMatch')

const telegram = new Telegraf(env.token)

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
  ctx.reply(message.tags)
  ctx.reply(message.tags2)

})

startBot()
