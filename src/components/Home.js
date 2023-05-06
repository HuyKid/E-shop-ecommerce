import {useContext, useEffect, useState } from "react";
import axios from "axios"
import{ Link } from "react-router-dom"
import { UserContext } from "./UserContext";

function Home() {
	const [getItem, setItem] = useState([]);
    const getItems = JSON.parse(localStorage.getItem('cart'))
	const [addToCart, setAddToCart] = useState({})
	const value = useContext(UserContext)

	useEffect(() => {
		axios.get('http://localhost/laravel/laravel/public/api/product/list')
		.then(response => {
			setItem(response.data.data.data)
		})
		.catch(function (error) {
			console.log(error);
		})
	},[])
	let count = 0
	let sumAllQty = 0
    
    function clickAddCart(e){
        count += 1
        if (getItems[e.target.id] > 0) {
            count = getItems[e.target.id] + 1
            getItems[e.target.id] = count
        }
        setAddToCart((state) => ({ ...state, [e.target.id]: count }))
    }
    const merge = {...getItems,...addToCart}
	localStorage.setItem('cart', JSON.stringify(merge))
	Object.keys(getItems).map((key, value) => {
		sumAllQty += getItems[key]
	})
	value.tinhTongQty(sumAllQty);
	
	function fetchData () {
		if (getItem.length > 0) {
			return getItem.map((value, key) => {
                const Image = JSON.parse(value.image)
				return(
					<div class="col-sm-4">
						<div class="product-image-wrapper">
							<div class="single-products">
								<div class="productinfo text-center">
									<img src={"http://localhost/laravel/laravel/public/upload/user/product/" + value.id_user + '/' + Image[0]} alt="" />
									<h2>${value.price}</h2>
									<p>{value.name}</p>
									<Link className="btn btn-default add-to-cart" to="/" id={value.id} >
                                        <i className="fa fa-shopping-cart" />
                                        Add to cart
                                    </Link>
								</div>
								<div class="product-overlay">
									<div class="overlay-content">
										<h2>${value.price}</h2>
										<p>{value.name}</p>
										<Link className="btn btn-default add-to-cart" to="/" id={value.id} onClick={clickAddCart}>
                                        	<i className="fa fa-shopping-cart" />Add to cart
                                    	</Link>
									</div>
								</div>
							</div>
							<div class="choose">
								<ul class="nav nav-pills nav-justified">
									<li><a href=""><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
									<li>
										<Link to={'/productdetail/'+ value.id }>
											<a href=""><i class="fa fa-plus-square"></i>More</a>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				)
			})
		}
	}
    return(
		<div class="col-sm-9 padding-right">
			<div class="features_items">
				<h2 class="title text-center">Features Items</h2>
				{fetchData()}
				<ul class="pagination">
					<li class="active"><a href="">1</a></li>
					<li><a href="">2</a></li>
					<li><a href="">3</a></li>
					<li><a href="">&raquo;</a></li>
				</ul>
			</div>
		</div>
    );
}
export default Home;