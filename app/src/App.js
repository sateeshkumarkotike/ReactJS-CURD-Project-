import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProductItem from './ProductItem.js';
import AddItems from './AddItems';

const products = [
    {
        name: 'ipad',
        price: 200
    },
    {
        name: 'iPhone',
        price: 650
    }
]
localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: JSON.parse(localStorage.getItem('products')),
            // name: JSON.parse(localStorage.getItem('products'))
        };
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);

    }
    componentWillMount() {
        const products = this.getProducts();
        this.setState({ products })
        var tim = new Date().getSeconds();
        console.log(tim);
    }
    getProducts() {
        return this.state.products;
    }
    onAdd(name, price) {
        const products = this.getProducts();
        products.push({
            name, price
        });
        this.setState({ products });
    }
    onDelete(name) {
        const products = this.getProducts();
        const filteredProducts = products.filter(product => {
            return product.name !== name;
        });
        this.setState({ products: filteredProducts });
    }
    onEditSubmit(name, price, originalName) {
        let products = this.getProducts();
        products = products.map(product => {
            if (product.name === originalName) {
                product.name = name;
                product.price = price;
            }
            return product;
        });
        this.setState({ products });
    }
    render() {
        return (
            <div className="App">
                <h1 className="App-header">Products Manager</h1>
                <AddItems onAdd={this.onAdd} />
                {
                    this.state.products.map(product => {
                        return (
                            <ProductItem key={product.name} {...product} //name=AAA price={product.price}
                                onDelete={this.onDelete} onEditSubmit={this.onEditSubmit} />
                        );
                    })
                }
            </div>
        );
    }
}
export default App;
