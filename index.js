const express = require('express');
const app = express();

app.get('/products', (req, res) =>{
    res.send('GET /products');
});

app.get('/products/:productId', (req, res) => {
    res.send('GET /products/id');
});

app.post('/products', (req, res) => {
    res.send('POST /products');
});

app.put('/products/:productId', (req, res) => {
    res.send('PUT /products/id');
});

app.delete('/products/:productId', (req, res) => {
    res.send('DELETE /products/id');
});

app.listen(3000);