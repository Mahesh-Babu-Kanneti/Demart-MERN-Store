const express = require('express');
const cors = require('cors');

require("dotenv").config();

const PORT = process.env.PORT;

//mongoDB...
require('./db/connection');
const productSchema = require("./models/products_models");
const userSchema = require("./models/users_models");
const cartSchema = require("./models/cart_products");
const paymentSchema = require('./models/payment_model');



//auth...
const jwt = require('jsonwebtoken');


const auth = require('./auth');
const authorize = require('./authorize');


//TO Upload Images using MULTER...
// const multer = require('multer');


//middleware...
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));


//Razorpay...
const Razorpay = require('razorpay');




app.get('/', (req, res) => {
    res.send("hello world")
})




// Set up Multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); // Rename files to avoid collisions
//     },
//   });
  
//   const upload = multer({ storage: storage });




//   // Define a route for image upload
// app.post('/upload', upload.single('image'), (req, res) => {
//     // Handle the uploaded file
//     const file = req.body;
//     console.log(file)
//     if (!file) {
//       return res.status(400).send('No file uploaded.');
//     }
  
//     // Save the file details to the database or perform other actions as needed
//     // ...
  
//     res.send('File uploaded successfully.');
//   });


//Routes...

//--------------------------USERS---------------------------

//REGISTRATIOn of USERS....

app.post('/user/register', async(req,res)=>{
    try{

        let {userName, userEmail, userMobile, userProfile, userPassword, userConfirmpassword} = req.body;

        const exist = await userSchema.findOne({userMobile});
        const existEmail = await userSchema.findOne({userEmail:{$in:req.body.userEmail}});

        if(exist){
            return res.status(400).json({message:'Account is Already Registered!'})
        }
        else if(userMobile.length!==10){
            return res.status(400).json({message:'Mobile Number is Invalid'})
        }

        else if(userPassword !== userConfirmpassword){
            return res.status(403).json({message:'Password is Not Match'})
        }
        else if(existEmail){
            return res.status(403).json({message:'Email is Already Registered!'})
        }

        let newUser = new userSchema({
            userName, userEmail, userMobile, userProfile, userPassword, userConfirmpassword
        })

        newUser.save();
        return res.status(201).json({message:'Account is Registered Successfully. Please Login'})


    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error...")
    }
})



//USERS LOGIn WITH JWT AUTH...

app.post('/users/login', async(req,res)=>{
    try{
        let {userMobile, userPassword} = req.body;

        const exist = await userSchema.findOne({userMobile});

        if(!exist){
            return res.status(400).json({message:'User Not Exist. Please Register account!'})
        }

        else if(exist.userPassword !== userPassword){
            return res.status(403).json({message:'Incorrect Password. Please Enter Correct Password!'})
        }


        let payload={
            user:{
                id:exist.id
            }
        }


        //Send Data for User...


        jwt.sign(payload, process.env.JWT_TOKEN ,{expiresIn:360000000 },
        (err,token)=>{
            if(err) throw err;
            res.json({token:token, message:'Login Success'});
        })



    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

})




//All Users List for Admins Only...


app.get('/users/list',auth, authorize,async (req, res) => {
    try {

        const usersList = await userSchema.find();
        return res.json(usersList);

    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...');
    }
})



///User Data to fetch for Users....particular

app.get('/user/list',auth ,async (req, res) => {
    try {

        const userList = await userSchema.findOne({_id:req.user.id});
        return res.json(userList);

    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...');
    }
})










//----------------------------PRODUCTS------------------------------------------

//Adding of Products...
app.post('/products/add', async (req, res) => {

    try {

        const { productId, productName, productCategory, productQuantity, productPrice, productImage } = req.body;

        const exist = await productSchema.findOne({ productId });

        if (exist) {
            return res.status(400).send("Product is Already Exists");
        }

        else if (typeof (req.body.productId) !== "string") {
            return res.status(403).send("Enter Valid Product ID");
        }

        let newProduct = new productSchema({
            productId, productName, productCategory, productQuantity, productPrice, productImage
        });

        newProduct.save();
        return res.status(201).send("Added Product Successfully");


    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...');
    }

});




//All Products List...
const productRoute = require('./routes/route_products.js');
app.use(productRoute);





//Update products...

app.put('/product/update/:id', async (req, res) => {

    try {

        const { productId, productName, productCategory, productQuantity, productPrice, productImage } = req.body;

        const exist = await productSchema.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).send("Product Upadted Successfully");


    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...');
    }

});




