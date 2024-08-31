import Carousel from 'react-bootstrap/Carousel';
import "./home.css";

import Loader from '../loader';



import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import products from '../../products.json';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

import toast,{Toaster} from 'react-hot-toast';

import { BsCart2 } from "react-icons/bs";

import Banner1 from '../../Assets/banner/banner1.webp';
import Banner2 from '../../Assets/banner/banner2.webp';
import Banner3 from '../../Assets/banner/banner3.webp';
import Banner4 from '../../Assets/banner/banner4.webp';

import section1 from '../../Assets/home/section1.jpg';
import section2 from '../../Assets/home/section2.jpg';
import section3 from '../../Assets/home/section3.jpg';
import section4 from '../../Assets/home/section4.jpg';
import section5 from '../../Assets/home/section5.jpg';
import section6 from '../../Assets/home/section6.jpg';

import Slider1 from '../../Assets/banner/slider1.webp';
import Slider2 from '../../Assets/banner/slider2.webp';
import Slider3 from '../../Assets/banner/banner4.webp';

//RTK...
import { useDispatch } from 'react-redux';
import { addProductToCart, removeProductFromCart } from "../../RTK/Reducer/CartReducer";
import { useSelector } from 'react-redux';




function Home() {

        //Dispatch...
        const dispatch = useDispatch();

    const [load,setLoad] = React.useState(true);

    const [homepageProducts,setHomepageproducts] = useState([]);

const homepageItems = async()=>{
    let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/list`).then(
        res=>{setLoad(false);setHomepageproducts(res.data)}
    )


}



useEffect(()=>{
    homepageItems();
},[])


//WEEKS Sales...
const weeksalesFilter = homepageProducts.filter(category=>category.productName === "Lays American Cream & Onion Potato Chips");

//MONTHLY ESSENTIALS...
const monthsalesFilter = homepageProducts.filter(category=>category.productName === "Ensure Nutrition Powder - Chocolate Flavour");




const addtocart = async(data)=>{
    let cartarr = await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/add`,data).then(
        res=>{toast.success(res.data);setTimeout(()=>{window.location.reload()},1500)}
    ).catch(err=>toast.error(err.response.data))//----
}



    return (
        <>
            
            <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
        
            <div className='home-body'>

                   <br/><br/><br/><br/>
{load ? <Loader/> : <>

                <Carousel>
                    <Carousel.Item>
                        <img src={Banner1} text="First slide" style={{ width: "100%", height: "auto", marginTop:"12px" }} className='banner'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Banner2} text="Second slide" style={{ width: "100%", height: "auto", marginTop:"12px" }} className='banner' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Banner3} text="Third slide" style={{ width: "100%", height: "auto", marginTop:"12px" }} className='banner' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Banner4} text="Fourth slide" style={{ width: "100%", height: "auto", marginTop:"12px" }} className='banner' />
                    </Carousel.Item>
                </Carousel>

<br/>


                <Card className="container-section">
                    <Card.Body className='container-body'><img src={section1} alt='image1' /></Card.Body>
                </Card>

 <br/>

                <Card className="container-section">
                    <Card.Body className='container-body'><img src={section2} alt='image2' /></Card.Body>
                </Card>

<br/>

                <Card className="container-section">
                    <Card.Body className='container-body'><img src={section3} alt='image3' /></Card.Body>
                </Card>

<br/>

                <Card className="container-section">
                    <Card.Body className='container-body'><img src={section4} alt='image4' /></Card.Body>
                </Card>

<br/>

                <Card className="container-section">
                    <Card.Body className='container-body'><img src={section5} alt='image5' /></Card.Body>
                </Card>

<br/>

                <Card className="container-section">
                    <Card.Body className='container-body'><img src={section6} alt='image6' /></Card.Body>
                </Card>

<br/>

                <Card className="container-section">
                    <Card.Body className='container-body'><img src={section1} alt='image1' /></Card.Body>
                </Card>

