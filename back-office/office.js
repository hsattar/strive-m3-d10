const myToken = config.TOKEN
const movieGenre = new URLSearchParams(window.location.search).get('movieGenre')
const movieId = new URLSearchParams(window.location.search).get('movieId')

const form = document.querySelector('form')
form.addEventListener('submit', e => {
    e.preventDefault()
    addMovie()
})

if (movieId) {
    try {
        const fetchMovieInfo = async () => {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/movies/${movieGenre}`, {
                headers: {
                    "Authorization": myToken
                }
            })
            if (!response.ok) throw new Error('Failed To Fetch')
            const body = await response.json()
            const movieToEdit = body.filter(({_id: id}) => id === movieId)
            movieToEdit.forEach(({name, description, category, imageUrl: image}) => {
                document.getElementById('name').value = name,
                document.getElementById('description').value = description,
                document.getElementById('category').value = category,
                document.getElementById('image').value = image
            })
        }
        fetchMovieInfo()
        document.querySelector('.btn-outline-success').innerText = 'Save'
    } catch (error) {
        console.error(error)
    }
}

const addMovie = async () => {
    const url = movieId ? `https://striveschool-api.herokuapp.com/api/movies/${movieId}` : `https://striveschool-api.herokuapp.com/api/movies`
    const movie = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        imageUrl: document.getElementById('image').value
    }

    try {
        const response = await fetch(url, {
            method: movieId ? "PUT" : "POST",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/JSON",
                "Authorization": myToken
            }
        })

        if (response.ok) {
            const newMovie = await response.json()
            const alert = document.querySelector('.alertMsg')
            alert.className = 'alert alert-success'
            alert.innerText = movieId ? `Successfully Edited The Movie Called ${newMovie.name}` 
            : `Successfully Created New Movie Called ${newMovie.name}`
            setTimeout(() => {
                if (!movieId) form.reset()
                alert.classList.add('d-none')
            }, 3000)
        }
        else throw new Error('Failed To Add Movie')

    } catch (error) {
        console.error(error)
    }
}