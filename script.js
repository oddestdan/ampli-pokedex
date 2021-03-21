window.onload = formPokedex;

const FETCH_OFFSET = 0;
const FETCH_LIMIT = 20;

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

const getPokemonIdByUrl = (url) => url.split('/').filter(Boolean).pop();

async function formPokedex() {
  // TODO: implement more nicely
  const sortCompare = (a, b) => {
    const aId = getPokemonIdByUrl(a.url);
    const bId = getPokemonIdByUrl(b.url);
    aId > bId ? 1 : bId > aId ? -1 : 0;
  };

  const pokedex = document.getElementById('pokedexCards');

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${FETCH_LIMIT}&offset=${FETCH_OFFSET}`
  );
  const { results: pokemonData } = await response.json();

  const sorted = pokemonData.sort(sortCompare);
  console.table(sorted);

  // TODO: Try fetching before creating

  // TODO: extract into a new function
  sorted.forEach(async ({ url }) => {
    const response = await fetch(url);
    const pokemon = await response.json();

    const pokemonCard = createCard(pokemon);
    console.log(`Pokemon ID: %c${pokemon.id}`, 'color: orangered');
    pokedex.appendChild(pokemonCard);
  });
}

// fetch Pokemon image data
function getPokemonImageSrc(pokemonId) {
  const padThreeID = (pokemonId) => `${pokemonId}`.padStart(3, '0');
  const POKEMON_API =
    'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';

  return `${POKEMON_API}${padThreeID(pokemonId)}.png`;
}

// fetch all Pokemon data
async function getAllPokemonData() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${FETCH_LIMIT}&offset=${FETCH_OFFSET}`
  );
  const { results } = await response.json();
  return results;
}

function createRandomColorRGBA() {
  const rnd = () => Math.floor(Math.random() * 255);
  return `rgba(${rnd()}, ${rnd()}, ${rnd()}, 0.5)`;
}

// create Card Node with all the data
function createCard({ id, name, types, base_experience: exp }) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardBg = document.createElement('div');
  cardBg.classList.add('card__bg');

  const cardTitle = document.createElement('h1');
  cardTitle.classList.add('card__title');
  cardTitle.innerText = `# ${id} ${name}`;

  const cardImage = document.createElement('img');
  cardImage.classList.add('card__image');
  cardImage.src = getPokemonImageSrc(id);
  cardImage.alt = name;

  const cardType = document.createElement('div');
  cardType.classList.add('card__data');
  cardType.innerText = `Types: ${types
    .map(({ type }) => type.name)
    .join(', ')}`;

  const cardExp = document.createElement('div');
  cardExp.classList.add('card__data');
  cardExp.innerText = `Exp: ${exp}`;

  [cardBg, cardTitle, cardImage, cardType, cardExp].forEach((elem) => {
    card.appendChild(elem);
  });

  return card;
}