<br/>

                <Card className="container-section">
                    <Card.Body className='container-body'>
                        <strong>This Week's Savers </strong> <strong style={{ float: "right" }}> <a href={"#"} style={{ textDecoration: "none", fontWeight:400, color: "#373737" }}> View All </a> </strong><br /><br />
 {weeksalesFilter.map(li=><div  key={li._id}>      <CardGroup>

                            <Card className='products-card'>
                                    <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top"  src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} />  </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; { li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                    <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top"  src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                         DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                   <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                       {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                          DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                  <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                         DeMart Price : &nbsp;  <b> &#8377; { li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                   <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top"  src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </CardGroup></div>)}</Card.Body>
                </Card>

<br/>


                <Card className="container-section">
                    <Card.Body className='container-body'><img src={section1} alt='image1' /></Card.Body>
                </Card>

<br/>

                <Card className="container-section">
                    <Card.Body className='container-body'><img src={section1} alt='image1' /></Card.Body>
                </Card>

<br/>




                <Card className="container-section">
                    <Card.Body className='container-body'>

                            <strong> Monthly Essentials </strong> <strong style={{ float: "right" }}> <a href={"#"} style={{ textDecoration: "none", fontWeight: 400, color: "#373737" }}> View All </a> </strong><br /><br /> 
{monthsalesFilter.map(li=><div  key={li._id}>                       
                        <Carousel className='indicate'>
                            <Carousel.Item className='indicate'>
                             
                        <CardGroup>
                            <Card className='products-card'>
                                   <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                       {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377;  {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            <Card className='products-card'>
                                  <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                     <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top"  src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                    <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                   <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                            </Carousel.Item>


                            <Carousel.Item>
                        <CardGroup>
                            <Card className='products-card'>
                                     <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                     <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                  <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top"  src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} />  </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                  <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                  <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                            </Carousel.Item>


                            <Carousel.Item>
                            <CardGroup>
                            <Card className='products-card'>
                                   <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top"  src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                   <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                   <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top"  src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                  <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                   <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} />  </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                            </Carousel.Item>


                            <Carousel.Item>
                            <CardGroup>
                            <Card className='products-card'>
                                    <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} /> </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                  <a href={`/products/productview/`+`${li.productId}`} className='products'><Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} />  </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                   <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} />  </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                   <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top" src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} />  </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='products-card'>
                                  <a href={`/products/productview/`+`${li.productId}`} className='products'> <Card.Img variant="top"  src={li.productImage || "https://cdn.dmart.in/images/products/KMUESLI0Yoga6xx300421_5_P.jpg"} />  </a>
                                <Card.Body>
                                    <Card.Text style={{ fontSize: '13px', color: "#373737" }}>
                                        {li.productName || "Yoga Bar Muesli - Almond + Quinoa Crunch"} : {li.productQuantity || "400 gms"}
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: '13px', color: "black" }}>
                                        DeMart Price : &nbsp;  <b> &#8377; {li.productPrice || "₹ 179"} </b>
                                    </Card.Text>
                                    <Card.Text >
                                        <Button className='cart-button' style={{ borderColor: "rgb(37, 165, 65)", backgroundColor: "rgb(37, 165, 65)", width: "100%" }} onClick={()=>{dispatch(addProductToCart({productId:li.productId,productName:li.productName,productCategory:li.productCategory,productQuantity:li.productQuantity,productPrice:li.productPrice,productImage:li.productImage}))}}> <BsCart2 style={{ transform: "scaleX(-1)", fontSize: "18px", marginTop: "-5px", fontWeight: "bolder" }} /> ADD TO CART </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardGroup> 
                            </Carousel.Item>
                        </Carousel>  </div>)}

                    </Card.Body>
                </Card>







<br/>






                <Carousel>
                    <Carousel.Item>
                        <img src={Slider1} text="First slide" style={{ width: "100%", height: "auto" }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Slider2} text="Second slide" style={{ width: "100%", height: "auto" }} className='slider' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={Slider3} text="Third slide" style={{ width: "100%", height: "auto" }} className='slider' />
                    </Carousel.Item>
                    {/* <Carousel.Item>
                        <img src={Banner4} text="Fourth slide" style={{ width: "100%", height: "auto" }} className='banner' />
                    </Carousel.Item> */}
                </Carousel>


<br/>

                                        {/*---LAst Section of banner in Homepage*/}

                <Card className="container-section">
                    <Card.Body className='container-body'><img src={section1} alt='image1' /></Card.Body>
                </Card>

 <br/>

</>}

            </div>
        </>
    );
}

export default Home;