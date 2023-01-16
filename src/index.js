const options = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': API_URL,
	  'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

const searchButton = document.getElementById("search-button");
const input = document.getElementById("search-input"); 
const toggleBtn = document.querySelector('#toggle-btn');
const savedMoviesContainer = document.querySelector('.saved-movies');

searchButton.addEventListener("click", (event) => {
	event.preventDefault();
	const searchTerm = input.value; 

	fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=${searchTerm}`, options)
	.then(response => response.json())
	.then(data => {
	  console.log(data);
	  const list = data.d;
  
	  const movies = Array.prototype.map.call(list, item => {
		if (item.i) {
		  const name = item.l;
		  const poster = item.i.imageUrl;
		  const movie = `<li>
			<img src="${poster}">
			<h2>${name}</h2>
			<button class="like-button">Like</button>
		  </li>`
		  return movie;
		}
	  });
	  const moviesList = document.querySelector('.movies');
	  moviesList.innerHTML = movies.join('');

	  const likeButtons = document.querySelectorAll('.like-button');
	  likeButtons.forEach(button => {
		button.addEventListener('click', (event) => {
		  event.target.innerHTML = 'Liked';
		  event.target.disabled = true;
  
		  const closestLi = event.target.closest('li');
		  if(closestLi) {
			const movie = closestLi.cloneNode(true); 
			savedMoviesContainer.appendChild(movie);
		  }
		});
	  });
	});
});
  // Add a click event listener to the toggle button
  toggleBtn.addEventListener('click', () => {
	// Toggle the visibility of the saved movies element
	const savedMoviesElement = document.querySelector('.saved-movies');
	savedMoviesElement.classList.toggle('hidden');

  if (savedMoviesElement.style.display === 'none') {
	savedMoviesElement.style.display = 'block';
  } else {
	savedMoviesElement.style.display = 'none';
  }
});