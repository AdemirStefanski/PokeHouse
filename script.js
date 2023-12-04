let currentPageUrl = 'https://pokeapi.co/api/v2/pokemon'

window.onload = async () => {
    try { 
        await loadCharacters(currentPageUrl);
    }catch (error){
        console.log(error);
        alert('Error on loading pokémons')
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

    const rndInt = randomIntFromInterval(1, 8)

    //exchange wallpaper and make it static
    document.body.style.backgroundImage = `url('./assets/background_img/wall_00${rndInt}.jpg')`
    document.body.style.backgroundAttachment = "fixed";

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; //Limpando os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            let card_value = character.url

            let url = character.url;  
            let parts = url.split('/'); //separar a url em partes usando barra simples
            let lastPart = parts.pop() || parts.pop(); //pegamos a última parte que se refere ao número do pokémon desejado
            

            let str = "" + lastPart
            let pad = "000"
            let ans = pad.substring(0, pad.length - str.length) + str  //completamos o número obitido com zeros para podermos pegar a imagem correta do pokémon
            

            card.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ans}.png')`
            card.className = "cards"
            card.style.backgroundColor = 'rgba(255,180,180,0.3)';


            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            
            
            function capitalizeFLetter() { //Primeira letra maiúscula
                let string = character.name;
                var pokemon_name = string[0].toUpperCase() + string.slice(1);
                characterName.innerText = `${pokemon_name}`
            }
            capitalizeFLetter();
            
            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                altura(character.url);
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"
                const modalContent = document.getElementById("modal_content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ans}.png')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Pokémon: ${nameCapital(character.name)}`

                
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                
            
                 // teste dos dados url secundaria
                async function altura (urldois) {
                    const url3 = urldois;
                    const dados2 = await pokefunc(url3);
                    
                }

                //acessar a altura dentro da URL API
                async function pokefunc(url4) {
                    const data2 = await fetch(url4);
                    const data4 = await data2.json();
                    const data3 = await data4.height;
                    const dataweight = await data4.weight;
                    
                    const pokeHeight = document.createElement("span")
                    pokeHeight.className = "character-details"
                    pokeHeight.innerText = `Height: ${parseFloat(data3*0.1).toFixed(1)} m` ;
                    
                    const pokeWeight = document.createElement("span")
                    pokeWeight.className = "character-details"
                    pokeWeight.innerText = `Weight: ${parseFloat(dataweight*0.1).toFixed(1)} kg` ;
                    
                                  
                    modalContent.appendChild(pokeHeight)
                    modalContent.appendChild(pokeWeight)
                    
                    let tipos =[]
                    
                    for (i = 0; i < data4.types.length; i++) {
                        tipos.push(data4.types[i].type.name);
                    } 
                    
                    const pokeType1 = document.createElement("span")
                    pokeType1.className = "character-details"
                    pokeType1.innerText = `Type: ${tipos.join(', ')}` ;
                    modalContent.appendChild(pokeType1)
                }
            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById("next-button")
        const backButton = document.getElementById("back-button")

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"


        currentPageUrl = url

    } catch (error) {
        console.log(error)
        alert('Error on loading pokémons')
    }

   
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    }catch (error) {
        console.log(error)
        alert('Error on load next page')
    }
}


async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)
        
    }catch (error) {
        console.log(error)
        alert('Error on load previous page')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function nameCapital(name2) { //Primeira letra maiúscula
    let string = name2;
    let pokemon_name2 = string[0].toUpperCase() + string.slice(1);
    return pokemon_name2;
}

