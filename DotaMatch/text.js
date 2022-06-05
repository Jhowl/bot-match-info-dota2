module.exports = ({ match, player }) => {
  const data = {}
  const heroName = player.hero[0].localized_name
  const itens = player.itens.filter(value => value !== '').join(' \n ')
  const players = player.names.join(' \n ')
  const itensTag = player.itens.filter(value => value !== '').join(', ')
  const result = player.win ? 'Win' : 'Lose'

  data.id = match.match_id
  data.title = `Partida jogando com ${heroName} | Dota 2 ${player.patch} by jhowl`
  data.description = `

  Hero ${heroName} Dota 2 patch ${player.patch}

  ${player.sideMap}
  Match ID: ${data.id}

  ${heroName}:
  Kills: ${player.kills},
  Deaths: ${player.deaths},
  Assist: ${player.assists},
  Gold: ${player.total_gold}g

  ${heroName} itens:
  ${itens}

  site: https://jhowl.com

  Players:
  ${players}

  Result ${result}  ${heroName}

  #dota2 #${heroName.replace(/ /g, '')}`

  data.tags = `${heroName}, dota 2, dota2 ${heroName}, partida completa de ${heroName}, jogando com ${heroName}, partida completa, ${player.name}, ${itensTag}, ${player.sideMap}, gameplay, game, gameplay ${heroName}, moba, jhowl, ${player.patch}, ${heroName} ${player.patch}, patch ${player.patch}`
  data.tags2 = `${heroName}, dota 2, dota2 ${heroName}, match with ${heroName}, match ${heroName}, dota 2 complete match , ${player.name}, ${itensTag}, ${player.sideMap}, gameplay, game, gameplay ${heroName}, moba, ${player.patch}, ${heroName} ${player.patch}, patch ${player.patch}`

  return data;
}
