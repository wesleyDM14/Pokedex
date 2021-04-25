var n = document.getElementById('n');
n.addEventListener('keyup', ()=>{
    getPokemons(n.value);
});

function getPokemons(n){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+n)
    .then(response => response.json())
    .then(allpokemon => {
        var pokemons = [];
        allpokemon.results.map((val)=>{
            fetch(val.url)
                .then(response => response.json())
                .then(pokemonSingle => {
                    pokemons.push({
                        name:val.name,
                        image:pokemonSingle.sprites.front_default
                    });
                    if(pokemons.length == n){
                        //end ofs fetch's
                        var pokemonBoxes = document.querySelector('.pokemon-boxes');
                        pokemonBoxes.innerHTML ="";
                        pokemons.map(function(val){
                            pokemonBoxes.innerHTML += `
                                <div class='pokemon-box'>
                                    <img src='`+val.image+`' />
                                    <p>`+val.name+`</p>
                                </div>
                            `;
                        });
                    }
                });
        })
    });
}