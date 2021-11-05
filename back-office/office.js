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

    try {
        const response = await fetch(url, {
            method: "POST",
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
            alert.innerText = `Successfully Created New Movie Called ${newMovie.name
            }`
            setTimeout(() => {
                form.reset()
                alert.classList.add('d-none')
            }, 3000)
        }
        else throw new Error('Failed To Add Movie')

    } catch (error) {
        console.error(error)
    }
}