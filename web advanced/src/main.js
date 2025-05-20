const pokemonList = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search");

let allPokemon = [];

async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
  };
}

async function fetchAllPokemon() {
  const promises = [];
  for (let i = 1; i <= 50; i++) {
    promises.push(fetchPokemon(i));
  }
  allPokemon = await Promise.all(promises);
  displayPokemon(allPokemon);
}

function displayPokemon(pokemonArray) {
  pokemonList.innerHTML = "";
  pokemonArray.forEach(p => {
    const card = document.createElement("div");
    card.className = "pokemon-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <p>${p.name}</p>
    `;
    pokemonList.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const filtered = allPokemon.filter(p =>
    p.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  displayPokemon(filtered);
});

fetchAllPokemon();
