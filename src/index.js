
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
  }
};

searchButton.addEventListener("click", (event) => {
	event.preventDefault();
	const searchInput = document.getElementById("search-input").value;
	// Make the HTTP request to the movie database API
	fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchInput}`, options)
	  .then(response => response.json())
	  .then(data => {
		const searchResults = document.getElementById("search-results");
		searchResults.innerHTML = "";
		data.d(movie => {
		  const movieTitle = document.createElement("p");
		  movieTitle.innerHTML = movie.Title;
		  searchResults.appendChild(movieTitle);
		});
	  })
	  .catch(error => console.error(error));
  });
  