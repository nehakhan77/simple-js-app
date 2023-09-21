let pokemonRepository = (function () {
    let repository = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        repository.push(pokemon);
    }

    function getAll() {
        return repository;
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

    function LoadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageURL = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.log(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function (pokemon) {
            console.log(item);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListitem: addListitem,
        showDetails: showDetails,
        LoadList: LoadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.LoadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListitem(pokemon);
    });
});


