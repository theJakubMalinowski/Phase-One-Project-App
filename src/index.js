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
 
function generateMovieElement(poster, name, actors) {
	const movie = document.createElement('li');
	
	const movieContainer = document.createElement('div');
	movieContainer.classList.add('movie-container');
	movie.appendChild(movieContainer);
  
	const moviePosterContainer = document.createElement('div'); 
	moviePosterContainer.classList.add('movie-poster-container');
	movieContainer.appendChild(moviePosterContainer);
  
	const moviePoster = document.createElement('img');
	moviePoster.src = poster;
	moviePosterContainer.appendChild(moviePoster);
  
	const movieName = document.createElement('h2');
	movieName.textContent = name;
	moviePosterContainer.appendChild(movieName);
  
	const movieActors = document.createElement('div'); 
	movieActors.classList.add('movie-actors');
	movieActors.textContent = `Starring: ${actors}`;
	movieContainer.appendChild(movieActors);
  
	movieActors.style.display = 'none';

	moviePosterContainer.addEventListener('mouseover', () => { 
	  movieActors.style.display = 'block';
	});
  
	moviePosterContainer.addEventListener('mouseout', () => { 
	  movieActors.style.display = 'none';
	});
	
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
  
searchButton.addEventListener('click', (event) => {
	event.preventDefault();
	const searchTerm = input.value; 
  
	fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchTerm}&s=${searchTerm}`, options)
	  .then(response => response.json())
	  .then(data => {
		const listOfMovies = data.d;
		moviesList.innerHTML = '';
		console.log(listOfMovies)
	
		listOfMovies.forEach(movie => {
			if (movie.i) {
			  const movieElement = generateMovieElement(movie.i.imageUrl, movie.l, movie.s);
			  moviesList.appendChild(movieElement);
			}
		});
		  
	});
});

toggleBtn.addEventListener('click', () => {
	const savedMoviesElement = document.querySelector('.saved-movies');
	savedMoviesElement.classList.toggle('hidden');
  
	if (savedMoviesElement.style.display === 'block') {
	  savedMoviesElement.style.display = 'none';
	} else {
	  savedMoviesElement.style.display = 'block';
	}
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
	  const moviesList = document.querySelector('.movies');
	  moviesList.innerHTML = '';
	  input.value = '';
	}
});