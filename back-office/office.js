const myToken = config.TOKEN
const url = `https://striveschool-api.herokuapp.com/api/movies`

const form = document.querySelector('form')
form.addEventListener('submit', e => {
    e.preventDefault()
    addMovie()
})

const addMovie = async () => {

    const movie = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        imageUrl: document.getElementById('image').value
    }

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
            "Content-Type": "application/JSON",
            "Authorization": myToken
        }
    })
}