// SCRIPT FOR PARENTAL VIEW:

document.addEventListener('DOMContentLoaded', () => {
	
	//Parental access configuration:
	
	const confirmBtn= document.getElementById('btn-parental')
	
	const disabledConfirmBtn=()=>confirmBtn.disabled = true;
	const enabledConfirmBtn=()=>confirmBtn.disabled = false;
	
	
	document.getElementById('btn-parental').addEventListener('click', ()=>{
		
		const age = document.getElementById("age").value;
		if(age < 18 || age === ''){
			disabledConfirmBtn()
			document.getElementById('parental-advise').innerText = 'Sorry, You Are Not Allowed to Access This Page'
			
		} else {
			enabledConfirmBtn()
		}
})
}, false);
	
		
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
				li.innerHTML = 	`<img src='${cocktail.strDrinkThumb}'><br><p><a href="https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktail.idDrink}">${cocktail.strDrink}</a></p>`
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
			li.innerHTML = 	`<img src='${cocktail.strDrinkThumb}'><br><p><a href="https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${cocktail.idDrink}">${cocktail.strDrink}</a></p>`
			document.getElementById('resultByAlcohol').append(li)
		})
	})
	.catch((error)=> console.log(error))
}, false);


	