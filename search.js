document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const pokemonDataDiv = document.getElementById('pokemonData');
    pokemonDataDiv.innerHTML = '';

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const pokemon = await response.json();
        displayPokemon(pokemon);
    } catch (error) {
        pokemonDataDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
});

function displayPokemon(pokemon) {
    const pokemonDataDiv = document.getElementById('pokemonData');
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'pokemon-card';

    pokemonCard.innerHTML = `
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <a href="details.html?name=${pokemon.name}" class="btn btn-info">View Details</a>
    `;

    pokemonDataDiv.appendChild(pokemonCard);
}
