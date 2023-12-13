//Johanna Ostling

//Get information from form
const form = document.querySelector("form");
const showingResultsDiv = document.querySelector("#showingResults");

form.addEventListener("submit", handleForm);

function handleForm(event) {
  event.preventDefault();

  const typeFormInput = document.querySelector("input").value;
  const radioNameFromInput = document.querySelector("#radioName").checked;
  const radioLanguageFromInput =
    document.querySelector("#radioLanguage").checked;

  console.log(typeFormInput, radioNameFromInput, radioLanguageFromInput);

  if (radioNameFromInput == true) {
    fetchCountry(typeFormInput).then(displayCountry).catch(displayError)
  } 
  else if(radioLanguageFromInput == true) {
    fetchCountryByLanguage(typeFormInput).then(displayCountry).catch(displayError)
  } 

form.reset();
}

//Get country by name function
async function fetchCountry(countryInput) {
  let nameOfCountry = countryInput;

  let urlcountry = `https://restcountries.com/v3.1/name/${nameOfCountry}`;
//   console.log(urlcountry)

  if(Response.ok){
    let response = await fetch(urlcountry);
  let commits = await response.json();

  return commits;}
  
  else if(Response.status === 404){
    throw 404
  }
}

//Get country by language function
async function fetchCountryByLanguage(LanguageInput) {
  let language = LanguageInput;

  const urlLanguage = `https://restcountries.com/v3.1/lang/${language}`;
  console.log(urlLanguage)

  if(Response.ok){
    let response = await fetch(urlcountry);
  let commits = await response.json();

  return commits;}
  
  else if(Response.status === 404){
    throw 404
  }
}


function displayCountry(countryObj) {
    console.log(countryObj)
    showingResultsDiv.innerHTML= ""
    const sort= countryObj.sort((a,b) => b.population-a.population)
  for (i = 0; i < countryObj.length; i++) {

    const name = countryObj[i].name.official;
    const flagUrl = countryObj[i].flags.png;
    const population = countryObj[i].population;
    const subregion = countryObj[i].subregion;
    const capital = countryObj[i].capital;

    const nameEl = document.createElement("h1");
    const populationEl = document.createElement("p");
    const flagImg = document.createElement("img");
    const subregionEl = document.createElement("p");
    const capitalEl = document.createElement("h2");

    nameEl.innerText = name;
    populationEl.innerText = population;
    flagImg.src = flagUrl;
    subregionEl.innerText = subregion;
    capitalEl.innerText = capital;
    
    showingResultsDiv.append(flagImg, nameEl, subregion, capitalEl, population)
  }

}

//Show error function
function displayError(error){

const wrongSpell = document.querySelector("h1");
console.log(wrongSpell)
showingResultsDiv.append(wrongSpell)

    if(error === 404){
        wrongSpell.innerText = "Try again later";}
    else {
        wrongSpell.innerText = "Wrong spelling or none existing, press F5"
    }

}
