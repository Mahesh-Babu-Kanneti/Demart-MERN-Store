import emptyCart from '../Assets/emptyCart.svg'
import './mycart_page.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';


import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import ListGroup from 'react-bootstrap/ListGroup';

import { BsCart2, BsDeviceSsd } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

import toast,{Toaster} from 'react-hot-toast';

import Loader from './loader';
//RTK...
import { useSelector } from 'react-redux';




function MyCart() {


    const navigate = useNavigate();
    //CARTLIST VIEW PAGE----

 const [cartListed,setCartlisted] = React.useState([]);

 const [load,setLoad] = React.useState(true);
















React.useEffect(() => {
    const cartFetched = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/list`);
  
        let filterUser = response.data.filter(obj=>obj.userId===localStorage.getItem('email'))
        if(filterUser){
            setCartlisted(filterUser);
            setLoad(false)
        }
      } catch (error) {
        console.log(error);
      }
    };

    cartFetched();

  }, []);


 //---------------------END-----------


const deleteCart = async (id) =>{
        
    const ress = await axios.delete(`${process.env.REACT_APP_BASE_URL}/cart/delete/`+`${id}`).then(
        res=>{toast.success(res.data); setTimeout(()=>{window.location.reload()},1500)}
    )
    

}









    return (
        <>
{load ? <Loader/> : <>
            <div>

            <Toaster
                    position="top-right"
                    reverseOrder={false}
                />

                <br /><br /><br /><br /><br /><br />

                <Card.Body>
                    <Card.Title style={{ color: "#373737", marginLeft: '20px' }}>  {cartListed.length ==0? "Your Cart is Empty (0) items" : " My Cart "+ "("+cartListed.length+")" + " items"}  </Card.Title>
                </Card.Body>  <br />
                {cartListed.length==0? <> <Card.Img variant="top" src={emptyCart} style={{margin:"25px",width:"650px",height:"250px"}}/>  <p style={{fontSize:"14px",margin:"0px 0px 0px 160px",color:'#878787'}}> Browse from our wide variety of products & exciting offers </p> </> : null}

                <div style={{ height: 'auto' }}>


                    <Card body className='cart-card'>

{cartListed.map((lis)=>(<div key={lis._id}>
                {lis.userId === localStorage.getItem('email') ? lis.cartItems.map((li)=>(<div key={li._id}>
                        <ListGroup horizontal className="list-cart">
                            <ListGroup.Item>
                                <Card className='products-view-cart'>
                                    <Card.Img variant="top" className='product-view-cart' src={li.productImage || "https://m.media-amazon.com/images/I/81LO0QPqZAL._AC_UL480_QL65_.jpg"} />
                                </Card>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Card.Body>
                                    <Card.Title style={{ color: "#373737", fontSize: "13px" }}> {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"} </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize:"12px" }}> {li.productCategory || "Category"} </Card.Subtitle>
                                </Card.Body>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Card.Text style={{ color: "black" }}>
                                    &nbsp; &#8377; <b> {li.productPrice || "0"} </b>
                                </Card.Text>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Card.Text style={{ color: "black" }}>
                                      <FaRegTrashAlt style={{ color: "red" }} className="delete" onClick={() => deleteCart(lis._id)}/>
                                </Card.Text>
                            </ListGroup.Item>

                        </ListGroup></div>)):null}

</div>))}
















                                        {/*------Price Summart proceed to buy ---------*/}

<br/><br/><br/>

                        <Card style={{ width: '18rem', float: "right", border: "none" }}>
                            <ListGroup >
                                <ListGroup.Item style={{textAlign:"center"}}> <b> Price Summary </b> </ListGroup.Item>
                                <ListGroup.Item> Cart Total   <b style={{ float: "right" }}> &#8377;  {cartListed.map(obj => obj.cartItems.reduce((acc, item) => acc + item.productPrice, 0)).reduce((acc, val) => acc + val, 0) || "0"} </b> </ListGroup.Item>
                                <ListGroup.Item> Delivery Charge <b style={{ float: "right" }}> &#8377;  0 </b> </ListGroup.Item>
                                <ListGroup.Item> Savings <b style={{ float: "right" }}> &#8377;  0 </b> </ListGroup.Item>
                            </ListGroup>

                            <Card.Text >
                                {cartListed.length!=0 ?
                                <Button className='cart-button-cart' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{navigate('/payment');setTimeout(()=>{window.location.reload()},200)}}>  PROCEED TO CHECKOUT </Button>
                                    : 
                                    <Button className='cart-button-cart' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} disabled>  PROCEED TO CHECKOUT </Button>
                                }
                                </Card.Text>
                        </Card>








                    </Card>





                </div>







                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />








            </div>

            </>}

        </>
    );
}

export default MyCart;