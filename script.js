const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8f120766a97e94314cd2b8fd3e7580e8&page=1'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280/'

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=8f120766a97e94314cd2b8fd3e7580e8&query='

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(APIURL)

async function getMovies(uri){
   const resp = await fetch(uri)
   const respData = await resp.json()
   showMovies(respData.results)
}

function showMovies(movies){
    main.innerHTML = ""
    movies.forEach(node => {
        const {vote_average, title, overview, poster_path} = node

        if (!node) {
            return
        }
        const movieEl = document.createElement('div')
            movieEl.classList.add('div')
        movieEl.innerHTML = `
        <div class="movie">
        <img src="${IMGPATH + poster_path}" alt="">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getRatingColor(vote_average)}">${vote_average}</span> 
        </div>
        <div class="overview"><h3>Overview</h3>${overview}</div>
    </div>
        `
        main.appendChild(movieEl)
    });
    
}

function getRatingColor(vote){
   if (vote < 5) {
     return "red"
   } else if(vote > 5){
      return "yellow"
   } else if(vote > 8){
      return "green"
   }
}

form.addEventListener('input', (e)=>{
     e.preventDefault;
     const {value} = search;
     getMovies(SEARCHAPI + value)

     if(!value){
        getMovies(APIURL)
     }

})


