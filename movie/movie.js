const myToken = config.TOKEN
const movieId = new URLSearchParams(window.location.search).get('movieId')
const movieGenre = new URLSearchParams(window.location.search).get('movieGenre')
const url = `https://striveschool-api.herokuapp.com/api/movies/`

const loadMovieData = async () => {
    const response = await fetch(url + movieGenre, {
        headers: {
            "Authorization": myToken
        }
    })
    const body = await response.json()
    displaySelectedMovie(body)
}

loadMovieData()

const displaySelectedMovie = movies => {
    const chosenMovie = movies.filter(({_id: id}) => id === movieId)
    console.log(chosenMovie)
    const movieImageContainer = document.querySelector('.movie-image-container')
    const infoContainer = document.querySelector('.container')
    movieImageContainer.innerHTML = `<img src=${chosenMovie[0].imageUrl} class="hero-cover">`
    infoContainer.innerHTML = chosenMovie.map(({name, category, description, _id: id}) => `
    <div class="row my-3">
        <h2>${name} - ${category.toUpperCase()}</h2>
        <p>${description}</p>
        <div class="d-flex justify-content-between">
            <a href="../back-office/office.html?movieId=${id}" class="btn btn-outline-success">Edit</a>
            <button class="btn btn-outline-danger ml-3">Delete</button>
        </div>
    </div>
    `
)}
