require('dotenv').config()

const axios = require('axios')
const dotaconstants = require('dotaconstants')
const lodash = require('lodash')

const url = 'https://api.opendota.com/api'
const text = require('./text')
class DotaMatch {
  constructor(id) {
    this.id = id
  }

  async robot() {
    const info = {}

    info.match = await this.getMatchInfo(this.id)
    info.player = await this.getPlayerMatchInfo(info.match.players)
    const content = text(info)

    return content
  }

  async getMatchInfo(id) {
    const res = await axios.get(url + '/matches/' + id)

    return res.data
  }

  async getPlayerMatchInfo(players) {
    const id = players.findIndex(item => item.account_id === parseInt(process.env.STEAM_ID))
    const player = players[id]
    const names = players.map(item => item.personaname).filter(value => value !== undefined)
    const hero = await this.getHero(player.hero_id)

    const itens = this.getItensNamesById([
      player.item_0,
      player.item_1,
      player.item_2,
      player.item_3,
      player.item_4,
      player.item_5,
      player.item_neutral,
    ]);

    return {
      ...player,
      name: player.personaname,
      hero,
      names,
      // player.heroThumbnail: await this.saveThumbnail(players[i].hero_id)
      sideMap: player.isRadiant ? 'Randiant' : 'Dire',
      itens,
      patch: this.getDotaPatch(player.patch)
    }
  }


  getItensNamesById(ids) {
    const itens = []
    for (let i = 0, len = ids.length; i < len; i++) {
      if (dotaconstants.item_ids[ids[i]]) {
        itens.push(dotaconstants.items[dotaconstants.item_ids[ids[i]]]?.dname)
      }
    }

    return itens
  }

  getDotaPatch(id) {
    return dotaconstants.patch[id].name
  }

  async getHero(id) {
    const res = await axios.get(url + '/heroes/')
    const value = lodash.filter(res.data, x => x.id === id);

    return value
  }

  saveThumbnail(id) {
    const url = `https://api.opendota.com${dotaconstants.heroes[id].img}`

    imageDownloader.image({
      url, url,
      dest: `./content/${id}.png`
    })

    return `./content/${id}.png`
  }
}


module.exports = DotaMatch