//DELETE Products...

app.delete('/product/delete/:id', async (req, res) => {

    try {
        const deleteEmployees = await productSchema.findByIdAndDelete(req.params.id);
        return res.status(200).send('Product Deleted Successfully')
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...')
    }

})





//ADDING PRODUCTS TO CART.....

//Adding of Products to CART...
app.post('/cart/add', async (req, res) => {

    try {

        const { userId} = req.body;
        var productId,productName,productImage,productPrice;

        let cart = await cartSchema.findOne({userId});

        if(!userId){
            return res.status(400).send("Please Sign-In to add products");
        }
        // if(!cart){      later...
            cart = new cartSchema({
                userId,cartItems:[]
            });

            for(let i=0;i<req.body.cartItems.length;i++){
                productId = req.body.cartItems[i].productId;
                productName = req.body.cartItems[i].productName;
                productPrice = req.body.cartItems[i].productPrice;
                productQuantity = req.body.cartItems[i].productQuantity;
                productImage = req.body.cartItems[i].productImage;
            }



            cart.cartItems.push({productId,productName,productImage,productPrice});

            await cart.save();
 console.log(cart)
            return res.status(201).send("Added to Cart");



        // }



        // let newProduct = await new cartSchema({
        //     userId,cartTotalPrice, cartItems, cartCount
        // });

        // newProduct.save();
        // return res.status(201).send("Added to Cart");


    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...');
    }

});




//All CART Products List...


app.get('/cart/list', async (req, res) => {
    try {

        const cartList = await cartSchema.find();

        return res.json(cartList);

    }

    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...');
    }
})




//DELETE Products CART...

app.delete('/cart/delete/:id', async (req, res) => {

    try {
        const deleteCart = await cartSchema.findByIdAndDelete(req.params.id);
        return res.status(200).send('Removed from Cart')
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...')
    }

})



//------------------RAZORPAY --------------

const razorpay = new Razorpay({
    key_id: 'rzp_test_yOwunrXCu7jpbF',
    key_secret: 'tsnCDt2wDtfR6JaYfMJmoxVf'
})


app.post('/payment',auth, async (req, res) => {

    try {
        const options = {
            amount: req.body.amount * 100,
            currency : 'INR',
            receipt: 'receipt_order_1'
        }
        if(req.body.amount==null){
            return res.status(400).json({message: 'Something went wrong!'});
        }
        const createOrder = await razorpay.orders.create(options);
        return res.status(200).json({message: 'Order placed Successful',createOrder})
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...')
    }

})


                 //USERS-Orders placed Sucessfully after payments...

app.post('/payment/success',auth, async (req, res) => {

    const {orderId,paymentId,orderAmount,userId,transKey} = req.body;
// console.log(req.body)
    try {
        //let exist = await paymentSchema.findOne({userId});

        if(userId==null||userId==''){
            return res.status(400).send('User not Exist. Please Sign-in to continue');
        }
        else if(!(transKey||paymentId)||(transKey==''||paymentId=='')){
            return res.status(502).send('Payment Failed!');
        }else if(!(orderId||orderAmount)||(orderId==''||orderAmount=='')){
            return res.status(401).send('Something went wrong!');
        }

        let orderData = new paymentSchema({
            orderId,paymentId,orderAmount,userId,transKey
        })
              orderData.save();

                //Clear the USER-CART after success payment...
                    let emptyCart = await cartSchema.deleteMany({userId:userId});

            return res.status(201).send('Order Placed Successfully!');




    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Server Error...')
    }

})






app.listen(PORT, () => {
    console.log('Server is Running...')
})
