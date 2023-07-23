let repository = [
    { name: "Bulbasaur", type: "grass", height: "7" },
    { name: "Charmander", type: "fire", height: "2" },
    { name: "Squirtle", type: "water", height: "12" }
];

//A loop to display all list items using the "forEach Loop" format, including a conditional to check if height is within a certain value between 15 and 10.
for (let i = 0; i < repository.length; i++) {
    document.write(repository[i].name + " is " + repository[i].height + ' ');
    if (repository[i].height < 15 && repository[i].height > 10) {
        document.write("-Wow that's big!")
    };
}