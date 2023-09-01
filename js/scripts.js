let pokemonRepository = (function () {

    let pokemonList = [
        { name: "Bulbasaur", type: "grass", height: "7" },
        { name: "Charmander", type: "fire", height: "2" },
        { name: "Squirtle", type: "water", height: "12" }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

pokemonList.forEach(function (pokemon) {
    console.log(pokemon.name + ' is ' + pokemon.type + ' and is ' + pokemon.height + ' inches tall ');
});

// Updated loop code t0 access the pokemonList array that’s inside the IIFE
console.log(pokemonRepository.getAll())
