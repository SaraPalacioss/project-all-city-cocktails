document.addEventListener(
  "DOMContentLoaded",
  () => {
    //Search cocktail by name:

    document
      .getElementById("getCocktailByName")
      .addEventListener("click", () => {
        const name = document.getElementById("getCocktailByNameInput").value;
        if (name === "") {
          document.getElementById("noNameChecker").innerText =
            "Enter some name";
        } else {
          axios
            .get(
              "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=" +
                name
            )
            .then((result) => {
              document.getElementById("resultByName").innerText = "";
              result.data.drinks.forEach((cocktail) => {
                const p = document.createElement("p");
                p.innerHTML = `<div class="card bg-dark border-light search">
        <img class="card-img-top" src="${cocktail.strDrinkThumb}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title"><a href="/cocktails/details/${cocktail.idDrink}">${cocktail.strDrink}</a></h5>
        </div></div><br>`;

                document.getElementById("resultByName").append(p);
              });
            })
            .catch((error) => console.log(error));
        }
      });
  },
  false
);

//List of all cocktails:

document.addEventListener(
  "DOMContentLoaded",
  () => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=")
      .then((result) => {
        document.getElementById("allcocktails").innerText = "";
        result.data.drinks.forEach((cocktail) => {
          const p = document.createElement("p");
          p.innerHTML = `<div class="card bg-dark border-light card-render">
        <img  class="card-img-top" src="${cocktail.strDrinkThumb}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title h5-render"><a  href="/cocktails/allcocktails/details/${cocktail.idDrink}">${cocktail.strDrink}</a></h5>
        </div>
      </div>`;
          document.getElementById("allcocktails").append(p);
         
        });
        document.getElementById("captions-cocktails-loading").remove();
        document.getElementById("captions-cocktails").style.visibility =
          "visible";
      })
      .catch((error) => console.log(error));
  },
  false
);

//List of non alcohol cocktails:

document.addEventListener(
  "DOMContentLoaded",
  () => {
    axios
      .get(
        "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Non_Alcoholic"
      )
      .then((result) => {
        document.getElementById("resultByNoAlcohol").innerText = "";
        result.data.drinks.forEach((cocktail) => {
          const p = document.createElement("p");
          p.innerHTML = `<div class="card bg-dark border-light card-render">
        <img  class="card-img-top" src="${cocktail.strDrinkThumb}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title h5-render"><a  href="/cocktails/no-alcohol/details/${cocktail.idDrink}">${cocktail.strDrink}</a></h5>
        </div>
      </div>`;
          document.getElementById("resultByNoAlcohol").append(p);
        
        });
        document.getElementById("captions-cocktails-loading").remove();
        document.getElementById("captions-cocktails").style.visibility =
          "visible";
      })
      .catch((error) => console.log(error));
  },
  false
);

//List of alcohol cocktails:

document.addEventListener(
  "DOMContentLoaded",
  () => {
    axios
      .get(
        "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic"
      )
      .then((result) => {
        document.getElementById("resultByAlcohol").innerText = "";
        result.data.drinks.forEach((cocktail) => {
          const p = document.createElement("p");
          p.innerHTML = `<div class="card bg-dark border-light card-render">
        <img  class="card-img-top" src="${cocktail.strDrinkThumb}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title h5-render"><a  href="/cocktails/alcohol/details/${cocktail.idDrink}">${cocktail.strDrink}</a></h5>
        </div>
      </div>`;
          document.getElementById("resultByAlcohol").append(p);
   
        });
        document.getElementById("captions-cocktails-loading").remove();
        document.getElementById("captions-cocktails").style.visibility =
          "visible";
      })
      .catch((error) => console.log(error));
  },
  false
);


// Cocktail details:

