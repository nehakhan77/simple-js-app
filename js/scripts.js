let repository = [
    { name: "Bulbasaur", type: "grass", height: "7" },
    { name: "Charmander", type: "fire", height: "2" },
    { name: "Squirtle", type: "water", height: "12" }
];

repository.foreach(function (pokemonlist) {
    console.log(pokemonlist);
});

