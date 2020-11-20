
document.addEventListener('DOMContentLoaded', () => {

  // const validateAge =()=>{
	// const age = document.getElementById("age")
	// if(age.value < 18) {
	// 	return true
	// }else{
	// 	return false
	// 	}
	// }
	
	document.getElementById('getCocktail').addEventListener('click', ()=>{
		
		const name = document.getElementById("getCocktailInput").value;
		if(name === ''){
			document.getElementById('noDataChecker').innerText = 'Enter some name'
		} else {
			axios.get('https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=' + name)	
			.then((result)=>{
				document.getElementById('all-cocktails').innerText = ''
				result.data.drinks.forEach((cocktail)=>{
					const li = document.createElement('li')
					li.innerText = cocktail.strDrink
					document.getElementById('all-cocktails').append(li)
				})
			})
			.catch((error)=> console.log(error))
	}

		})
		
		$('.carousel').carousel({
			interval: 2000
		})






		
}, false);






