const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8f120766a97e94314cd2b8fd3e7580e8&page=1'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280/'

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=8f120766a97e94314cd2b8fd3e7580e8&query='

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(APIURL)
async function getMovies(url) {
    const resp = await fetch(url)
    const respData = await resp.json()

    showMovies(respData.results)
}

function showMovies(movies){

    main.innerHTML = ''

     movies.forEach(movie =>{
        const { poster_path, title, vote_average, overview} = movie;

        if (!poster_path) {
            return;
        }

        const movieEl = document.createElement('div')
        movieEl.classList.add('div')
        movieEl.innerHTML = `
        <div class="movie">
        <img src="${IMGPATH + poster_path}" alt="">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassbyRate(vote_average)}">${vote_average}</span> 
        </div>
        <div class="overview"><h3>Overview</h3>${overview}</div>
    </div>
    `

        main.appendChild(movieEl)
     })
}

function getClassbyRate(vote){
    if(vote >= 8){
        return 'green'
    }
    if(vote >= 5){
        return 'yellow'
    } else{
        return 'red'
    }
}

form.addEventListener('submit',(e) =>{
    e.preventDefault()
    
    const searchTerm = search.value

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm)
    }
})