const searchPok = document.getElementById('search')
console.log(searchPok)
const handleKeyupInput = (e) => {
 console.log(e.keyCode)
  if (e.keyCode == 13) {
    research();
    e.target.value = "";
  }
}

const research = () => {  
  console.log('het 2e werkt ook')
  let searchedPok = searchPok.value
  console.log(searchedPok)
  fetch('https://pokeapi.co/api/v2/generation/1/')   
  .then(response => response.json())    
  .then(myJson => findPokemons(myJson)) 
  


const findPokemons = (myJson) => {
  console.log(myJson)
  let species = myJson.pokemon_species
  console.log(species)  
 
  species.forEach(pokemon => {
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
    .then(r => r.json())  
    .then(myJson2 => {
      
      if (searchedPok === myJson2.name) {      
            
      let pokId = myJson2.id
      let pokName = myJson2.name
      let pokMove01 = myJson2.moves[0].move.name
      let pokMove02 = myJson2.moves[1].move.name
      let pokMove03 = myJson2.moves[2].move.name
      let pokMove04 = myJson2.moves[3].move.name
      let pokImage = myJson2.sprites.front_default    


      console.log(pokImage, pokId, pokName, pokMove01)
      console.log(myJson2)
      console.log(document.getElementsByClassName("pokeID")[0])
      document.getElementsByClassName("pokeID")[0].innerText = pokId
      document.getElementsByClassName("pokeName")[0].innerHTML = pokName
      document.getElementById("move01").innerText = pokMove01
      document.getElementById("move02").innerText = pokMove02
      document.getElementById("move03").innerText = pokMove03
      document.getElementById("move04").innerText = pokMove04
      document.getElementById("pokeImage").src = pokImage


      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokId}/`)
      .then(res => res.json())
      .then(myJson3 => {
          console.log(myJson3.evolves_from_species)
        
          let pokPrev = myJson3.evolves_from_species.url
          let pokPrevId = pokPrev.split("/")[6]
          console.log(pokPrevId)

          let pokPrevFoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokPrevId}.png`
                 
          console.log(pokPrevFoto)
          document.getElementById("pokePrevious").src = pokPrevFoto

        
      })
      .catch(error => {
        console.log(error)
        
        document.getElementById("pokePrevious").src = 'kruis.png'
        document.getElementById("pokePrevious").style.height = '80px'   
        document.getElementById("pokePrevious").style.width = 'auto'   
        document.getElementById("pokePrevious").style.left = '25px'   
        document.getElementById("pokePrevious").style.margin = '45px'   
       
      })

      

    }
    })
    
    
  });
  
  
}


}

searchPok.addEventListener('keyup', handleKeyupInput)
  

