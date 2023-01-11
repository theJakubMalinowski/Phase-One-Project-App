const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': API_URL,
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};
const form = document.querySelector('form');
const resultsDiv = document.querySelector('#results');
const searchButton = document.getElementById("search-button");
const input = document.getElementById("search-input"); 

  searchButton.addEventListener("click", (event) => {
	  event.preventDefault();
	  const searchTerm = input.value; 
	
	  // Make the HTTP request to the movie database API
	  fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchTerm}`, options)
	  .then(response => response.json())
	  .then(response => console.log(response))
	  .catch(err => console.error(err));


  });
  