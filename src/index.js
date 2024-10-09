import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Just Works</h1>')
})

app.listen(5000, () => console.log('Server is running on port 5000...'));