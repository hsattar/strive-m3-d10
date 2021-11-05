const myToken = config.TOKEN
const url = `https://striveschool-api.herokuapp.com/api/movies/`

const getMovies = async genre => {
    try {
        const response = await fetch(url + genre, {
            headers: {
                "Authorization": myToken
            }
        })
        if (!response.ok) throw new Error('Failed To Fetch Movies')
        const movies = await response.json()
        displayMovies(movies)
    } catch (error) {
        console.error(error)
    }
}

const displayMovies = movies => {
    console.log(movies)
    const moviesContainer = document.querySelector('.action-movies')
    moviesContainer.innerHTML = movies.map(({imageUrl: image}) => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <img class="images" src=${image} class="w-100 img-fluid rounded" alt="">
    </div>
    `).join('')
}

getMovies('action')