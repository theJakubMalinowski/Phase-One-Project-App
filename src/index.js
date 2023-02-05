const options = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': API_URL,
	  'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
  };
  
const searchButton = document.getElementById('search-button');
const input = document.getElementById('search-input'); 
const toggleBtn = document.getElementById('toggle-btn');
const savedMoviesContainer = document.querySelector('.saved-movies');
const moviesList = document.querySelector('.movies');
 
  // Function to generate movie element
function generateMovieElement(poster, name) {
	const movie = document.createElement('li');
	
	const moviePoster = document.createElement('img');
	moviePoster.src = poster;
	movie.appendChild(moviePoster);
	
	const movieName = document.createElement('h2');
	movieName.textContent = name;
	movie.appendChild(movieName);
	
	const likeButton = document.createElement('button');
	likeButton.classList.add('like-button');
	likeButton.textContent = 'Like';
	likeButton.addEventListener('click', (event) => {
		event.target.innerHTML = 'Liked';
		event.target.disabled = true;
		savedMoviesContainer.appendChild(movie.cloneNode(true));
	});
	movie.appendChild(likeButton);
  
	return movie;
}
//Search Button eventListener & Fetch request
searchButton.addEventListener('click', (event) => {
	event.preventDefault();
	const searchTerm = input.value; 
  
	fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchTerm}`, options)
	  .then(response => response.json())
	  .then(data => {
		const listOfMovies = data.d;
		moviesList.innerHTML = '';
		console.log(listOfMovies)
	
		listOfMovies.forEach(movie => {
			if (movie.i) {
				const movieElement = generateMovieElement(movie.i.imageUrl, movie.l);
				moviesList.appendChild(movieElement);
		  	}
		});
	});
});

// Toggle Button eventListener
toggleBtn.addEventListener('click', () => {
	const savedMoviesElement = document.querySelector('.saved-movies');
	savedMoviesElement.classList.toggle('hidden');
  
	if (savedMoviesElement.style.display === 'block') {
	  savedMoviesElement.style.display = 'none';
	} else {
	  savedMoviesElement.style.display = 'block';
	}
});

// Escape button to reset
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
	  const moviesList = document.querySelector('.movies');
	  moviesList.innerHTML = '';
	}
});