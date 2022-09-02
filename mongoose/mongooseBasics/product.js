const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("CONNECTION OPEN!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

    const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price must be positive']
        },
        onSale: {
            type: Boolean,
            default: false
        },
        categories: [String],
        qty: {
            online: {
                type: Number,
                default: 0
            },
            inStore: {
                type: Number,
                default: 0
            }
        },
        size: {
            type: String,
            enum: ['S', 'M', 'L']
        }
    });

    productSchema.methods.greet = function () {
        console.log("HELLOOOOO!!!!")
        console.log(`- from ${this.name}`)
    }

    productSchema.statics.fireSale = function () {
        return this.updateMany({}, { onSale: true, price: 0 })
    }

    const Product = mongoose.model('Product', productSchema)

    const findProduct = async () => {
        const foundProduct = await Product.findOne({ name: 'Bike Helmet'})
        foundProduct.greet();
    }
    
    Product.fireSale().then(res => console.log(res))

    // findProduct();
    
    
    
    // const bike = new Product({ name: 'Cycling Jersey', price: 28.50, categories: ['Cycling'], size: 'XS ' })
    // bike.save()
    // .then(data => {
    //     console.log("IT WORKED!!")
    //     console.log(data);
    // })
    // .catch(err => {
    //     console.log("OH NO ERROR!!")
    //     console.log(err)
    // })

    // Product.findOneAndUpdate({name: 'Tire Pump'}, { price: 9 }, {new: true, runValidators: true })
    // .then(data => {
    //     console.log("IT WORKED!!")
    //     console.log(data);
    // })
    // .catch(err => {
    //     console.log("OH NO ERROR!!")
    //     console.log(err)
    // })