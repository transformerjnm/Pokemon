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

let loadPrevPokemonBtn = document.getElementById( 'loadPrevBtn' ); 
let loadMorePokemonBtn = document.getElementById( 'loadMoreBtn' ); 
let allPokemonBtn = document.getElementById('allPokemonBtn');


let getMove = ( move,  pokemonName ) => {
    console.log(move, pokemonName)
    req = 'https://pokeapi.co/api/v2/move/' + move;
    console.log(req)
    fetch( req ).then(

        ( response ) => {

            return response.json();

        }

    )//.then fetch
    .then(

        ( data ) => {
          
            let pokemonMove = "";
            
            pokemonMove += '<h3>' + data.name + '</h3><br><br>';

            if( data.accuracy ) {

                pokemonMove += '<span style="font-size: 1.2rem" > Accuracy: ' + data.accuracy + '</span><br><br>';

            }
           
            if ( data.effect_chance ) {

                pokemonMove += '<span style="font-size: 1.2rem" > Effect Chance: ' + data.effect_chance + '&#37;</span><br><br>';  

            }

            if( data.power ) {

                pokemonMove += '<span style="font-size: 1.2rem" > Power: ' + data.power + '</span><br><br>';

            }
           
            if( data.pp ) {

                pokemonMove += '<span style="font-size: 1.2rem" > Power Points: ' + data.pp + '</span><br><br>';

            }
            pokemonMove += '<button type="button" class="btn btn-primary currentPokemonBtn" onclick = \" getPokemon( 0, \'' + pokemonName + '\' ) \" >'+ pokemonName +'</button><br><br>'
            pokemonDisplay.innerHTML = pokemonMove;

        }//anonyms function

    )//.then fetch

}//getMove()


let getPokemon = ( offset, pokemon ) => {
   
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

    ).then( 
        
        ( data ) => {
        
            if ( resultSetPlural ) {
                //show list of pokemon

                let i = 1;
                let halfPokemonNum = (data.results.length / 2 );

                //create a row and two col
                let firstColPokemon = "<div class=\"row\" > <div class=\"col-sm-6\" > ";
                let secondColPokemon = "<div class=\"col-sm-6\" >";

                
                //add each pokemon from the result set to the all Pokemon in formatted html
                data.results.forEach( singlePokemon => {
                        
                    //put first half of pokemon into first col
                    if( i <= halfPokemonNum ) {

                        firstColPokemon += ' <p onclick = \" getPokemon( 0, \'' + singlePokemon.name + '\' ) \" class = \" pokemonList \" > ' + singlePokemon.name + ' </p> ';
                        i++;

                    } else {

                        //second half of pokemon in second col
                        secondColPokemon += ' <p onclick = \" getPokemon( 0, \'' + singlePokemon.name + '\' ) \" class = \" pokemonList \" > ' + singlePokemon.name + ' </p> ';
                        i++;

                    }
                    
                });//foreach

                //close col div
                firstColPokemon += "</div>";
                secondColPokemon += "</div>";
                
                //add two cols together and close row div
                allPokemon = firstColPokemon + secondColPokemon + "</div>";

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

                //get each pokemon moves and separates them by a comma
                data.moves.forEach( move => {
                        
                    //move array is an array of all the moves the current pokemon has.
                    let moveArray = Object.entries(move.move);
                    
                    pokemonMoves += '<span class="pokemonMove" onclick = \" getMove( \'' + moveArray[0][1] + '\' , \''+ pokemon +'\' ) \" >' + moveArray[0][1] + "</span>, ";
                    
                    
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

                //hide prev and more poke btn and show all poke btn            
                loadPrevPokemonBtn.classList.add('d-none');
                loadMorePokemonBtn.classList.add('d-none');
                allPokemonBtn.classList.remove('d-none');

                    

            }// if ( resultSetPlural )
           
        }//fetch.then()

    );// end of fetch
    
};// getPokemon()

 
/*----------  get stats of a single pokemon By Name ---------- */

//selects the submit button
let pokemonNameBtn = document.getElementById( 'submit' ); 
   
document.getElementById( 'submit' ).addEventListener( 'click', ( e ) => {

    //gets the pokemon name value
    let pokemonName = document.getElementById("pokemonName").value; 
    getPokemon(0, pokemonName);

    //hide prev and more poke btn and show all poke btn   
    loadPrevPokemonBtn.classList.add('d-none');
    loadMorePokemonBtn.classList.add('d-none');
    allPokemonBtn.classList.remove('d-none');

});


/*----------  Load Previous Pokemon ---------- */

loadPrevPokemonBtn.addEventListener( 'click', ( e ) => {

    //every time the button is clicked load previous 20 pokemon
    currentPokemonNum -= 20;
    getPokemon( currentPokemonNum ); 
 
} );


/*---------- Load More Pokemon ---------- */

loadMorePokemonBtn.addEventListener( 'click', ( e ) => {

    //every time the button is clicked load another 20 pokemon
    currentPokemonNum += 20;   
    getPokemon( currentPokemonNum ); 

} );


/*---------- show all pokemon ----------- */

allPokemonBtn.addEventListener('click', ( e ) => {

    getPokemon( );

    //show prev and more poke btn and hide all poke btn   
    loadPrevPokemonBtn.classList.remove('d-none');
    loadMorePokemonBtn.classList.remove('d-none');
    allPokemonBtn.classList.add('d-none');


});

//show list of pokemon on load of page.
getPokemon( );