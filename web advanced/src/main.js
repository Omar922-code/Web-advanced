const pokemonList = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search");
const typeSelect = document.getElementById("type-filter");
const showFavoritesToggle = document.getElementById("show-favorites-toggle");
const sortSelect = document.getElementById("sort-select");

let allPokemon = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function fetchPokemon(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error("Network response not ok");
    const data = await res.json();

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map(t => t.type.name).join(", "),
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map(a => a.ability.name).join(", "),
    };
  } catch (error) {
    console.error("Failed to fetch Pokémon", error);
    return null;
  }
}

async function fetchAllPokemon() {
  const promises = [];
  for (let i = 1; i <= 50; i++) {
    promises.push(fetchPokemon(i));
  }
  const results = await Promise.all(promises);
  allPokemon = results.filter(p => p !== null);
  populateTypeFilter();
  updateDisplayedPokemon();
}

function displayPokemon(pokemonArray) {
  pokemonList.innerHTML = "";

  if (pokemonArray.length === 0) {
    pokemonList.innerHTML = `<p>Geen Pokémon gevonden.</p>`;
    return;
  }

  pokemonArray.forEach(pokemon => {
    const isFav = favorites.includes(pokemon.id);

    const card = document.createElement("div");
    card.className = "pokemon-card" + (isFav ? " favorite" : "");

    card.innerHTML = `
      <button class="favorite-btn ${isFav ? 'filled' : ''}" data-id="${pokemon.id}" aria-label="Favoriet">${isFav ? "⭐" : "☆"}</button>
      <img src="${pokemon.image}" alt="${pokemon.name}" />
      <div><strong>Naam:</strong> ${pokemon.name}</div>
      <div><strong>Pokedex ID:</strong> ${pokemon.id}</div>
      <div><strong>Type:</strong> ${pokemon.types}</div>
      <div><strong>Hoogte:</strong> ${pokemon.height}</div>
      <div><strong>Gewicht:</strong> ${pokemon.weight}</div>
    `;

    card.querySelector(".favorite-btn").addEventListener("click", () =>
      toggleFavorite(pokemon.id)
    );

    pokemonList.appendChild(card);
  });
}

function updateDisplayedPokemon() {
  const searchTerm = searchInput.value.toLowerCase();
  const typeFilter = typeSelect.value;

  let filtered = allPokemon.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm);
    const matchesType = typeFilter === "all" || pokemon.types.includes(typeFilter);
    const matchesFavorite = !showFavoritesToggle.checked || favorites.includes(pokemon.id);
    return matchesSearch && matchesType && matchesFavorite;
  });

  const sorted = sortPokemon(filtered);
  displayPokemon(sorted);
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(fav => fav !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateDisplayedPokemon();
}

function populateTypeFilter() {
  const types = new Set();
  allPokemon.forEach(p => {
    p.types.split(", ").forEach(t => types.add(t));
  });

  typeSelect.innerHTML = `<option value="all">Alle types</option>`;
  types.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typeSelect.appendChild(option);
  });
}

function sortPokemon(pokemonArray) {
  const sortValue = sortSelect.value;

  return pokemonArray.sort((a, b) => {
    switch (sortValue) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "height-asc":
        return a.height - b.height;
      case "height-desc":
        return b.height - a.height;
      case "weight-asc":
        return a.weight - b.weight;
      case "weight-desc":
        return b.weight - a.weight;
      case "id-desc":
        return b.id - a.id;
      case "id-asc":
      default:
        return a.id - b.id;
    }
  });
}

searchInput.addEventListener("input", updateDisplayedPokemon);
typeSelect.addEventListener("change", updateDisplayedPokemon);
showFavoritesToggle.addEventListener("change", updateDisplayedPokemon);
sortSelect.addEventListener("change", updateDisplayedPokemon);

fetchAllPokemon();
