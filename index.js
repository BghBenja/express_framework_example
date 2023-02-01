const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.get('/products', (req, res) =>{
    res.send('GET /products');
});

app.get('/products/:productId', (req, res) => {
    res.send('GET /products/id');
});

app.post('/products', bodyParser.json(), (req, res) => {
    
    const newProduct = {
        id: uuidv4(),
        name: sanitizeString(req.body.name),
        price: Number(req.body.price),
        isInStock: Boolean(req.body.isInStock),
    };

    fs.readFile('./data/products.json' , (err, file) => {
        const products = JSON.parse(file);
        products.push(newProduct);
        fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
            res.send(newProduct);
        })
    })
});

app.put('/products/:productId', (req, res) => {
    res.send('PUT /products/id');
});

app.delete('/products/:productId', (req, res) => {
    res.send('DELETE /products/id');
});

app.listen(3000);

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}