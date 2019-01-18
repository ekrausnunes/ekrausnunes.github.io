document.getElementById('searchID').addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        searchMovie(null);
    }
});

document.getElementById('results').addEventListener('click', function(e) {
    if (e.target.id !== '') {
        searchMovie(e.target.id);
    }
});  

function searchMovie(movieID) {
    var inputMovieName = document.querySelector('#searchID');
    var page = 1;
    var moviesTot = 0;
    var movie = '';

    if (movieID === null) {
        var url = 'https://www.omdbapi.com/?apikey=13cbc5c&page=' + page + '&s='; 
        var movie = inputMovieName.value.split(' ').join('+');
    } else {
        var url = 'https://www.omdbapi.com/?apikey=13cbc5c&i='; 
        movie = movieID.split('"').join('');
   }

    var ajax = new XMLHttpRequest();
    
    ajax.open( 'GET', url + movie, true );

    ajax.onreadystatechange = function() {
        if ( ajax.readyState === 4 && ajax.status === 200 ) {
            moviesTot = JSON.parse(ajax.responseText).totalResults;

            if (movieID === null) {
                moviesFound(JSON.parse(ajax.responseText));
            } else {
                movieSelected(JSON.parse(ajax.responseText));
            }
            
        }
    }
    ajax.send();
}

function moviesFound(json) {
    var results = document.getElementById("results"); 
    var movieID;
    results.innerHTML = '';

    for (var i in json.Search) {
     
        movieID = json.Search[i].imdbID;
        var tr = document.createElement('tr');

        var td = document.createElement('td');
        td.innerHTML = '<a id=' + movieID + ' href="#modalMovie">' + json.Search[i].Title + '</a>';        
        tr.appendChild(td); 

        td = document.createElement('td');
        td.innerHTML = json.Search[i].Year;
        tr.appendChild(td); 

        td = document.createElement('td');
        td.innerHTML = json.Search[i].Type;
        tr.appendChild(td); 

        td = document.createElement('td');
        td.innerHTML = json.Search[i].imdbID;
        td.style.display = 'none';
        td.cl
        tr.appendChild(td); 

       results.appendChild(tr); 
    }
}

function movieSelected(json) {
    var poster = document.querySelector('#poster');
    var title = document.querySelector('#title');
    var plot = document.querySelector('#plot');
    var year = document.querySelector('#year');
    var genre = document.querySelector('#genre');
    var director = document.querySelector("#director");
    var awards = document.querySelector('#awards');

    poster.src = json.Poster;
    title.innerHTML = '<p> <b>' + json.Title + ' </b></p>';
    plot.innerHTML = ' <p>' + json.Plot + '</p>';
    year.innerHTML = '  <b>Ano: </b>' + json.Year + '';
    genre.innerHTML = ' <b>Genero: </b>' + json.Genre + '';
    director.innerHTML = ' <b>Diretor: </b>' + json.Director + '';
    awards.innerHTML = ' <b>Prêmios: </b>' + json.Awards + '';

    modalMovie();
}

function modalMovie() {
    var modal = document.querySelector('#modalMovie');
    if (modal) {
        modal.classList.add('show');
        modal.addEventListener('click', function(e) {
            e.preventDefault();
            if ( e.target.id === 'modalMovie' || e.target.className === 'closeModal') {
                modal.classList.remove('show');
            }
        });
    }   
}