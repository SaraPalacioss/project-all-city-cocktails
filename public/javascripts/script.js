		
// SCRIPT FOR HOME VIEW:

document.addEventListener('DOMContentLoaded', () => {

	//Search cocktail by name:

	document.getElementById('getCocktailByName').addEventListener('click', ()=>{
		
		const name = document.getElementById("getCocktailByNameInput").value;
		if(name === ''){
			document.getElementById('noNameChecker').innerText = 'Enter some name'
		} else {
			axios.get('https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=' + name)	
			.then((result)=>{
				document.getElementById('resultByNameUl').innerText = ''
				result.data.drinks.forEach((cocktail)=>{
					const li = document.createElement('li')
					li.innerHTML = 	cocktail.strDrink
					document.getElementById('resultByNameUl').append(li)
				})
			})
			.catch((error)=> console.log(error))
	}
		})
}, false);



document.addEventListener('DOMContentLoaded', () => {
//Search cocktail by ingredient:

	document.getElementById('getCocktailByIngredient').addEventListener('click', ()=>{
				
		const name = document.getElementById("getCocktailByIngredientInput").value;
		if(name === ''){
			document.getElementById('noIngredientChecker').innerText = 'Enter some name'
		} else {
			axios.get('https://www.thecocktaildb.com/api/json/v2/9973533/search.php?i=' + name)	
			.then((result)=>{
				document.getElementById('resultByIngredient').innerText = ''
				result.data.drinks.forEach((cocktail)=>{
					const li = document.createElement('li')
					li.innerHTML = 	cocktail.strDrink
					document.getElementById('resultByIngredient').append(li)
				})
			})
			.catch((error)=> console.log(error))
	}

		})

}, false);

	

	//List of non alcohol cocktails:	

	document.addEventListener('DOMContentLoaded', () => {
				
		axios.get('https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Non_Alcoholic')	
		.then((result)=>{
			document.getElementById('resultByNoAlcohol').innerText = ''
			result.data.drinks.forEach((cocktail)=>{
				const li = document.createElement('li')
				li.innerHTML = 	`<img src='${cocktail.strDrinkThumb}'><br><p><a href="/cocktails/alcohol/details">${cocktail.strDrink}</a></p>`
				document.getElementById('resultByNoAlcohol').append(li)
			})
		})
		.catch((error)=> console.log(error))
}, false);


	//List of alcohol cocktails:	



document.addEventListener('DOMContentLoaded', () => {
				
	axios.get('https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic')	
	.then((result)=>{
		document.getElementById('resultByAlcohol').innerText = ''
		result.data.drinks.forEach((cocktail)=>{
			const li = document.createElement('li')			
			li.innerHTML = 	`<img src='${cocktail.strDrinkThumb}'><br><p><a id="getID" href="/cocktails/alcohol/details/${cocktail.idDrink}">${cocktail.strDrink}</a></p>`
			document.getElementById('resultByAlcohol').append(li)
 



			
		})
	})
	.catch((error)=> console.log(error))
}, false);



document.addEventListener('DOMContentLoaded', () => {


	let currentURL = window.location.href
	let id = currentURL.substring(currentURL.lastIndexOf('/') + 1);


	axios.get(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${id}`)	
	.then((result)=>{
	

	
	let cocktailName = result.data.drinks[0].strDrink
	let cocktailId = result.data.drinks[0].idDrink
	let cocktailCategory = result.data.drinks[0].strCategory
	let cocktailAlcohol = result.data.drinks[0].strAlcoholic
	let cocktailInstructions = result.data.drinks[0].strInstructions
	let cocktailImg = result.data.drinks[0].strDrinkThumb
	let cocktailIngredients = result.data.drinks[0].strDrinkThumb
	let cocktailMeasure = result.data.drinks[0].strDrinkThumb




	document.getElementById('cocktail-name').innerText = cocktailName
	document.getElementById('cocktail-id').innerText = cocktailId
	document.getElementById('cocktail-category').innerText = cocktailCategory
	document.getElementById('cocktail-alcohol').innerText = cocktailAlcohol
	document.getElementById('cocktail-instructions').innerText = cocktailInstructions
	document.getElementById('cocktail-img').innerText = cocktailImg
	document.getElementById('cocktail-ingredients').innerText = cocktailIngredients

		

	

 
	})
	.catch((error)=> console.log(error))
}, false);



