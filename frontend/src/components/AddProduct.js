import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const AddProduct = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const handleCollectData = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        // console.log(name, price, category, company);

        const userId = JSON.parse(localStorage.getItem('user'));
        // console.log(userId._id);

        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json();
        console.log(result);
        navigate('/')
    }
    return (
        <div className="product">
            <h1>Add Product</h1>
            <input type="text" className="inputbox" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name" />
            {error && !name === true ? <span className="invalid-message">Enter valid Name</span> : ""}
            <input type="text" className="inputbox" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Product Price" />
            {error && !price === true ? <span className="invalid-message">Enter valid price</span> : ""}
            <input type="text" className="inputbox" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Product Category" />
            {error && !category === true ? <span className="invalid-message">Enter valid category</span> : ""}
            <input type="text" className="inputbox" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter Product Company" />
            {error && !company === true ? <span className="invalid-message">Enter valid company</span> : ""}
            <button type="button" className="button" onClick={handleCollectData}>Add Item</button>
        </div>
    )
}

export default AddProduct
