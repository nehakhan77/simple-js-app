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

console.log(pokemonRepository.getAll())


