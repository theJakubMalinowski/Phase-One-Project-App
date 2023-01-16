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
  const toggleBtn = document.querySelector('#toggle-btn');
  
  // create a reference to saved movies container
  const savedMoviesContainer = document.querySelector('.saved-movies');
  
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
			<button class="like-button">Like</button>
		  </li>`
		  return movie;
		}
	  });
  
	  // Display the movies in the HTML
	  const moviesList = document.querySelector('.movies');
	  moviesList.innerHTML = movies.join('');
  
	  // add event listener to like button
	  const likeButtons = document.querySelectorAll('.like-button');
	  likeButtons.forEach(button => {
		button.addEventListener('click', (event) => {
		  event.target.innerHTML = 'Liked';
		  event.target.disabled = true;
  
		  // add the movie to the saved movies container
		  const closestLi = event.target.closest('li');
		  if(closestLi) {
			const movie = closestLi.cloneNode(true); // clone the movie so it stays in the results
			savedMoviesContainer.appendChild(movie);
		  } else {

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


  
