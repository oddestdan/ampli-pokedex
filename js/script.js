document.body.style.backgroundColor = createRandomColorRGBA();

window.onload = formPokedex;

async function formPokedex() {
  const pokedex = document.getElementById('pokedexCards');

  const fetchedPokemon = await getAllPokemonData();
  const fullPokemonData = await Promise.all(
    fetchedPokemon.map(({ url }) => fetchDataByUrl(url))
  );
  const sortedPokemonData = fullPokemonData.sort((p1, p2) => p1.id - p2.id);

  sortedPokemonData.forEach((pokemon) => {
    pokedex.appendChild(createCard(pokemon));
  });
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
