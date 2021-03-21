const FETCH_OFFSET = 0;
const FETCH_LIMIT = 150;
const FETCH_ALL_URL = `https://pokeapi.co/api/v2/pokemon?limit=${FETCH_LIMIT}&offset=${FETCH_OFFSET}`;

// const staticPokemonData = [
//   { id: 4, name: 'Charmander', types: ['fire'], base_experience: 62 },
//   { id: 7, name: 'Squirtle', types: ['water'], base_experience: 63 },
//   { id: 11, name: 'Metapod', types: ['bug'], base_experience: 72 },
//   { id: 26, name: 'Raichu', types: ['electric'], base_experience: 111 },
//   { id: 58, name: 'Growlithe', types: ['fire'], base_experience: 65 },
//   { id: 59, name: 'Arkanine', types: ['fire'], base_experience: 137 },
//   { id: 123, name: 'Scizor', types: ['bug', 'flying'], base_experience: 107 },
//   { id: 150, name: 'Mewtwo', types: ['psychic'], base_experience: 150 },
// ];

const getPokemonIdByUrl = (url) => Number(url.split('/').filter(Boolean).pop());

function getPokemonImageSrc(pokemonId) {
  const padThreeID = (pokemonId) => `${pokemonId}`.padStart(3, '0');
  const POKEMON_API =
    'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';

  return `${POKEMON_API}${padThreeID(pokemonId)}.png`;
}

async function fetchDataByUrl(url) {
  const result = await fetch(url);
  return result.json();
}

// fetch all Pokemon data
async function getAllPokemonData() {
  const { results } = await fetchDataByUrl(FETCH_ALL_URL);
  return results;
}

function createRandomColorRGBA() {
  const rnd = () => Math.floor(Math.random() * 255);
  return `rgba(${rnd()}, ${rnd()}, ${rnd()}, 0.5)`;
}

const sortCompare = (a, b) => {
  const aId = getPokemonIdByUrl(a.url);
  const bId = getPokemonIdByUrl(b.url);
  aId > bId ? 1 : bId > aId ? -1 : 0;
};