document.addEventListener(
  "DOMContentLoaded",
  () => {
    let currentURL = window.location.href;
    let id = currentURL.substring(currentURL.lastIndexOf("/") + 1);

    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${id}`
      )
      .then((result) => {
        console.log(result)

        let cocktailName = result.data.drinks[0].strDrink;
        let cocktailId = result.data.drinks[0].idDrink;
        let cocktailCategory = result.data.drinks[0].strCategory;
        let cocktailAlcohol = result.data.drinks[0].strAlcoholic;
        let cocktailInstructions = result.data.drinks[0].strInstructions;
        let cocktailImg = result.data.drinks[0].strDrinkThumb;

        console.log(id)
        
        document.getElementById("cocktail-name").innerText = cocktailName;
        document.getElementById("cocktail-id").innerText = cocktailId;
        document.getElementById(
          "cocktail-category"
        ).innerText = cocktailCategory;
        document.getElementById("cocktail-alcohol").innerText = cocktailAlcohol;
        document.getElementById(
          "cocktail-instructions"
        ).innerText = cocktailInstructions;
        document.getElementById(
          "cocktail-img"
        ).innerHTML = `<img src="${cocktailImg}" alt="cocktail-img">`;
        document.getElementById("resultIngredients").innerText = "";

        const ingredientsArr = [];
        ingredientsArr.push(result.data.drinks[0].strIngredient1);
        ingredientsArr.push(result.data.drinks[0].strIngredient2);
        ingredientsArr.push(result.data.drinks[0].strIngredient3);
        ingredientsArr.push(result.data.drinks[0].strIngredient4);
        ingredientsArr.push(result.data.drinks[0].strIngredient5);
        ingredientsArr.push(result.data.drinks[0].strIngredient6);
        ingredientsArr.push(result.data.drinks[0].strIngredient7);
        ingredientsArr.push(result.data.drinks[0].strIngredient8);
        ingredientsArr.push(result.data.drinks[0].strIngredient9);
        ingredientsArr.push(result.data.drinks[0].strIngredient10);
        ingredientsArr.push(result.data.drinks[0].strIngredient11);
        ingredientsArr.push(result.data.drinks[0].strIngredient12);
        ingredientsArr.push(result.data.drinks[0].strIngredient13);
        ingredientsArr.push(result.data.drinks[0].strIngredient14);
        ingredientsArr.push(result.data.drinks[0].strIngredient15);

        const meassureArr = [];
        meassureArr.push(result.data.drinks[0].strMeasure1);
        meassureArr.push(result.data.drinks[0].strMeasure2);
        meassureArr.push(result.data.drinks[0].strMeasure3);
        meassureArr.push(result.data.drinks[0].strMeasure4);
        meassureArr.push(result.data.drinks[0].strMeasure5);
        meassureArr.push(result.data.drinks[0].strMeasure6);
        meassureArr.push(result.data.drinks[0].strMeasure7);
        meassureArr.push(result.data.drinks[0].strMeasure8);
        meassureArr.push(result.data.drinks[0].strMeasure9);
        meassureArr.push(result.data.drinks[0].strMeasure10);
        meassureArr.push(result.data.drinks[0].strMeasure11);
        meassureArr.push(result.data.drinks[0].strMeasure12);
        meassureArr.push(result.data.drinks[0].strMeasure13);
        meassureArr.push(result.data.drinks[0].strMeasure14);
        meassureArr.push(result.data.drinks[0].strMeasure15);

        let i = 0;
        let li = "";
        let space = " ";

        while ((ingredientsArr[i] !== null || meassureArr[i] !== null) && i< 15)  {
          
            li = document.createElement("li");
            if(meassureArr !== null) {
              li.innerHTML = meassureArr[i]
            }
            if(ingredientsArr[i] !== null) {
              li.innerHTML = li.innerHTML + space + ingredientsArr[i]
            }
            document.getElementById("resultIngredients").append(li);
            i++;
        }
      })
      .catch((error) => console.log(error));
  },
  false
);

// Home random selection

document.addEventListener(
  "DOMContentLoaded",
  () => {
    axios
      .get(
        "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php"
      )
      .then((result) => {
        document.getElementById("caption-img-1").src =
          result.data.drinks[0].strDrinkThumb;
        document.getElementById(
          "caption-h5-1"
        ).href = `/cocktails/details/${result.data.drinks[0].idDrink}`;
        document.getElementById("caption-h5-1").innerHTML =
          result.data.drinks[0].strDrink;
        document.getElementById("caption-img-2").src =
          result.data.drinks[1].strDrinkThumb;
        document.getElementById(
          "caption-h5-2"
        ).href = `/cocktails/details/${result.data.drinks[1].idDrink}`;
        document.getElementById("caption-h5-2").innerHTML =
          result.data.drinks[1].strDrink;
        document.getElementById("caption-img-3").src =
          result.data.drinks[2].strDrinkThumb;
        document.getElementById(
          "caption-h5-3"
        ).href = `/cocktails/details/${result.data.drinks[2].idDrink}`;
        document.getElementById("caption-h5-3").innerHTML =
          result.data.drinks[2].strDrink;

        document.getElementById("caption-img-4").src =
          result.data.drinks[3].strDrinkThumb;
        document.getElementById(
          "caption-h5-4"
        ).href = `/cocktails/details/${result.data.drinks[3].idDrink}`;
        document.getElementById("caption-h5-4").innerHTML =
          result.data.drinks[3].strDrink;
        document.getElementById("captions-loading").remove();
        document.getElementById("captions").style.visibility = "visible";
      })
      .catch((error) => console.log(error));
  },
  false
);
