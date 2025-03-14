let pokemonData = []; // Almacena los datos de los Pokémon obtenidos de la API
let filteredPokemons = []; // Pokémon filtrados por búsqueda o tipo
let currentPage = 1; // Página actual
const perPage = 20; // Número de Pokémon por página

// Colores y íconos de los tipos de Pokémon
const typeStyles = {
    fire: { color: '#f08030', icon: 'fas fa-fire' },
    water: { color: '#6390f0', icon: 'fas fa-tint' },
    grass: { color: '#7ac74c', icon: 'fas fa-leaf' },
    electric: { color: '#f7d02c', icon: 'fas fa-bolt' },
    bug: { color: '#a8b820', icon: 'fas fa-bug' },
    normal: { color: '#a8a878', icon: 'fas fa-paw' },
    poison: { color: '#a040a0', icon: 'fas fa-skull-crossbones' },
    ice: { color: '#98d8d8', icon: 'fas fa-snowflake' },
    fighting: { color: '#c22e28', icon: 'fas fa-dumbbell' },
    flying: { color: '#a890f0', icon: 'fas fa-fighter-jet' },
    psychic: { color: '#f85888', icon: 'fas fa-brain' },
    rock: { color: '#b8a038', icon: 'fas fa-gem' },
    ghost: { color: '#7b62a3', icon: 'fas fa-ghost' },
    dragon: { color: '#6f35fc', icon: 'fas fa-dragon' },
    steel: { color: '#b7b7b7', icon: 'fas fa-cogs' },
    fairy: { color: '#f4b1e1', icon: 'fas fa-gem' }
};

// Función para obtener los Pokémon de la API
async function fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000'); // Puedes ajustar el límite si es necesario
    const data = await response.json();
    pokemonData = data.results;
    
    // Obtener los detalles de cada Pokémon (incluyendo el sprite)
    const pokemonDetailsPromises = pokemonData.map(pokemon => fetch(pokemon.url).then(res => res.json()));
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);

    // Agregar los sprites y tipos a cada Pokémon
    pokemonData = pokemonData.map((pokemon, index) => {
        return {
            ...pokemon,
            id: pokemonDetails[index].id,
            sprite: pokemonDetails[index].sprites.front_default,
            types: pokemonDetails[index].types.map(type => type.type.name)
        };
    });

    displayPokemons(pokemonData); // Muestra todos los Pokémon al inicio
}

// Función para mostrar los Pokémon en la página
function displayPokemons(pokemons) {
    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = ''; // Limpiar la lista antes de mostrar

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const paginatedPokemons = pokemons.slice(start, end);

    paginatedPokemons.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `
            <div class="card" onclick="window.location.href='pokemon-details.html?id=${pokemon.id}'">
                <img src="${pokemon.sprite}" alt="${pokemon.name}" class="pokemon-img">
                <h2>${pokemon.name}</h2>
                <div class="types-container">
                    ${pokemon.types.map(type => `<div class="type" style="background-color: ${typeStyles[type].color}">
                        <i class="${typeStyles[type].icon}"></i> ${type}</div>`).join('')}
                </div>
            </div>
        `;
        pokemonList.appendChild(pokemonCard);
    });
}

// Función para manejar la búsqueda
function searchPokemons() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const suggestionsContainer = document.getElementById('suggestions');
    
    if (searchInput === '') {
        suggestionsContainer.innerHTML = ''; // Limpiar las sugerencias si no hay texto
        filteredPokemons = pokemonData; // Restaurar los Pokémon filtrados
        displayPokemons(pokemonData); // Mostrar todos los Pokémon
        return;
    }

    // Filtrar los Pokémon basados en el texto de búsqueda
    filteredPokemons = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));

    // Mostrar las sugerencias debajo del campo de búsqueda
    suggestionsContainer.innerHTML = '';
    filteredPokemons.forEach(pokemon => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = pokemon.name;
        suggestionItem.onclick = () => {
            document.getElementById('search').value = pokemon.name;
            searchPokemons(); // Actualizar los resultados
            suggestionsContainer.innerHTML = ''; // Limpiar las sugerencias
        };
        suggestionsContainer.appendChild(suggestionItem);
    });

    displayPokemons(filteredPokemons); // Mostrar los Pokémon filtrados
}

// Función para cambiar de página
function changePage(direction) {
    if (direction === 'next' && (currentPage * perPage) < filteredPokemons.length) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }

    displayPokemons(filteredPokemons); // Mostrar los Pokémon de la nueva página
}

// Función para filtrar los Pokémon por tipo
function filterByType(type) {
    if (type === 'all') {
        filteredPokemons = pokemonData; // Mostrar todos los Pokémon
    } else {
        // Filtrar los Pokémon por tipo
        const filtered = pokemonData.filter(pokemon => pokemon.types.includes(type));
        filteredPokemons = filtered;
    }
    displayPokemons(filteredPokemons);
}

// Función para manejar los botones de tipo
document.querySelectorAll('.type-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.id;
        filterByType(type); // Filtrar los Pokémon por el tipo seleccionado
    });
});

// Llamar a fetchPokemons para cargar los datos cuando se carga la página
fetchPokemons();
