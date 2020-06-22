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

        var url = ' https://pokeapi.co/api/v2/pokemon/ ';
        resultSetPlural = true;

    } else if ( pokemon ) {

        var url = ' https://pokeapi.co/api/v2/pokemon/' + pokemon;
        resultSetPlural = false;
      
    } else {

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

            let pokemonStats = "Name: " + pokemon + "<br>";          
            let pokemonTypes = "Type: ";

            data.types.forEach( singleType => {

                pokemonTypes += singleType.type.name + " / ";
               
            });

            pokemonTypes = pokemonTypes.slice( 0, pokemonTypes.length - 2 );
            pokemonStats += pokemonTypes;
            pokemonDisplay.innerHTML = pokemonStats;

       }
           
    });
    

};
getData( 0 , "bulbasaur" );