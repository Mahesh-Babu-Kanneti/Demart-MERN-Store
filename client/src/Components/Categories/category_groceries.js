


import './categories.css';

import React,{useState,useEffect} from 'react';
import axios from 'axios';

import toast,{Toaster} from 'react-hot-toast';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import { BsCart2 } from "react-icons/bs";


import Loader from '../loader';

//RTK...
import { useDispatch } from 'react-redux';
import { addProductToCart, removeProductFromCart } from "../../RTK/Reducer/CartReducer";



function CategoryGroceries() {

    
    //Dispatch...
    const dispatch = useDispatch();

    const [load,setLoad] = React.useState(true);

    const [groceriesProducts,setGroceriesproducts] = useState([]);

const groceriesProduct = async()=>{
    let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/list`).then(
        res=>{setLoad(false);setGroceriesproducts(res.data)}
    )


}



useEffect(()=>{
    groceriesProduct();
},[])





    return (
        <>
            <div >

            <Toaster
                    position="top-right"
                    reverseOrder={false}
                />

                <br /><br /><br /><br /><br />


                <div style={{ width: "auto" }}>

                    <Card style={{ border: "none", marginTop: "-15px", borderRadius: "0px" }}>
                        <Card.Body style={{ margin: "10px 0px 0px 15px" }}> <h5> Groceries & Staples </h5>  </Card.Body>
                    </Card>



{load ? <Loader/> : <>
                    {/** ---Looping products list in catergory----- */}

                    {groceriesProducts.filter(li=>li.productCategory==='groceries_staples').map(list => <div style={{ display: "inline-flex" }}  key={list._id}>


                        <div style={{ display: "flex", float: "left", marginLeft: "15px" }}>

                            <CardGroup style={{ marginTop: "10px", marginLeft: "15px" }}>

                                <Card className='product-list' key={list.productId}>
                                          <a href={`/products/productview/`+`${list.productId}`} className='products'> <Card.Img variant="top" src={list.productImage} />  </a>
                                    <Card.Body>
                                        <Card.Text style={{ fontSize: '14px', color: "#373737" }}>

                                            {list.productName}  : {list.productQuantity}
                                        </Card.Text>
                                        <Card.Text style={{ fontSize: '14px', color: "black" }}>
                                            DeMart Price : &nbsp; <b> &#8377; {list.productPrice} </b>
                                        </Card.Text>
                                        <Card.Text >
                                            <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>dispatch(addProductToCart({prodId:list._id,productId:list.productId,productName:list.productName,productCategory:list.productCategory,productQuantity:list.productQuantity,productPrice:list.productPrice,productImage:list.productImage}))}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                            </CardGroup>
                        </div>

                    </div>


                    )}

</>}

                </div>








<br/><br/><br/>


            </div>
        </>
    );
}

export default CategoryGroceries;