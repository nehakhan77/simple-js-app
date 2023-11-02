let pokemonRepository = (function () {
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let repository = [];

  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  //create a button for each Pokémon in the array
  function addListItem(item, index) {
    let pokemonList = document.querySelector(".list-group-item");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("list-group-item", "border-0", "text-center");
    let button = document.createElement("button");
    let image = document.createElement("img");
    let title = document.createElement("p");
    image.src =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      index +
      ".png";
    title.innerText = item.name;
    button.appendChild(image);
    button.appendChild(title);
    button.classList.add("btn"); // bootstrap class
    button.classList.add("btn-block"); //bootstrap class
    button.setAttribute("data-target", "#modal-container");
    button.setAttribute("data-toggle", "modal");
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
        item.weight = details.weight;
        item.types = [];
        for (var i = 1; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (var i = 1; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
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
    let modalHeader = $(".modal-header");

    modalBody.empty();
    modalHeader.empty();

    let nameElement = document.createElement("h1");
    nameElement.innerText = item.name;
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", item.imageURL);
    let heightElement = $("<p>" + "HEIGHT : " + item.height + "</p>");
    let weightElement = $("<p>" + "WEIGHT : " + item.weight + "</p>");
    let typesElement = $("<p>" + "TYPES : " + item.types.join(", ") + "</p>");
    let abilitiesElement = $(
      "<p>" + "ABILITIES : " + item.abilities.join(", ") + "</p>"
    );

    modalHeader.append(nameElement);
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
    showModal: showModal,
  };
})();

// LOADS THE DATA:
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon, index) {
    pokemonRepository.addListItem(pokemon, index + 1);
  });
});
