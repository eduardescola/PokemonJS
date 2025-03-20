let pokemonData = []; // Almacena los datos de los Pokémon obtenidos de la API
let filteredPokemons = []; // Pokémon filtrados por búsqueda o tipo (para mostrar en la UI)
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
    fairy: { color: '#f4b1e1', icon: 'fas fa-gem' },
    dark: { color: '#705848', icon: 'fas fa-moon' },
    ground: { color: '#e0c068', icon: 'fas fa-mountain' },
};

// Función para obtener los Pokémon de la API
async function fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    pokemonData = data.results;

    const pokemonDetailsPromises = pokemonData.map(pokemon => fetch(pokemon.url).then(res => res.json()));
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);

    pokemonData = pokemonData.map((pokemon, index) => {
        return {
            ...pokemon,
            id: pokemonDetails[index].id,
            sprite: pokemonDetails[index].sprites.front_default,
            types: pokemonDetails[index].types.map(type => type.type.name)
        };
    });

    // Guardar los datos completos en localStorage
    localStorage.setItem('pokemons', JSON.stringify(pokemonData));
    filteredPokemons = [...pokemonData]; // Inicializa con todos los Pokémon
    displayPokemons(pokemonData); // Muestra todos los Pokémon al cargar
}

// Función para mostrar los Pokémon paginados
function displayPokemons(pokemons) {
    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = ''; // Limpiar la lista antes de mostrar

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const paginatedPokemons = pokemons.slice(start, end);

    if (paginatedPokemons.length === 0) {
        pokemonList.innerHTML = "No hay Pokémon disponibles para mostrar en esta página.";
        return;
    }

    paginatedPokemons.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `        
            <div class="card" onclick="window.location.href='pokemon-details.html?id=${pokemon.id}'">
                <div class="pokemon-actions">
                    <button class="edit-btn" onclick="editPokemon(event, ${pokemon.id})">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="delete-btn" onclick="deletePokemon(event, ${pokemon.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <img src="${pokemon.sprite}" alt="${pokemon.name}" class="pokemon-img">
                <h2>${pokemon.name}</h2>
                <div class="types-container">
                    ${pokemon.types.map(type => `<div class="type" style="background-color: ${typeStyles[type].color}"><i class="${typeStyles[type].icon}"></i> ${type}</div>`).join('')}
                </div>
            </div>
        `;
        pokemonList.appendChild(pokemonCard);
    });
}

// Función para buscar Pokémon
function searchPokemons() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const suggestionsContainer = document.getElementById('suggestions');

    if (searchInput === '') {
        suggestionsContainer.innerHTML = ''; // Limpiar las sugerencias si no hay texto
        filteredPokemons = [...pokemonData]; // Restaurar los Pokémon filtrados
        currentPage = 1; // Reiniciar la página a la 1
        displayPokemons(pokemonData); // Mostrar todos los Pokémon
        return;
    }

    // Filtrar los Pokémon por nombre
    filteredPokemons = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));
    currentPage = 1; // Reiniciar la página a la 1

    // Mostrar sugerencias
    suggestionsContainer.innerHTML = ''; // Limpiar las sugerencias previas
    filteredPokemons.slice(0, 5).forEach(pokemon => { // Mostrar hasta 5 sugerencias
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = pokemon.name;
        suggestionItem.onclick = () => {
            document.getElementById('search').value = pokemon.name; // Rellenar el campo con el nombre seleccionado
            suggestionsContainer.innerHTML = ''; // Limpiar las sugerencias al seleccionar
            filteredPokemons = [pokemon]; // Solo mostrar el Pokémon seleccionado
            displayPokemons(filteredPokemons); // Mostrar el Pokémon seleccionado
        };
        suggestionsContainer.appendChild(suggestionItem);
    });

    // Mostrar los Pokémon filtrados
    displayPokemons(filteredPokemons);
}

// Función para editar Pokémon
function editPokemon(event, id) {
    event.stopPropagation(); // Prevenir que el clic en el botón de editar dispare el clic en la tarjeta
    window.location.href = `edit.html?id=${id}`;  // Redirigir a la página de edición
}

// Función para eliminar un Pokémon
function deletePokemon(event, id) {
    event.stopPropagation();
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este Pokémon?');
    if (confirmDelete) {
        // Eliminar el Pokémon de la lista
        pokemonData = pokemonData.filter(pokemon => pokemon.id !== id);
        filteredPokemons = filteredPokemons.filter(pokemon => pokemon.id !== id);

        // Actualizar el localStorage
        localStorage.setItem('pokemons', JSON.stringify(pokemonData));

        // Asegurar que la página actual es válida después de la eliminación
        const maxPages = Math.ceil(filteredPokemons.length / perPage);
        if (currentPage > maxPages) {
            currentPage = maxPages; // Ajustar la página actual
        }

        displayPokemons(filteredPokemons); // Mostrar los Pokémon actualizados
    }
}

// Función para cambiar de página
function changePage(direction) {
    const maxPages = Math.ceil(filteredPokemons.length / perPage);

    if (direction === 'next' && currentPage < maxPages) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }

    displayPokemons(filteredPokemons); // Mostrar los Pokémon de la nueva página
}

// Función para filtrar los Pokémon por tipo
function filterByType(type) {
    if (type === 'all') {
        filteredPokemons = [...pokemonData]; // Mostrar todos los Pokémon
    } else {
        filteredPokemons = pokemonData.filter(pokemon => pokemon.types.includes(type)); // Filtrar por tipo
    }

    currentPage = 1; // Reiniciar la página a la 1
    displayPokemons(filteredPokemons); // Mostrar los Pokémon filtrados
}

// Manejar los botones de tipo
document.querySelectorAll('.type-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.id;
        filterByType(type); // Filtrar los Pokémon por tipo
    });
});

// Cargar Pokémon desde localStorage o desde la API
window.onload = () => {
    const storedPokemons = JSON.parse(localStorage.getItem('pokemons'));
    if (storedPokemons) {
        pokemonData = storedPokemons;
        filteredPokemons = [...pokemonData]; // Inicializa el filtrado con todos los Pokémon
        displayPokemons(pokemonData); // Mostrar todos los Pokémon al cargar
    } else {
        fetchPokemons(); // Si no hay Pokémon en el almacenamiento, los cargamos desde la API
    }
}
