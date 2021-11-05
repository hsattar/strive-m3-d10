YOU WILL NEED TO USE YOUR OWN TOKEN AND CREATE A config.js FILE WITH THE FOLLOWING TO USE THE WEBSITE:

const config = {
TOKEN: 'YOUR_TOKEN_GOES_HERE'
}

---

---

📺STRIVEFLIX
API DOCS (read carefully):
Start from your previous netflix project,

Now its time to add backoffice.

User should be able to

List movies on front page
Add movies from backoffice
Delete movie from back office detail page
Update movie from back office detail page

❗ Tip: test every endpoint in Postman before proceeding on writing any code.

Base url:
https://striveschool-api.herokuapp.com/api/movies

Endpoints:
GET /movies
GET /movies/your_genre
POST /movies
PUT /movies/movie_id
DELETE /movies/movie_id
GET /movies
Example url: https://striveschool-api.herokuapp.com/api/movies

Response: Array of genres (NOT MOVIES)

GET /movies/your_genre
Example url: https://striveschool-api.herokuapp.com/api/movies/romantic

Response: Array of movies with romantic as genre. ⚠️the your_genre field is CASE SENSITIVE!

POST /movies
Example url: https://striveschool-api.herokuapp.com/api/movies

Example body / model:

{
"name": "Strive School",
"description": "Horror movie about coding 10 hours per day",
"category": "horror",
"imageUrl": "https://bit.ly/3cMc2IH"
}
PUT /movies/movie_id
Edits the movies which matches the movie_id passed in the url.

Example url: https://striveschool-api.herokuapp.com/api/movies/123

DELETE /movies/movie_id
Deletes the movies which matches the movie_id passed in the url.

Example url: https://striveschool-api.herokuapp.com/api/movies/123

EVERY API CALL SHOULD BE AUTHENTICATED!
Every request to the API should use Token Based Authentication to secure access to the contents. Without it, you cannot access the API.
You can get your token by registering on: strive.school/studentlogin The token should go in the Authorization header.

Tokens duration is set to 14 days.
Whenever you'll need to obtain a new one you can send the following request:

POST https://striveschool-api.herokuapp.com/api/account/login
{ "username": "testusername@yourmail.com", "password":"pass" }
