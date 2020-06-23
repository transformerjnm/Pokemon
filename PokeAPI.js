/*

    git init
    git remote add origin https://github.com/transformerjnm/Pokemon.git





    git checkout -b <branchname>

    git add .
    git commit -m "first commit"

    git checkout master

    git merge <branchname>

    git branch -d <branchname>

    somehow pull from master branch now and before coding with cmd 

   
    
    

*/

let getData = ( offset, pokemon ) => {

    let pokemonDisplay =  document.getElementById( 'pokemonDisplay' );
    let allPokemon = "";
    //if were getting more than one pokemon true else false
    let resultSetPlural = true;

    if( !offset && !pokemon ) {

        //get first 20 pokemon
        var url = ' https://pokeapi.co/api/v2/pokemon/ ';
        resultSetPlural = true;

    } else if ( pokemon ) {

        //get info about a specific pokemon
        var url = ' https://pokeapi.co/api/v2/pokemon/' + pokemon;
        resultSetPlural = false;
      
    } else {

        //get pokemon with a offset
        var url = ' https://pokeapi.co/api/v2/pokemon/?offset=' + offset;
        resultSetPlural = true;

    }

    var req = new Request( url );
    
    fetch( req )
    .then(
        ( response ) => {
            
            return response.json();
            
    }  
    ).then( ( data ) => {
        
       if ( resultSetPlural ) {

            data.results.forEach( singlePokemon => {
                
                allPokemon += '<p>' + singlePokemon.name + '</p>';

            });
   
             pokemonDisplay.innerHTML = allPokemon;
      
       } else {
            
           //show info about single pokemon
        
            //pokemonStats is all the stats for the pokemon. name, type, abilities etc.
            let pokemonStats = "<h5 id=\"pokemonName\"> Name: " + pokemon + "</h5><br>";  
            
            //pokemonTypes is just the current pokemon types       
            let pokemonTypes = "<p id=\"pokemonType\"> Type: ";

            //pokemonMoves is all of the current pokemon's moves
            let pokemonMoves = "<p id=\"pokemonMoves\"> Moves: ";

            data.moves.forEach( move => {
                
                //move array is an array of all the moves the current pokemon has.
                let moveArray = Object.entries(move.move);
                

                pokemonMoves +=  moveArray[0][1] + ", ";
               

            });
                
            //gets each pokemon type and adds a / after
            data.types.forEach( singleType => {

                pokemonTypes += singleType.type.name + " / ";
               
            });

            //removes last 
            pokemonTypes = pokemonTypes.slice( 0, pokemonTypes.length - 2 );
            
            //closes the paragraph for pokemon types.
            pokemonTypes += "</p>";

            //adds formated pokemon types to pokemon stats 
            pokemonStats += pokemonTypes;

            pokemonStats += pokemonMoves;

            //show user the pokemon info
            pokemonDisplay.innerHTML = pokemonStats;
            

       }
           
    });
    

};

 
    let pokemonNameBtn = document.getElementById('submit');
   
    document.getElementById('submit').addEventListener( 'click', (e) => {

        let pokemonName = document.getElementById("pokemonName").value;
        getData(0, pokemonName);

    });

    let loadMorePokemonBtn = document.getElementById('loadMoreBtn');

    loadMorePokemonBtn.addEventListener( 'click', (e) => {
        getData(20);
    } );





// getData( 0 , "squirtle" );
getData(  );