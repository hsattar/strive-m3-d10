const myToken = config.TOKEN
const url = `https://striveschool-api.herokuapp.com/api/movies/`
const genres = ['action', 'horror']

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



const displayMovies = (movies, i) => {
    console.log(movies, i)
    const moviesContainer = document.querySelector('.movies-container')
    moviesContainer.innerHTML += `
    <h4 class="pl-2"><strong>${genres[i].toUpperCase()}</strong></h4>
    <div class="row mx-n1 mb-4 movies${i} justify-content-center"></div>`
    const moviesGenre = document.querySelector(`.movies${i}`)
    moviesGenre.innerHTML = movies.map(({imageUrl: image}) => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <img class="images" src=${image} class="w-100 img-fluid rounded" alt="">
    </div>
    `).join('')
}

