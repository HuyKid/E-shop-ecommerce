import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from "./components/Home";
import Blog from './components/Blog/Index';
import Detail from './components/Blog/Detail'
import Index from "./components/Member/Index";
import Update from "./components/Member/Update";
import MyProduct from "./components/Product/MyProduct";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";
import ProductDetail from "./components/Product/ProductDetail";
import Cart from "./components/Product/Cart";
import BT from "./components/Product/BT";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path= '/' element={<Home />} />
          <Route index path= '/productdetail/:id' element={<ProductDetail />} />
          <Route path= '/blog/list' element={<Blog />} />
          <Route path= '/blog/list/detail/:id' element={<Detail />} />
          <Route path= '/login' element={<Index />} />
          <Route path= '/account' element={<Update />} />
          <Route path= '/account/product/list' element={<MyProduct />} />
          <Route path= '/account/product/addproduct' element={<AddProduct />} />
          <Route path= '/account/product/list/editproduct/:id' element={<EditProduct />} />
          <Route path= '/cart' element={<Cart />} />
          <Route path= '/bt' element={<BT />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
