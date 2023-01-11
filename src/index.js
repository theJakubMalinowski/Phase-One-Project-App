const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': API_URL,
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};


  const searchButton = document.getElementById("search-button");
  const input = document.getElementById("search-input"); // added this line
  searchButton.addEventListener("click", (event) => {
	  event.preventDefault();
	  const searchTerm = input.value; // changed this line
	
	  // Make the HTTP request to the movie database API
	  fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchTerm}`, options)
	  .then(response => response.json())
	  .then(response => console.log(response))
	  .catch(err => console.error(err));

		console.log(data)
		.catch(error => console.error(error));
	});
  