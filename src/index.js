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
	.then(response => {
	  return response.json();
	})
	.then(data => {
	  console.log(data);
	  const list = data.d;
  
	  const movies = Array.prototype.map.call(list, item => {
		// Check if item.i exists before trying to access its imageUrl property
		if (item.i) {
		  const name = item.l;
		  const poster = item.i.imageUrl;
		  const movie = `<li>
			<img src="${poster}">
			<h2>${name}</h2>
		  </li>`
		  return movie;
		}
	  });
  
	  // Display the movies in the HTML
	  const moviesList = document.querySelector('.movies');
	  moviesList.innerHTML = movies.join('');
	});
  });
  