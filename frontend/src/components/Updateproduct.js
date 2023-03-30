import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Updateproduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        // console.log(params);
        getProductDetails();
    },[])


    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const handleUpdateData = async () => {
        // console.log(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json"
            }
        })
        result = await result.json();
        console.log(result);
        navigate('/')
    }
    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" className="inputbox" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name" />
            <input type="text" className="inputbox" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Product Price" />
            <input type="text" className="inputbox" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Product Category" />
            <input type="text" className="inputbox" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter Product Company" />
            <button type="button" className="button" onClick={handleUpdateData}>Update Item</button>
        </div>
    )
}

export default Updateproduct
