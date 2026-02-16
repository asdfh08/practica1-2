const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
    { id: 1, name: 'iPhone 17 Pro Max', price: 149999 },
    { id: 2, name: 'MacBook Pro 16"', price: 299999 },
    { id: 3, name: 'AirPods Pro 3', price: 24999 }
];

app.get('/', (req, res) => {
    res.send('Server is working');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }
    
    const newProduct = {
        id: Date.now(),
        name: name,
        price: price
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    
    const product = products.find(p => p.id === id);
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    if (name) product.name = name;
    if (price) product.price = price;
    
    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = products.length;
    
    products = products.filter(p => p.id !== id);
    
    if (products.length < initialLength) {
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(port, () => {
    console.log('Server running on http://localhost:' + port);
});