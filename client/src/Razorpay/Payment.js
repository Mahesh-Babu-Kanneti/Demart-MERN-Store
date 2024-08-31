
import './payment.css';

import React, { useEffect } from 'react';
import axios from 'axios';


import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import ListGroup from 'react-bootstrap/ListGroup';

import { FaRegTrashAlt } from "react-icons/fa";
import jsPDF from 'jspdf';
import toast,{Toaster} from 'react-hot-toast';

import Loader from '../Components/loader';
import { BsGoogle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';





function Payment() {

const redirectToHome = useNavigate();
    //CARTLIST VIEW PAGE----

 const [cartListed,setCartlisted] = React.useState([]);

 const [load,setLoad] = React.useState(true);

















React.useEffect(() => {
    const cartFetched = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/cart/list`);
  
        const filterUser = response.data.filter(obj=>obj.userId===localStorage.getItem('email'))
        if(filterUser){
            setLoad(false);setCartlisted(filterUser);
        }
      } catch (error) {
        console.log(error);
      }
    };

    cartFetched();

  }, [localStorage.getItem('email')]);


 //---------------------END-----------



 //--------Payment gateway...
 React.useEffect(()=>{
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return ()=>{
        document.body.removeChild(script)
    }

 },[])


 const handlePayment = async (cartList,cartTotalPrice) =>{
    //console.log(cartList,"cartListcartList")
    try{
        let payload ={
            amount: cartTotalPrice,
            userId:localStorage.getItem('email')
        }

        if(!payload||payload.userId==null||payload.amount==null){
            return;
        }

        // console.log(options,payload,"PAY")
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment`, payload,{
            headers:{
                "method":'POST',
                'Content-Type':'application/json',
                'x-token':localStorage.getItem('token')
            }
        })//.then(res=>{toast.success(res.data);redirectToHome('/mycart');setTimeout(()=>{window.location.reload()},1500);});


            const {data} = response;

            if (data.createOrder.status !== 'created') { //If order is not created...
                console.error('Order creation failed');
                return;
            }
                var options = {
                key: process.env.REACT_APP_RZP_KEY,
                amount:data.createOrder.amount,
                currency: "INR",
                userId: localStorage.getItem('email'),
                description:'Test Payment',
                 order_id: data.createOrder.id,    //data.createOrder.id,data.message
                handler: async function (response){
                             // Prepare data for successful payment...
                       try{

                                //API CALL PAYMENT success....
                                var userOrderData = {
                                    orderId: data.createOrder.id,
                                    paymentId: response.razorpay_payment_id,
                                    orderAmount: payload.amount,
                                    userId: options.userId,
                                    transKey: options.key
                                }
                                 // console.log(userOrderData,JSON.stringify(userOrderData),"userOrderData==")

                         //CREATING AND PRINT USERS ORDERS DETAILS PDF USING JAVASCRIPT...
                            let pdf = new jsPDF('landscape','px','a4','false');

                            pdf.text(320,80,"Order-Payment Receipt",'center');
                            pdf.text(200,140,"Order-Id : ")
                            pdf.text(200,160,"Order-Amount : ")
                            pdf.text(200,180,"Email-Id : ")
                            pdf.text(200,200,"Payment-Id : ")
                            pdf.text(200,220,"Transaction-Id : ")

                            pdf.text(320,140,JSON.stringify(data.createOrder.id),'justify')
                            pdf.text(320,160,JSON.stringify(payload.amount),'justify')
                            pdf.text(320,180,JSON.stringify(options.userId),'justify')
                            pdf.text(320,200,JSON.stringify(response.razorpay_payment_id),'justify')
                            pdf.text(320,220,JSON.stringify(options.key),'justify')
                            pdf.text(320,400,"* NOTE: PLEASE DONOT SHARE YOUR TRANSACTION-ID TO ANYONE.",'center');
                            pdf.save('payment.pdf');
                    //-----------------------PRINTING END SECTION--------------

                                //Posting userOrderData to server...
                                 await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/success`,userOrderData,{
                                    headers:{
                                        "method":'POST',
                                        'Content-Type':'application/json',
                                        'x-token':localStorage.getItem('token')
                                    }
                                }).then(res=>{toast.success(res.data);redirectToHome('/mycart');setTimeout(()=>{window.location.reload()},1500);});   

                       }catch(err){toast.error(err)}
                     //console.log(response.razorpay_payment_id,"signature==+++====++++===");
                    //alert("Payment Successful " + " TransId : " + " " + response.razorpay_payment_id);
                },          
                 prefill: {
                    email: payload.userId
                }
            }

              //console.log(data,options,payload,"PAY")
            const razorpay1 = new window.Razorpay(options);
            razorpay1.open();

    }
    catch(err){
        console.log(err)
    }
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
                    <Card.Title style={{ color: "#373737", marginLeft: '20px' }}> <h3> Review Your Cart for Payment to Proceed. </h3> </Card.Title>
                </Card.Body>  <br />

                <div style={{ height: 'auto' }}>


                    <Card body className='cart-card'>

{cartListed.map((lis)=>(<div key={lis._id}>
                {lis.userId === localStorage.getItem('email') ? lis.cartItems.map((li)=>(<div key={li._id}>
                        <ListGroup horizontal className="list-cart">
                           
                            <ListGroup.Item>
                                <Card className='products-view-cart'>
                                    <Card.Img variant="top" className='product-view-cart' src={li.productImage} />
                                </Card>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Card.Body>
                                    <Card.Title style={{ color: "#373737", fontSize: "13px" }}> {li.productName } : {li.productQuantity } </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize:"12px" }}> {li.productCategory} </Card.Subtitle>
                                </Card.Body>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Card.Text style={{ color: "black" }}>
                                    &nbsp; &#8377; <b> {li.productPrice} </b>
                                </Card.Text>
                            </ListGroup.Item>
                            <ListGroup.Item>

                            </ListGroup.Item>

                        </ListGroup></div>)):null}

</div>))}
















                                        {/*------Price Summart proceed to payment ---------*/}

<br/><br/>

                        <Card style={{ width: '18rem', float: "right", border: "none" }}>
                            <ListGroup >
                                <ListGroup.Item style={{textAlign:"center"}}> <b> Price Summary </b> </ListGroup.Item>
                                <ListGroup.Item> Cart Total   <b style={{ float: "right" }}> &#8377;  {cartListed.map(obj => obj.cartItems.reduce((acc, item) => acc + item.productPrice, 0)).reduce((acc, val) => acc + val, 0) || "0"} </b> </ListGroup.Item>
                                <ListGroup.Item> Delivery Charge <b style={{ float: "right" }}> &#8377;  0 </b> </ListGroup.Item>
                                <ListGroup.Item> Savings <b style={{ float: "right" }}> &#8377;  0 </b> </ListGroup.Item>
                            </ListGroup>

                            <Card.Text >
                            {cartListed.length!=0 ?
                                <Button className='cart-button-cart' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>handlePayment(cartListed,cartListed.map(obj => obj.cartItems.reduce((acc, item) => acc + item.productPrice, 0)).reduce((acc, val) => acc + val, 0))}>  PROCEED TO PAYMENT </Button>
                                : 
                                <Button className='cart-button-cart' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} disabled>  PROCEED TO PAYMENT </Button>
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

export default Payment;