module.exports = ({match, player}) => {
    const data = {}
		const heroName = player.hero[0].localized_name
		const itens = player.itens.filter(value => value !== '').join(' \n ')
		const players = player.names.join(' \n ')
		const itensTag = player.itens.filter(value => value !== '').join(', ')
		const result = player.win ? 'Vitória' : 'Derrota'

		data.id = match.match_id
		data.title = `Partida jogando com ${heroName} | Dota 2 ${player.patch} by jhowl`
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

  data.tags = `${heroName}, dota 2, dota2 ${heroName}, partida completa de ${heroName}, jogando com ${heroName}, partida completa, ${player.name}, ${itensTag}, ${player.sideMap}, gameplay, game, gameplay ${heroName}, moba, jhowl, ${player.patch}, ${heroName} ${player.patch}, patch ${player.patch}`

  return data;
}
