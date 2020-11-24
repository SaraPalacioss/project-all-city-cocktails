		
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
				li.innerHTML = 	`<img src='${cocktail.strDrinkThumb}'><br><p><a href="/cocktails/no-alcohol/details/${cocktail.idDrink}">${cocktail.strDrink}</a></p>`
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
			li.innerHTML = 	`<img src='${cocktail.strDrinkThumb}'><br><p><a href="/cocktails/alcohol/details/${cocktail.idDrink}">${cocktail.strDrink}</a></p>`
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





	document.getElementById('cocktail-name').innerText = cocktailName
	document.getElementById('cocktail-id').innerText = cocktailId
	document.getElementById('cocktail-category').innerText = cocktailCategory
	document.getElementById('cocktail-alcohol').innerText = cocktailAlcohol
	document.getElementById('cocktail-instructions').innerText = cocktailInstructions
	document.getElementById('cocktail-img').innerHTML = `<img src="${cocktailImg}" alt="cocktail-img">`
	document.getElementById('resultIngredients').innerText = ''


const ingredientsArr = []
ingredientsArr.push(result.data.drinks[0].strIngredient1)
ingredientsArr.push(result.data.drinks[0].strIngredient2)
ingredientsArr.push(result.data.drinks[0].strIngredient3)
ingredientsArr.push(result.data.drinks[0].strIngredient4)
ingredientsArr.push(result.data.drinks[0].strIngredient5)
ingredientsArr.push(result.data.drinks[0].strIngredient6)
ingredientsArr.push(result.data.drinks[0].strIngredient7)
ingredientsArr.push(result.data.drinks[0].strIngredient8)
ingredientsArr.push(result.data.drinks[0].strIngredient9)
ingredientsArr.push(result.data.drinks[0].strIngredient10)
ingredientsArr.push(result.data.drinks[0].strIngredient11)
ingredientsArr.push(result.data.drinks[0].strIngredient12)
ingredientsArr.push(result.data.drinks[0].strIngredient13)
ingredientsArr.push(result.data.drinks[0].strIngredient14)
ingredientsArr.push(result.data.drinks[0].strIngredient15)

const meassureArr = []
meassureArr.push(result.data.drinks[0].strMeasure1)
meassureArr.push(result.data.drinks[0].strMeasure2)
meassureArr.push(result.data.drinks[0].strMeasure3)
meassureArr.push(result.data.drinks[0].strMeasure4)
meassureArr.push(result.data.drinks[0].strMeasure5)
meassureArr.push(result.data.drinks[0].strMeasure6)
meassureArr.push(result.data.drinks[0].strMeasure7)
meassureArr.push(result.data.drinks[0].strMeasure8)
meassureArr.push(result.data.drinks[0].strMeasure9)
meassureArr.push(result.data.drinks[0].strMeasure10)
meassureArr.push(result.data.drinks[0].strMeasure11)
meassureArr.push(result.data.drinks[0].strMeasure12)
meassureArr.push(result.data.drinks[0].strMeasure13)
meassureArr.push(result.data.drinks[0].strMeasure14)
meassureArr.push(result.data.drinks[0].strMeasure15)



let i=0
let li=''

while(ingredientsArr[i] !== null && i<15){
	li= document.createElement('li')
	li.innerHTML = ingredientsArr[i]
	document.getElementById('resultIngredients').append(li)
	i++
}

i=0

while(meassureArr[i] !== null && i<15){
	li= document.createElement('li')
	li.innerHTML = meassureArr[i]
	document.getElementById('resultMeasure').append(li)
	i++
}
		
		
		
		

 
	})
	.catch((error)=> console.log(error))
}, false);



// SCRIPT FOR HOME VIEW:


			
document.addEventListener('DOMContentLoaded', () => {
				
	axios.get('https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php')	
	.then((result)=>{
	document.getElementById("caption-img-1").src =result.data.drinks[0].strDrinkThumb 
	document.getElementById("caption-h5-1").href =`/cocktails/details/${result.data.drinks[0].idDrink}`
	document.getElementById("caption-h5-1").innerHTML =result.data.drinks[0].strDrink

	document.getElementById("caption-img-2").src =result.data.drinks[1].strDrinkThumb 
	document.getElementById("caption-h5-2").href =`/cocktails/details/${result.data.drinks[1].idDrink}`
	document.getElementById("caption-h5-2").innerHTML =result.data.drinks[1].strDrink

	document.getElementById("caption-img-3").src =result.data.drinks[2].strDrinkThumb 
	document.getElementById("caption-h5-3").href =`/cocktails/details/${result.data.drinks[2].idDrink}`
	document.getElementById("caption-h5-3").innerHTML =result.data.drinks[2].strDrink

	document.getElementById("caption-img-4").src =result.data.drinks[3].strDrinkThumb 
	document.getElementById("caption-h5-4").href =`/cocktails/details/${result.data.drinks[3].idDrink}`
	document.getElementById("caption-h5-4").innerHTML =result.data.drinks[3].strDrink


	})
	.catch((error)=> console.log(error))
}, false);
