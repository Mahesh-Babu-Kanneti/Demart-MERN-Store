

import Loader from './loader';

import './product_preview.css';

import React,{useState,useEffect} from 'react';
import axios from 'axios';

import toast,{Toaster} from 'react-hot-toast';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import { BsCart2 } from "react-icons/bs";

import {useParams} from 'react-router-dom';

//RTK...
import { useDispatch } from 'react-redux';
import { addProductToCart} from "../RTK/Reducer/CartReducer";



function ProductView() {

        //Dispatch...
        const dispatch = useDispatch();

    const params = useParams();

    const [previewProducts,setPreviewproducts] = useState([]);

    const [load,setLoad] = React.useState(true);

const previewProduct = async()=>{
    let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/list`).then(
        res=>{setLoad(false);setPreviewproducts(res.data)}
    )


}



useEffect(()=>{
    previewProduct();
       
},[])






//Filtering the preview products using id...

let filterPreview = previewProducts.filter(id=> id.productId === params.id);





    return (
        <>
            <div>

            <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                
                <br /><br /><br /><br /><br /><br /><br />

{load ? <Loader/> : <>
                <div>
                    <Card className="container-section">
                        <Card.Body className='container-body'> 
{filterPreview && filterPreview.map(view => <div key={view._id}>
                            <CardGroup>

                                <Card className='products-view'>
                                    <Card.Img variant="top" className='product-view' src={view.productImage} />
                                </Card>


                                <Card style={{ width: '18rem', border: "none" }}>

                                    <Card.Body>
                                        <Card.Title style={{ color: "#373737" }}> {view.productName} : {view.productQuantity} </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted" style={{ marginTop: "15px" }}> {view.productCategory} </Card.Subtitle>
                                    </Card.Body>


                                    <Card.Body>
                                        <Card.Text style={{ color: "black" }}>
                                            DeMart Price : &nbsp; <b> &#8377; {view.productPrice} </b>
                                        </Card.Text>
                                        <br /><br /><br />
                                        
                                        <Card.Text >
                                            <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "30%", float: "right", margin: "auto 100px auto 0px" }} onClick={()=>dispatch(addProductToCart({ prodId:view._id,productId: view.productId, productName: view.productName, productCategory: view.productCategory, productQuantity: view.productQuantity, productPrice: view.productPrice, productImage: view.productImage }))}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                        </Card.Text>
                                    </Card.Body>

                                </Card>



                            </CardGroup>
</div>)}
                        </Card.Body>
                    </Card>



                </div>


                <br /><br /><br /><br /><br />




                <div>

                    <Card className="container-section2">
                        <Card.Body className='container-body'>
                            <Card.Body>
                                <Card.Title style={{ color: "#373737" }}> Other Related Products </Card.Title>
                            </Card.Body>
                            {filterPreview.map(filterPreview =>  <div key={filterPreview._id}>
                            <CardGroup>
  
                                <Card className='products-card'>
                                    <Card.Img variant="top" className='products' src={filterPreview.productImage} />
                                    <Card.Body>
                                        <Card.Text style={{ fontSize: '14px', color: "#373737" }}>
                                            {filterPreview.productName} : {filterPreview.productQuantity}
                                        </Card.Text>
                                        <Card.Text style={{ fontSize: '14px', color: "black" }}>
                                            DeMart Price : &nbsp;  <b> &#8377; {filterPreview.productPrice} </b>
                                        </Card.Text>
                                        <Card.Text >
                                            <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>dispatch(addProductToCart({ prodId:filterPreview._id,productId: filterPreview.productId, productName: filterPreview.productName, productCategory: filterPreview.productCategory, productQuantity: filterPreview.productQuantity, productPrice: filterPreview.productPrice, productImage: filterPreview.productImage }))}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                        </Card.Text>
                                    </Card.Body>
                                </Card> 
                                 <Card className='products-card'>
                                     <Card.Img variant="top" className='products' src={filterPreview.productImage} />
                                     <Card.Body>
                                         <Card.Text style={{ fontSize: '14px', color: "#373737" }}>
                                             {filterPreview.productName} : {filterPreview.productQuantity}
                                         </Card.Text>
                                         <Card.Text style={{ fontSize: '14px', color: "black" }}>
                                             DeMart Price : &nbsp;  <b> &#8377; {filterPreview.productPrice} </b>
                                         </Card.Text>
                                         <Card.Text >
                                             <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>dispatch(addProductToCart({ prodId:filterPreview._id,productId: filterPreview.productId, productName: filterPreview.productName, productCategory: filterPreview.productCategory, productQuantity: filterPreview.productQuantity, productPrice: filterPreview.productPrice, productImage: filterPreview.productImage }))}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                        </Card.Text>
                                     </Card.Body>
                                 </Card>
                                 <Card className='products-card'>
                                     <Card.Img variant="top" className='products' src={filterPreview.productImage} />
                                     <Card.Body>
                                         <Card.Text style={{ fontSize: '14px', color: "#373737" }}>
                                            {filterPreview.productName} : {filterPreview.productQuantity}
                                         </Card.Text>
                                         <Card.Text style={{ fontSize: '14px', color: "black" }}>
                                             DeMart Price : &nbsp;  <b> &#8377; {filterPreview.productPrice} </b>
                                         </Card.Text>
                                         <Card.Text >
                                             <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>dispatch(addProductToCart({ prodId:filterPreview._id,productId: filterPreview.productId, productName: filterPreview.productName, productCategory: filterPreview.productCategory, productQuantity: filterPreview.productQuantity, productPrice: filterPreview.productPrice, productImage: filterPreview.productImage }))}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                         </Card.Text>
                                    </Card.Body>
                                 </Card>
                                  <Card className='products-card'>
                                     <Card.Img variant="top" className='products' src={filterPreview.productImage} />
                                     <Card.Body>
                                         <Card.Text style={{ fontSize: '14px', color: "#373737" }}>
                                             {filterPreview.productName} : {filterPreview.productQuantity}
                                        </Card.Text>
                                         <Card.Text style={{ fontSize: '14px', color: "black" }}>
                                            DeMart Price : &nbsp;  <b> &#8377; {filterPreview.productPrice} </b>
                                         </Card.Text>
                                         <Card.Text >
                                             <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>dispatch(addProductToCart({ prodId:filterPreview._id,productId: filterPreview.productId, productName: filterPreview.productName, productCategory: filterPreview.productCategory, productQuantity: filterPreview.productQuantity, productPrice: filterPreview.productPrice, productImage: filterPreview.productImage }))}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                        </Card.Text>
                                     </Card.Body>
                                 </Card>
                                 <Card className='products-card'>
                                     <Card.Img variant="top" className='products' src={filterPreview.productImage} />
                                     <Card.Body>
                                         <Card.Text style={{ fontSize: '14px', color: "#373737" }}>
                                             {filterPreview.productName} : {filterPreview.productQuantity}
                                         </Card.Text>
                                         <Card.Text style={{ fontSize: '14px', color: "black" }}>
                                             DeMart Price : &nbsp;  <b> &#8377; {filterPreview.productPrice} </b>
                                         </Card.Text>
                                         <Card.Text >
                                             <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>dispatch(addProductToCart({ prodId:filterPreview._id,productId: filterPreview.productId, productName: filterPreview.productName, productCategory: filterPreview.productCategory, productQuantity: filterPreview.productQuantity, productPrice: filterPreview.productPrice, productImage: filterPreview.productImage }))}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                         </Card.Text>
                                     </Card.Body>
                                 </Card>

                            </CardGroup>
   </div>   )}
                          
                        </Card.Body>
                    </Card>

                </div>

</>}

                <br /><br /><br />







            </div>
        </>
    );
}

export default ProductView;