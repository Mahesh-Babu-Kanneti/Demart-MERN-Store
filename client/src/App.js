
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//Import from Components...


import Dashboard from './Components/Home/home';
import CategoryFruits from './Components/Categories/category_fruits';
import CategoryGroceries from './Components/Categories/category_groceries';
import CategoryHome from './Components/Categories/category_home';
import CategoryBakery from './Components/Categories/category_bakery';
import CategoryDairy from './Components/Categories/category_dairy';
import CategoryPersonal from './Components/Categories/category_personal';
import CategoryHealth from './Components/Categories/category_health';
import CategoryHair from './Components/Categories/category_hair';
import CategoryBaby from './Components/Categories/category_baby';

import ProductView from './Components/product_preview';
import MyCart from './Components/mycart_page';
import Payment from './Razorpay/Payment';




import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';



function App() {

  return (
    <div>

                      {/*---Header----*/}
                              <Header />

                  {/*---Body of Website----*/}
      {/* <BrowserRouter> */}
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/category/fruits' element={<CategoryFruits />} />
          <Route path='/category/groceries' element={<CategoryGroceries />} />
          <Route path='/category/home' element={<CategoryHome />} />
          <Route path='/category/bakery' element={<CategoryBakery />} />
          <Route path='/category/dairy' element={<CategoryDairy />} />
          <Route path='/category/personalcare' element={<CategoryPersonal />} />
          <Route path='/category/health' element={<CategoryHealth />} />
          <Route path='/category/hair' element={<CategoryHair />} />
          <Route path='/category/babycare' element={<CategoryBaby />} />
          <Route path="/products/productview/:id" element={<ProductView />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      {/* </BrowserRouter> */}


                   {/*---Footer----*/}

          <Footer />

    </div>
  );
}

export default App;
