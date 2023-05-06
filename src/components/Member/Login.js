import { useEffect, useState } from "react";
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";

function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}

function Login(props){
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email:"",
        password:"",
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
    
        if(inputs.email == ""){
            errorsSubmit.email = "Vui lòng nhập email";
            flag = false;
        }else{
            if( !validateEmail(inputs.email)) {
                errorsSubmit.email = "Vui lòng nhập đúng định dạng email";
            }
        }

        if(inputs.password == ""){
            errorsSubmit.password = "Vui lòng nhập password";
            flag = false;
        }

        if(!flag){
            setErrors(errorsSubmit);
        }else{
            setErrors({})
            const data={
                email: inputs.email,
                password: inputs.password,
                level:0
            }
            axios.post("http://localhost/laravel/laravel/public/api/login", data)
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    setErrors(res.data.errors);
    
                }else{
                    alert("Đăng nhập thành công")
                    var check={}
                    check['login'] = true;
                    localStorage.setItem('check', JSON.stringify(check));
                    localStorage.setItem('auth', JSON.stringify(res.data));
                    navigate('/')
                }
            })
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
        <div class="col-sm-4">
            <div class="login-form">
                <h2>Login to your account</h2>
                {renderError()}
                <form onSubmit={handelSubmit}>
                    <input type="text" placeholder="Email" name="email" onChange={handleInput}/>
					<input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                    <span>
                        <input type="checkbox" class="checkbox"/> 
                            Keep me signed in
                    </span>
                    <button type="submit" class="btn btn-default">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;