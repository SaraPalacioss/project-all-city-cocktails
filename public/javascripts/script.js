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
					li.innerHTML = 	cocktail.strDrink
					li.href = "www.google.com"
					document.getElementById('all-cocktails').append(li)
				})
			})
			.catch((error)=> console.log(error))
	}

		})

}, false);