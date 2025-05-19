const pokemonList = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search");

async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
  };
}

async function fetchFirstPokemon() {
  const pokemon = await fetchPokemon(1);
  console.log(pokemon);
}

fetchFirstPokemon();
