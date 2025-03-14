const pokemonListContainer = document.getElementById('pokemon-list');
const searchInput = document.getElementById('search');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const typeButtons = document.querySelectorAll('.type-buttons button');

let currentPage = 1;
let currentType = '';
let searchQuery = '';

const fetchPokemons = async (page = 1, type = '', query = '') => {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`;
    
    if (type) {
        url = `https://pokeapi.co/api/v2/type/${type}/`;
    }

    if (query) {
        url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (type) {
        displayPokemons(data.pokemon.map(p => p.pokemon));
    } else if (query) {
        displayPokemons([data]);
    } else {
        displayPokemons(data.results);
    }
};

const displayPokemons = (pokemons) => {
    pokemonListContainer.innerHTML = '';
    pokemons.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('card');
        
        const pokemonData = pokemon.url ? pokemon.url.split('/').slice(-2)[0] : pokemon.name;

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData}`)
            .then(res => res.json())
            .then(data => {
                pokemonCard.innerHTML = `
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                `;
                pokemonListContainer.appendChild(pokemonCard);
            });
    });
};

const changePage = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next') {
        currentPage++;
    }
    fetchPokemons(currentPage, currentType, searchQuery);
};

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    fetchPokemons(1, currentType, searchQuery);
});

// Botones de tipo
typeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        currentType = e.target.id === 'all' ? '' : e.target.id;
        fetchPokemons(1, currentType, searchQuery);
    });
});

fetchPokemons();
