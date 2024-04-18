const btnSearch = document.getElementById("btn-search");
const btnShiny = document.getElementById("btn-shiny");
const btnCry = document.getElementById("btn-cry");

const imgSprite = document.querySelector(".screen-sprite");
const informationsPanel = document.querySelector(".pokemon-informations");
const typesPanel = document.querySelector(".pokemon-types");

btnSearch.addEventListener("click", showPokemon);

function showPokemon() {
  // Takes the value of the input search field (pokemon name)
  const inputValue = document
    .getElementById("input-search")
    .value.toLowerCase();
  btnShiny.innerText = "Shiny Version";

  // Calls the API
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);

          // Set src for image sprite
          imgSprite.src = data.sprites.front_default;

          // Choose a random abilituy for the pokemon
          let rndNum = getRndInteger(0, data.abilities.length);

          // Set Pokemon general informations
          const infotmationsComponent = `
            <div class="pokemon-informations-name">
              <p>
                No.${data.id} - ${data.name}
                <span
                  ><img
                    src="./assets/Pokeball_Icon.png"
                    width="20px"
                    height="auto"
                /></span>
              </p>
            </div>
            <div class="pokemon-informations-stats">
              <p>HP: ${data.stats[0].base_stat}</p>
              <p>Attack: ${data.stats[1].base_stat}</p>
              <p>Defense: ${data.stats[2].base_stat}</p> 
              <p>Sp. Atk: ${data.stats[3].base_stat}</p>
              <p>Sp. Def: ${data.stats[4].base_stat}</p>
              <p>Speed: ${data.stats[5].base_stat}</p>
            </div>
            <div class="pokemon-information-misc">
              <p>Ability: ${data.abilities[rndNum].ability.name}</p>
              <p>Height: ${data.height}.00 - Weight: ${data.weight}.00</p>
            </div>
          `;
          informationsPanel.innerHTML = infotmationsComponent;

          // Set Pokemon types information
          typesPanel.innerHTML = ""; // Cleans the panel first
          data.types.forEach((element) => {
            typesPanel.innerHTML += `<img src="./assets/Types/${element.type.name}.png" class="type" width="50px" />`;
          });

          shiny = data.sprites.shiny_default;
        });
      } else {
        alert("Pokemon not found!");
      }
    })
    .catch((error) => {
      // Display erro in the console
      console.log(error);
    });
}

// Makes the Enter key usable for making the search
const inputField = document.getElementById("input-search");
inputField.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    btnShiny.innerText = "Shiny Version";
    showPokemon();
  }
});

// Function to returno a random number (min included and max excluded)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function showShiny() {
  // Takes the value of the input search field (pokemon name)
  const inputValue = document
    .getElementById("input-search")
    .value.toLowerCase();

  // Calls the API
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          // Change between the shiny and normal version of the pokemon
          if (imgSprite.src == data.sprites.front_default) {
            imgSprite.src = data.sprites.front_shiny;
            btnShiny.innerText = "Normal Version";
          } else {
            imgSprite.src = data.sprites.front_default;
            btnShiny.innerText = "Shiny Version";
          }
        });
      } else {
        return;
      }
    })
    .catch((error) => {
      // Display erro in the console
      console.log(error);
    });
}

function playCry() {
  // Takes the value of the input search field (pokemon name)
  const inputValue = document
    .getElementById("input-search")
    .value.toLowerCase();

  // Calls the API
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          let audio = new Audio(data.cries.legacy);
          audio.play();
        });
      } else {
        return;
      }
    })
    .catch((error) => {
      // Display erro in the console
      console.log(error);
    });
}
