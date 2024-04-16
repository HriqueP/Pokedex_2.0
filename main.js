const btnSearch = document.getElementById("btn-search");
const imgSprite = document.querySelector(".screen-sprite");
const informationsPanel = document.querySelector(".pokemon-informations");

btnSearch.addEventListener("click", showPokemon);

function showPokemon() {
  // Takes the value of the input search field (pokemon name)
  const inputValue = document
    .getElementById("input-search")
    .value.toLowerCase();

  // Calls the API
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          console.log(`No: ${data.id}`);
          console.log(`NAME: ${data.name}`);
          console.log(`HP: ${data.stats[0].base_stat}`);
          console.log(`ATTACK: ${data.stats[1].base_stat}`);
          console.log(`DEFENSE: ${data.stats[2].base_stat}`);
          console.log(`SP. ATK: ${data.stats[3].base_stat}`);
          console.log(`SP. DEF: ${data.stats[4].base_stat}`);
          console.log(`SPEED: ${data.stats[5].base_stat}`);

          // Set src for image tag
          imgSprite.src = data.sprites.front_default;

          // Set Pokemon general informations
          // const divInfo = document.createElement("div");
          // divInfo.innerHTML = "<p>Passed</p>";
          informationsPanel.innerHTML = `
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
            <p>ATTACK: ${data.stats[1].base_stat}</p>
            <p>DEFENSE: ${data.stats[2].base_stat}</p>
            <p>SP. ATK: ${data.stats[3].base_stat}</p>
            <p>SP. DEF: ${data.stats[4].base_stat}</p>
            <p>SPEED: ${data.stats[5].base_stat}</p>
          </div>
          `;
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
    showPokemon();
  }
});
