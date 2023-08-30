let pokemonList = [
    { name: "Bulbasaur", type: "grass", height: "7" },
    { name: "Charmander", type: "fire", height: "2" },
    { name: "Squirtle", type: "water", height: "12" }
];

pokemonList.forEach(function (pokemon) {
    console.log(pokemon.name + ' is ' + pokemon.type + ' and is ' + pokemon.height + ' inches tall ');
});

