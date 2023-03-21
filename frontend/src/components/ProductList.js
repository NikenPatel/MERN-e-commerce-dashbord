import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const ProductList = () => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        setProduct(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete'
        })
        result = await result.json();
        if (result) {
            getProduct();
        }
    }

    const handleSearch = async (e) => {
        let key = e.target.value
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProduct(result)
            }
        } else {
            getProduct();
        }

    }

    // console.log(product);
    return (
        <div className="product-list">
            <h1>Product list</h1>
            <input onChange={handleSearch} className="search-input" type="text" placeholder="Search Products" />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                product.length > 0 ? product.map((item, i) => {
                    return (
                        <ul key={i}>
                            <li>{i + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link to={"/update/" + item._id}><button>Update</button></Link>
                            </li>
                        </ul>
                    )

                })
                    :
                    <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList


