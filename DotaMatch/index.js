const axios = require('axios')
const dotaconstants = require('dotaconstants')
const lodash = require('lodash')

const url = 'https://api.opendota.com/api'
const env = require('../.env')

class DotaMatch {
	constructor(id) {
			this.id = id
		}

  async robot() {
    const info = {}

    info.match = await this.getMatchInfo(this.id)
    info.player = await this.getPlayerMatchInfo(info.match.players)
    const content = this.getContent(info)

    return content
  }

  async getMatchInfo (id){
    const res = await axios.get(url + '/matches/' + id)

    return res.data
  }

  async getPlayerMatchInfo(players){
    const id =  players.findIndex(item => item.account_id === parseInt(env.steamId))
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


  getItensNamesById( ids ){
    const itens = []
    for (let i = 0, len = ids.length; i < len; i++) {
        if (dotaconstants.item_ids[ids[i]]){
            itens.push(dotaconstants.items[dotaconstants.item_ids[ids[i]]].dname)
        }
    }

    return itens
  }

  getDotaPatch(id){
    return dotaconstants.patch[id].name
  }

  async getHero(id){
    const res = await axios.get(url + '/heroes/')
    const value = lodash.filter(res.data, x => x.id === id);

    return value
  }

  saveThumbnail(id){
    const url = `https://api.opendota.com${dotaconstants.heroes[id].img}`

    imageDownloader.image({
        url, url,
        dest: `./content/${id}.png`
    })

    return `./content/${id}.png`
  }

	getContent({match, player}){
    const data = {}
		const heroName = player.hero[0].localized_name
		const itens = player.itens.filter(value => value !== '').join(' \n ')
		const players = player.names.join(' \n ')
		const itensTag = player.itens.filter(value => value !== '').join(', ')
		const result = player.win ? 'Vitória' : 'Derrota'

		data.id = match.match_id
		data.title = `Partida jogando com ${heroName} | Dota 2 ${player.patch} by jhowl`
		// data.thumbnail = player.heroThumbnail
		data.description = `Partida jogando com herói ${heroName} do dota 2 no patch ${player.patch}

		Jogando do lado dos ${player.sideMap} do mapa
    ID da partida: ${data.id}

    Meus dados nesta partida de dota 2 jogando com ${heroName}:
    Kills: ${player.kills},
    Deaths: ${player.deaths},
    Assistências: ${player.assists},
    Total de ouro (Patrimônio Líquido): ${player.total_gold}g

		Os itens que foram feitos para ${heroName} nesta partida são:
		${itens}

		Acesse Meu site: https://jhowl.com

		Criando um histórico (archive) de partidas e gameplays que faço e deixando salvo aqui no youtube para futuras lembranças e compartilhamento com a web.
		Vídeo  do jogo está completo com a resolução 1080p a 60fps

		Eu sou o agresif hamster e também conhecido como Jhowl.

		jogadores nesta partida:
		${players}

		Resultado dessa partida de dota 2 foi uma ${result} com ${heroName}

		#dota2 #${heroName.replace(/ /g,'')}`

    data.tags = `${heroName}, dota 2, dota2 ${heroName}, partida completa de ${heroName}, jogando com ${heroName},
      partida completa, ${player.name}, ${itensTag}, ${player.sideMap}, gameplay, game, gameplay ${heroName}, moba, jhowl,
      ${player.patch}, ${heroName} ${player.patch}`

    return data;
	}
}


module.exports = DotaMatch

