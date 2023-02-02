const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.get('/products', (req, res) =>{
    fs.readFile('./data/products.json', (err, file) => {
        res.send(JSON.parse(file));
    })
});

app.get('/products/:productId', (req, res) => {
    const id = req.params.productId;
    
    fs.readFile('./data/products.json', (err, file) => {
        const products =JSON.parse(file);
        const productById = products.find(product => product.id === id);

        if(!productById) {
            res.status(404);
            res.send({error: `id ${id} not found`});
            return;
        }

        res.send(productById);

    });
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

app.put('/products/:productId',bodyParser.json(), (req, res) => {
    const id = req.params.productId;

    fs.readFile('./data/products.json', (err, file) => {
        const products = JSON.parse(file);
        const productIndexById = products.findIndex(product => product.id === id);

        if(productIndexById === -1) {
            res.status(404);
            res.send({error: `id: ${id} not found`});
            return;
        }

        const updatedProduct = {
            id: id,
            name: sanitizeString(req.body.name),
            price: Number(req.body.price),
            isInStock: Boolean(req.body.isInStock),
        };

        products[productIndexById] = updatedProduct;
        fs.writeFile('./data/products.json', JSON.stringify(products), () => {
            res.send(updatedProduct);
        });
    });
});

app.delete('/products/:productId', (req, res) => {
    const id = req.params.productId;

    fs.readFile('./data/products.json', (err, file) => {
        const products = JSON.parse(file);
        const productIndexById = products.findIndex(product => product.id === id);

        if(productIndexById === -1) {
            res.status(404);
            res.send({error: `id: ${id} not found`});
            return;
        }

        products.splice(productIndexById, 1);
        fs.writeFile('./data/products.json', JSON.stringify(products), () => {
            res.send({id: id});
        });
    });
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