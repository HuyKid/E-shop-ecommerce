import React, {useState, useEffect} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import StarRatings from 'react-star-ratings';

function Rate(){
    const [getItem, setItem] = useState([]);
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState({})
    let params = useParams();
    let url = 'http://localhost/laravel/laravel/public/api/blog/rate/' + params.id
    useEffect(() => {
        axios.get(url)
        .then(response => {
            let data = response.data.data;
            if(data.length){
                let sum = 0;
                data.map((value, key) => {
                    sum = sum + value.rate;
                })
                sum = sum / (data.length)
                setRating(sum)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    },[])
        
    function changeRating( newRating, name ){
        setRating(newRating)
        const userData = JSON.parse(localStorage.getItem("auth"))
            let accessToken = userData.success.token;
            let config = { 
                headers: { 
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
            };	
        var obj = localStorage.getItem('check');
        if(obj){
            obj = JSON.parse(obj);
            if(obj.login == true){
                const data={
                    user_id: userData.Auth.id,
                    blog_id: params.id,
                    rate: newRating
                }
                axios.post(url, data, config)
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    }else{
                        // thanh cong
                    }
                })
            }
        }else{
            setErrors({})
            alert("Vui lòng đăng nhập")
        }
    }

    return(
        <div class="rating-area">
 			<ul class="ratings">
 				<li class="rate-this">Rate this item:</li>
                <StarRatings
                    rating={rating}
                    starRatedColor="orange"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                />
            </ul>
        </div>
    );
}
export default Rate;












// function Rate(){
//     return(
//         <div class="rating-area">
// 				<ul class="ratings">
// 					<li class="rate-this">Rate this item:</li>
// 					<li>
// 						<i class="fa fa-star color"></i>
// 						<i class="fa fa-star color"></i>
// 						<i class="fa fa-star color"></i>
// 						<i class="fa fa-star"></i>
// 						<i class="fa fa-star"></i>
// 					</li>
// 					<li class="color">(6 votes)</li>
// 				</ul>
// 				<ul class="tag">
// 					<li>TAG:</li>
// 					<li><a class="color" href="">Pink <span>/</span></a></li>
// 					<li><a class="color" href="">T-Shirt <span>/</span></a></li>
// 					<li><a class="color" href="">Girls</a></li>
// 				</ul>
// 			</div>
//     )
// }
// export default Rate;

