const myToken = config.TOKEN
const url = `https://striveschool-api.herokuapp.com/api/movies/`
let genres = []

const getMovieGenres = async () => {
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": myToken
            }
        })
        if (!response.ok) throw new Error('Failed To Load Movie Genres')
        const body = await response.json()
        genres = body
        startFetchingData()
    } catch (error) {
        console.error(error)
    }
}

getMovieGenres()

const startFetchingData = () => {
    const spinner = document.querySelector('.spinner')
    spinner.className = 'd-none'
    for (let i = 0; i < genres.length; i++) {
        const getMovies = async () => {
            try {
                const response = await fetch(url + genres[i], {
                    headers: {
                        "Authorization": myToken
                    }
                })
                if (!response.ok) throw new Error('Failed To Fetch Movies')
                const movies = await response.json()
                displayMovies(movies, i)
            } catch (error) {
                console.error(error)
            }
        }
        getMovies()
    }
}



const displayMovies = (movies, i) => {
   
    const moviesContainer = document.querySelector('.movies-container')
    moviesContainer.innerHTML += `
    <h4 class="pl-2"><strong>${genres[i].charAt(0).toUpperCase() + genres[i].substr(1)}</strong></h4>
    <div class="row mx-n1 mb-4 movies${i} justify-content-center"></div>`
    const moviesGenre = document.querySelector(`.movies${i}`)
    moviesGenre.innerHTML = movies.map(({imageUrl: image, _id: id, category}) => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <a href="./movie/movie.html?movieGenre=${category}&movieId=${id}">
            <img class="images" src=${image} class="w-100 img-fluid rounded" alt="">
        </a>
    </div>
    `).join('')
}

