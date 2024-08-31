import './navbar.css';

import { FaBars } from "react-icons/fa";

// import {Link} from 'react-router-dom';


function Navbar() {

    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }




    return (
        <>
            <div className="topnav" id="myTopnav">
                <div> <a href="/" className="active"> <FaBars style={{marginTop:"-4px"}}/> &nbsp; All Categories </a> </div>
                <div> <a href="/category/fruits"> Fruits & Vegetables </a> </div>
                <div> <a href="/category/groceries"> Groceries & Staples </a> </div>
                <div> <a href="/category/home"> Home & Hygiene </a> </div>
                <div> <a href="/category/bakery"> Bakery & Snacks </a> </div>
                <div> <a href="/category/dairy"> Dairy & Frozen Foods </a> </div>
                <div> <a href="/category/personalcare"> Personal Care </a> </div>
                <div> <a href="/category/health"> Health & Wellness </a> </div>
                <div> <a href="/category/hair"> Hair & Grooming </a> </div>
                <div> <a href="/category/babycare"> Baby Care </a> </div>
                <a href="#" className="icon" onClick={myFunction}>
                    <i className="fa fa-bars"></i>
                </a>
            </div>

        </>
    );
}

export default Navbar;