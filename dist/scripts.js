let pokemonRepository = (function () {
  let t = [];
  function e(e) {
    t.push(e);
  }
  function n() {
    return t;
  }
  function i(t) {
    pokemonRepository.loadDetails(t).then(function () {
      console.log(t), pokemonRepository.showModal(t);
    });
  }
  return {
    add: e,
    getAll: n,
    loadList: function t() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            let n = { name: t.name, detailsUrl: t.url };
            e(n), console.log(n);
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: function t(e) {
      return fetch(e.detailsUrl)
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          console.log(t),
            (e.imageURL = t.sprites.front_default),
            (e.height = t.height),
            (e.weight = t.weight),
            (e.types = []);
          for (var n = 0; n < t.types.length; n++)
            e.types.push(t.types[n].type.name);
          e.abilities = [];
          for (var n = 0; n < t.abilities.length; n++)
            e.abilities.push(t.abilities[n].ability.name);
          return t;
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    addListItem: function t(e) {
      let n = document.querySelector(".list-group-item"),
        o = document.createElement("li");
      o.classList.add("list-group-item", "border-0");
      let a = document.createElement("button");
      (a.innerText = e.name),
        a.classList.add("btn"),
        a.classList.add("btn-block"),
        a.classList.add("button-class"),
        a.setAttribute("data-target", "#modal-container"),
        a.setAttribute("data-toggle", "modal"),
        o.appendChild(a),
        n.appendChild(o),
        a.addEventListener("click", function (t) {
          i(e);
        });
    },
    showDetails: i,
    showModal: function t(e) {
      let n = $(".modal-body");
      $(".modal-title");
      let i = $(".modal-header");
      n.empty(), i.empty();
      let o = document.createElement("h1");
      o.innerText = e.name;
      let a = $('<img class="modal-img" style="width:50%">');
      a.attr("src", e.imageURL);
      let l = $("<p>HEIGHT : " + e.height + "</p>"),
        s = $("<p>WEIGHT : " + e.weight + "</p>"),
        r = $("<p>TYPES : " + e.types.join(", ") + "</p>"),
        p = $("<p>ABILITIES : " + e.abilities.join(", ") + "</p>");
      i.append(o),
        n.append(a),
        n.append(l),
        n.append(s),
        n.append(r),
        n.append(p);
    },
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
