let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  //create a button for each Pokémon in the array
  function addListitem(item) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = item.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    // adding an event listener for button
    button.addEventListener("click", function (event) {
      showDetails(item);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        console.log(details);
        item.imageURL = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        return details;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
      pokemonRepository.showModal(item);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $("modal-title");
    let modalHeader = $("modal-header");

    modalBody.empty();
    modalTitle.empty();
    modalHeader.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElement = $('<img class="modal-img">');
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "HEIGHT : " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "WEIGHT : " + pokemon.weight + "</p>");
    let typesElement = $(
      "<p>" + "TYPES : " + pokemon.types.join(", ") + "</p>"
    );
    let abilitiesElement = $(
      "<p>" + "ABILITIES : " + pokemon.abilities.join(", ") + "</p>"
    );

    typesElement.addClass("array-item");
    abilitiesElement.addClass("array-item");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

// LOADS THE DATA:
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
