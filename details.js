document.addEventListener('DOMContentLoaded', async function () {
    const params = new URLSearchParams(window.location.search);
    const pokemonName = params.get('name').toLowerCase();
    const pokemonDetailsDiv = document.getElementById('pokemonDetails');
    pokemonDetailsDiv.innerHTML = '';

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const pokemon = await response.json();
        displayPokemonDetails(pokemon);
    } catch (error) {
        pokemonDetailsDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
});

function displayPokemonDetails(pokemon) {
    const pokemonDetailsDiv = document.getElementById('pokemonDetails');

    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    const types = pokemon.types.map(type => type.type.name).join(', ');
    const stats = pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('');

    pokemonDetailsDiv.innerHTML = `
    <div class="pokemon-card">
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h4>Abilities:</h4>
        <p>${abilities}</p>
        <h4>Type:</h4>
        <p>${types}</p>
        <h4>Stats:</h4>
        <ul>${stats}</ul>
    </div>
`;
}

