let pokemonRepository = (function () {
    let repository = [
        { name: "Bulbasaur", type: "grass", height: "7" },
        { name: "Charmander", type: "fire", height: "2" },
        { name: "Squirtle", type: "water", height: "12" }
    ];

    function add(pokemon) {
        repository.push(pokemon);
    }

    function getAll() {
        return repository;
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    //create a button for each Pokémon in the array
    function addListitem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        // adding an event listener for button
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListitem: addListitem,
        showDetails: showDetails
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListitem(pokemon);
});


