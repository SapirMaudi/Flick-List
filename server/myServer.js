const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/api/movies/search', async (req, res) => {
  const movieName = req.query.name
  const apiRequest = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTU0MTQzMWVlZjk5ZGU2MTk3OTI0YWNhYTA1MDcwOCIsIm5iZiI6MTc1NjAzNjA2MC41MTYsInN1YiI6IjY4YWFmYmRjYjgzYWIxYjljNzY3MDNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E3c1nIpjvuSpccsdTxicdOncGNxygbOmASEJI6uQrW4'
  }
};

try {
  console.log('search request received for movie:', movieName);
  const response = await axios.request(apiRequest);
  res.status(200).json(response.data);
} catch (error) {
  console.error('Error fetching movie data:', error);
  res.status(500).json({ error: 'Failed to fetch movie data' });
}

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
