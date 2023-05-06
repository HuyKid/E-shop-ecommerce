import { useEffect, useState } from "react";
import axios from "axios"
import {useParams, Navigate, useNavigate } from "react-router-dom";
import Detail from "./Detail";

function Comment(props) {
        const navigate = useNavigate();
        let params = useParams();
        
        const [inputs, setInputs] = useState({
            message:""
        })
        const [errors, setErrors] = useState({})
    
        const handleInput = (e) => {
            const nameInput = e.target.name;
            const valueInput = e.target.value;
    
            setInputs(state => ({...state,[nameInput]:valueInput}))
            
        }
    
        function handelSubmit(e){
            e.preventDefault();
            let errorsSubmit ={};
            let flag = true;
            var obj = localStorage.getItem('check');
            if(obj){
                obj = JSON.parse(obj);
                const userData = JSON.parse(localStorage.getItem("auth"))
                let url = 'http://localhost/laravel/laravel/public/api/blog/comment/' + params.id
                let accessToken = userData.success.token;
                let config = { 
                    headers: { 
                        'Authorization': 'Bearer '+ accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                        } 
                };	

                if(obj.login == true){
                    if(inputs.message == ""){
                        errorsSubmit.message = "Vui lòng nhập bình luận";
                        setErrors(errorsSubmit);
                        
                    } else{
                        setErrors({})
                        if(inputs.message){
                            const formData = new FormData();
                                formData.append('id_blog', params.id);
                                formData.append('id_user', userData.Auth.id);
                                formData.append('id_comment', props.idRely ? props.idRely : 0);
                                formData.append('comment', inputs.message);
                                formData.append('image_user', userData.Auth.avatar);
                                formData.append('name_user', userData.Auth.name);
                            axios.post(url, formData, config)
                            .then(res => {
                                console.log(res);
                                if (res.data.errors) {
                                    setErrors(res.data.errors);
                                }else{
                                    props.getCmt(res.data.data)
                                }
                            })
                        }
                    }
                }
            }else{
                alert("Vui lòng đăng nhập")
                navigate('/login')
            }
        }
        function renderError(){
            if(Object.keys(errors).length > 0){
                return Object.keys(errors).map((key, index) => {
                    return(
                        <li key={index}>{errors[key]}</li>
                    )
                })
            }
        }

    return(
        <div class="replay-box">
				<div class="row">
					<div class="col-sm-12">
						<h2 id="ms" >Leave a replay</h2>
						<div class="text-area">
							<div class="blank-arrow">
								<label>Your Name</label>
							</div>
							<span>*</span>
                            <form onSubmit={handelSubmit}>
                                <textarea name="message" rows="11" onChange={handleInput}></textarea>
                                {renderError()}
                                <button class="btn btn-primary">post comment</button>
                            </form>
						</div>
					</div>
			    </div>
		</div>
    )
}
export default Comment