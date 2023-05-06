import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ProductDetail(){
    let params = useParams();
	const [data, setData] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
		// console.log(params.id);
		axios.get('http://localhost/laravel/laravel/public/api/product/detail/'+params.id)
		.then(response => {
			console.log(response.data.data)
			setData(response.data.data);
		})
		.catch(function (error){
			console.log(error);
		})
	},[])
    function renderProductDetail(){
        // console.log(data.image);
        if(Object.keys(data).length > 0){
            const Image = JSON.parse(data.image)
            return(
                <div class="col-sm-9 padding-right">
                            <div class="product-details">
                                <div class="col-sm-5">
                                    <div class="view-product">
                                    <img src={"http://localhost/laravel/laravel/public/upload/user/product/" + data.id_user + '/' + Image[0]} alt="" />
                                    <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                                    <>
                                    <Button variant="primary" onClick={handleShow}>
                                        Launch demo modal
                                    </Button>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Modal heading</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Save Changes
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    </>    
                                    </div>
        
                                    {/* <div id="similar-product" class="carousel slide" data-ride="carousel">
                                        
        
                                            <div class="carousel-inner">
                                                <div class="item active">
                                                  <a href=""><img src="images/product-details/similar1.jpg" alt=""/></a>
                                                  <a href=""><img src="images/product-details/similar2.jpg" alt=""/></a>
                                                  <a href=""><img src="images/product-details/similar3.jpg" alt=""/></a>
                                                </div>
                                                <div class="item">
                                                  <a href=""><img src="images/product-details/similar1.jpg" alt=""/></a>
                                                  <a href=""><img src="images/product-details/similar2.jpg" alt=""/></a>
                                                  <a href=""><img src="images/product-details/similar3.jpg" alt=""/></a>
                                                </div>
                                                <div class="item">
                                                  <a href=""><img src="images/product-details/similar1.jpg" alt=""/></a>
                                                  <a href=""><img src="images/product-details/similar2.jpg" alt=""/></a>
                                                  <a href=""><img src="images/product-details/similar3.jpg" alt=""/></a>
                                                </div>
                                                
                                            </div>
        
        
                                          <a class="left item-control" href="#similar-product" data-slide="prev">
                                            <i class="fa fa-angle-left"></i>
                                          </a>
                                          <a class="right item-control" href="#similar-product" data-slide="next">
                                            <i class="fa fa-angle-right"></i>
                                          </a>
                                    </div> */}
        
                                </div>
                                <div class="col-sm-7">
                                    <div class="product-information">
                                        <img src="images/product-details/new.jpg" class="newarrival" alt="" />
                                        <h2>{data.name}</h2>
                                        <p>Web ID: 1089772</p>
                                        <img src="images/product-details/rating.png" alt="" />
                                        <span>
                                            <span>US ${data.price}</span>
                                            <label>Quantity:</label>
                                            <input type="text" value="3" />
                                            <button type="button" class="btn btn-fefault cart">
                                                <i class="fa fa-shopping-cart"></i>
                                                Add to cart
                                            </button>
                                        </span>
                                        <p><b>Availability:</b> In Stock</p>
                                        <p><b>Condition:</b> New</p>
                                        <p><b>Brand:</b> E-SHOPPER</p>
                                        <a href=""><img src="images/product-details/share.png" class="share img-responsive"  alt="" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
            )
        }
    }
    return renderProductDetail()
}
export default ProductDetail;