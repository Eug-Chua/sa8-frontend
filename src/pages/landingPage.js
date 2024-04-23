import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';
import {API_URL} from '../context/Api-Handler';
import ProductCard from '../component/ProductCard';

export default function LandingPage(){

    let [products, setProducts] = useState("");
    let {setProductList} = useContext(ProductContext);
    let {setSupplierList} = useContext(ProductContext);
    let {setCategoryList} = useContext(ProductContext);

    useEffect(()=>{
        fetchData();
    },[])

    async function fetchData(){
        let response = await axios.get(API_URL + `/all-products`);
        let productsData = response.data;
        setProducts(productsData["products"]);
        setProductList(productsData["products"]);
        let supplierSet = {};
        let categorySet = {};
        for (let product of productsData["products"]){
            if (!supplierSet[product.supplier_name]){
                supplierSet[product.supplier_name] = product.supplier_id;
            }
            if (!categorySet[product.category_name]){
                categorySet[product.category_name] = product.category_id;
            }
        }
        setSupplierList(supplierSet);
        setCategoryList(categorySet);
    }

    const navigate = useNavigate();

    function handleDeleteNavigate(productId){
        navigate(`/delete/${productId}`); 
    }

    function handleUpdateNavigate(productId){
        navigate(`update/${productId}`);
    }

    return(
        <React.Fragment>
            {products ? (
                products.map((product)=>
                    <ProductCard key={product.id} item={product} updatefunction={handleUpdateNavigate} deletefunction={handleDeleteNavigate}/>
                    // <div className="card" key={product.productId} style={{backgroundColor:"#3B3B3B",color:"white",width: "30rem", marginLeft: "12px", marginTop:"5px", marginBottom:"5px"}}>    
                    //     <div className="card-body">
                    //         <h3 className="card-title">Name: {product.name}</h3>
                    //         <p className="card-text">Product Id: {product.productId}</p>
                    //         <p className="card-text">Launch Date: {product.launchDate.slice(0,10)}</p>
                    //         <p className="card-text">Amount (USD): {product.srp}</p>
                    //         <p className="card-text">Category Id: {product.category_id}</p>
                    //         <p className="card-text">Category: {product.category_name}</p>
                    //         <p className="card-text">Supplier: {product.supplier_name}</p>
                    //         <button className="btn btn-secondary" style={{border:"1px", marginRight:"8px"}} onClick={()=>handleUpdateNavigate(product.productId)}> Edit </button>
                    //         <button className="btn btn-danger" style={{border:"1px"}} onClick={()=>handleDeleteNavigate(product.productId)}> Delete </button>
                    //     </div>
                    // </div>
            )) : (<p> Loading... </p>)
            }
        </React.Fragment>
    );
}