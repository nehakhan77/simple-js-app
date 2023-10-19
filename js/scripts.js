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
  function addListItem(item) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = item.name;
    button.setAttribute("data-target", "#modal-container");
    button.setAttribute("data-toggle", "modal");
    button.classList.add("btn", "btn-primary", "btn-lg", "button-custom");
    listItem.classList.add(
      "list-group-item",
      "row",
      "bg-transparent",
      "border-0"
    );
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

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageURLFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageURLBack);
    let heightElement = $("<p>" + "HEIGHT : " + item.height + "</p>");
    let weightElement = $("<p>" + "WEIGHT : " + item.weight + "</p>");
    let typesElement = $("<p>" + "TYPES : " + item.types.join(", ") + "</p>");
    let abilitiesElement = $(
      "<p>" + "ABILITIES : " + item.abilities.join(", ") + "</p>"
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
    showModal: showModal,
  };
})();

// LOADS THE DATA:
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
