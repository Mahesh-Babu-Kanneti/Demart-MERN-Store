import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


//1.Sending productsCart to server via Axios call...
       
export const postCartProduct = async (payload) => {

    try {
        const response =  axios.post(
          `${process.env.REACT_APP_BASE_URL}/cart/add`, payload
        ).then(res => {toast.success(res.data);setTimeout(()=>{window.location.reload()},1500)}).catch(
          err=>toast.error(err.response.data)
          )
      } 
      catch (error) {
        toast.error(error);
      }

  }









const initialState = {
    cartValues : [],
    totalPrice : 0,
}




const CartReducer = createSlice({
    name: "CartReducer",
    initialState,
    reducers:{
        addProductToCart : (state, action) => {
                state.cartValues.push(action.payload)

                //Price total value...
                const priceArray = state.cartValues.map(obj => obj.productPrice)
                state.totalPrice = priceArray.reduce((a,b)=> a+b,0);



                //Axios...POST Sending to server requests

                            let payload = {
                                userId: localStorage.getItem('email'),
                                cartItems:[{
                                  productId:action.payload.productId,
                                  productName:action.payload.productName,
                                  productPrice:action.payload.productPrice,
                                  productImage:action.payload.productImage
                                }] ,
                                //cartCount: state.cartValues.length
                            }
                            console.log("mm",payload)

                            try {
                              if(payload.userId==null){
                                  toast.error("Please Sign-In to continue");
                                  setTimeout(()=>{window.location.reload()},1500);
                                  return;
                                  
                              }
                                const response =  axios.post(
                                  `${process.env.REACT_APP_BASE_URL}/cart/add`, payload
                                ).then(res => {toast.success(res.data);setTimeout(()=>{window.location.reload()},1500)}).catch(
                                  err=>toast.error(err.response.data))
                              } 
                              catch (error) {
                                toast.error(error);
                              }
                              





        },

        removeProductFromCart : (state, action) =>{
                const index = state.cartValues.findIndex(obj => obj.productName === action.payload.productName)
                if(index>-1){
                    state.cartValues.splice(index,1);   //particular product need to removed from cart...
                }
                


                //Price total value after removed product...
                const priceArray = state.cartValues.map(obj => obj.productPrice)
                state.totalPrice = priceArray.reduce((a,b)=> a+b,0);

        }
    }
})


export const {addProductToCart, removeProductFromCart} = CartReducer.actions;
export default CartReducer.reducer;