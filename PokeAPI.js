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

//current offset of pokemon list.  
let currentPokemonNum = 0;

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

            //show list of pokemon

            //add each pokemon from the result set to the all Pokemon in formatted html
            data.results.forEach( singlePokemon => {
                
                //single pokemon that on click loads that pokemon stats.
                allPokemon += ' <p onclick = \" getData( 0, \' ' + singlePokemon.name + ' \' ) \" class = \" pokemonList \" > ' + singlePokemon.name + ' </p> ';

            });
   
            //add formatted html to div pokemon display
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
            

       }// if ( resultSetPlural )
           
    });// end of fetch
    
};// getData()

 
/*----------  get stats of a single pokemon By Name ---------- */
let pokemonNameBtn = document.getElementById( 'submit' ); //selects the submit button
   
document.getElementById( 'submit' ).addEventListener( 'click', ( e ) => {

    //gets the pokemon name value
    let pokemonName = document.getElementById("pokemonName").value; 
    getData(0, pokemonName);

});

/*----------  Load Previous Pokemon ---------- */
let loadPrevPokemonBtn = document.getElementById( 'loadPrevBtn' ); 

loadPrevPokemonBtn.addEventListener( 'click', ( e ) => {

    //every time the button is clicked load previous 20 pokemon
    currentPokemonNum -= 20;
    getData( currentPokemonNum ); 
 
} );

/*---------- Load More Pokemon ---------- */
let loadMorePokemonBtn = document.getElementById( 'loadMoreBtn' ); 

loadMorePokemonBtn.addEventListener( 'click', ( e ) => {

    //every time the button is clicked load another 20 pokemon
    currentPokemonNum += 20;   
    getData( currentPokemonNum ); 

} );

//show list of pokemon on load of page.
getData(  );