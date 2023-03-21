const express = require('express');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const cors = require('cors');
const app = express();

const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

app.use(express.json());
app.use(cors());
const connectDB = async () => {

    app.post('/register', async (req, resp) => {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password
        Jwt.sign({ result }, jwtkey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                resp.send({ result: 'Something went Wrong please try after sometime' })
            }
            resp.send({ result, auth: token })

        })
    })

    app.post('/login', async (req, resp) => {
        console.log(req.body);
        if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body).select('-password');
            if (user) {
                Jwt.sign({ user }, jwtkey, { expiresIn: '2h' }, (err, token) => {
                    if (err) {
                        resp.send({ result: 'Something went Wrong please try after sometime' })
                    }
                    resp.send({ user, auth: token })

                })
            } else {
                resp.send({ result: 'No User Found' })
            }
        } else {
            resp.send({ result: 'No User Found' })
        }
    })

    app.post('/add-product', async (req, resp) => {
        let product = await new Product(req.body)
        let result = await product.save();
        resp.send(result)
    })

    app.get('/products', async (req, resp) => {
        let products = await Product.find();
        resp.send(products);
    })

    app.delete('/product/:id', async (req, resp) => {
        console.log(req.params.id);
        let product = await Product.deleteOne({ _id: req.params.id })
        resp.send(product)
    })

    app.get('/product/:id', async (req, resp) => {
        let product = await Product.findOne({ _id: req.params.id })
        if (product) {
            resp.send(product)
        } else {
            resp.send({ result: 'No data found' })
        }
    })

    app.put('/product/:id', async (req, resp) => {
        let result = await Product.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        )
        resp.send(result)
    })

    app.get('/search/:key', async (req, resp) => {
        let result = await Product.find({
            "$or": [
                { name: { $regex: req.params.key } },
                { company: { $regex: req.params.key } },
                { price: { $regex: req.params.key } },
                { category: { $regex: req.params.key } },
            ]
        })
        resp.send(result)
    })
    

}



connectDB();

app.listen(5000);