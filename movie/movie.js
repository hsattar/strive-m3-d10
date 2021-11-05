const myToken = config.TOKEN
const movieId = new URLSearchParams(window.location.search).get('movieId')
const movieGenre = new URLSearchParams(window.location.search).get('movieGenre')
const url = `https://striveschool-api.herokuapp.com/api/movies/`

const loadMovieData = async () => {
    try {
        const response = await fetch(url + movieGenre, {
            headers: {
                "Authorization": myToken
            }
        })
        if (!response.ok) throw new Error('Failed To Fetch')
        const body = await response.json()
        displaySelectedMovie(body)
    } catch (error) {
        console.error(error)
    }
}

loadMovieData()

const displaySelectedMovie = movies => {
    const chosenMovie = movies.filter(({_id: id}) => id === movieId)
    const movieImageContainer = document.querySelector('.movie-image-container')
    const infoContainer = document.querySelector('.container')
    movieImageContainer.innerHTML = `<img src=${chosenMovie[0].imageUrl} class="hero-cover">`
    infoContainer.innerHTML = chosenMovie.map(({name, category, description, _id: id}) => `
    <div class="row my-3">
        <h2>${name} - ${category.toUpperCase()}</h2>
        <p>${description}</p>
        <div class="d-flex justify-content-between">
            <a href="../back-office/office.html?movieGenre=${category}&movieId=${id}" class="btn btn-outline-success">Edit</a>
            <button class="btn btn-outline-danger ml-3">Delete</button>
        </div>
    </div>
    `
    )
    const deleteBtn = document.querySelector('.btn-outline-danger')
    deleteBtn.addEventListener('click', () => {
        deleteMovie()
    })
}


const deleteMovie = async () => {
    try {
        const response = await fetch(url + movieId, {
            method: "DELETE",
            headers: {
                "Authorization": myToken
            }
        })
        if (response.ok) window.location.href = '/'
    } catch (error) {
        console.error(error)
    }
}

