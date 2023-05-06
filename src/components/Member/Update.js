import { useEffect, useState } from "react";
import axios from "axios"

function Update(){
    const [inputs, setInputs] = useState({
        id: "",
        token: "",
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        avatar:""
    })

    useEffect(() => {
        const getInfo = JSON.parse(localStorage.getItem('auth'))
        console.log(getInfo.Auth.id);
        setInputs(state => ({
            ...state,
            id: getInfo.Auth.id,
            token: getInfo.success.token,
            name: getInfo.Auth.name,
            email: getInfo.Auth.email,
            password: '',
            phone: getInfo.Auth.phone,
            address: getInfo.Auth.address
        }))
    }, [])
    
    const [errors, setErrors] = useState({})
    const [getFile, setFile] = useState("")
    const [getAvatar, setAvatar] = useState("")

    function hanldeFile(e){
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            setFile(file);
        };
        reader.readAsDataURL(file[0])
    }

    const handleInput = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;

        setInputs(state => ({...state,[nameInput]:valueInput}))
        
    }
    function handelSubmit(e){
        e.preventDefault();
        let errorsSubmit ={};
        let flag = true;

        if(inputs.name == ""){
            errorsSubmit.name = "Vui lòng nhập tên";
            flag = false;
        }

        if(inputs.phone == ""){
            errorsSubmit.phone = "Vui lòng nhập số điện thoại";
            flag = false;
        }

        if(inputs.address == ""){
            errorsSubmit.address = "Vui lòng nhập địa chỉ";
            flag = false;
        }

        if(getFile == ""){
            errorsSubmit.avatar ="Vui Lòng chọn hình ảnh";
        }
        else{
            let size = getFile[0].size
            let f1 = getFile[0].name
            let f2 = String(f1).split(".");
            let f3 = f2[f2.length - 1]
            if(size > 1024*1024){
                errorsSubmit.avatar = "Vui Lòng chọn hình ảnh size < 1MB";
                flag = false;
            }else{
                const fileType = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"]
                if(!fileType.includes(f3)){
                    errorsSubmit.avatar = "Vui Lòng chọn đúng định dạng hình ảnh";
                    flag = false;
                }
            }
        }

        if(!flag){
            setErrors(errorsSubmit);
        }else{
            setErrors({})
            let accessToken = inputs.token;
            let config = { 
                headers: { 
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
            };
            const data={
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                avatar: getAvatar,
                level:0
            }
            axios.post("http://localhost/laravel/laravel/public/api/user/update/"+inputs.id, data, config)
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    setErrors(res.data.errors);
    
                }else{
                    // thanh cong
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
        <div class="col-sm-6">
            <div class="login-form">
                <h2>User Update</h2>
                {renderError()}
					<form onSubmit={handelSubmit} enctype="multipart/form-data">
                        <input type="text" value={inputs.name} name="name" onChange={handleInput}/>
                        <input readOnly type="text" value={inputs.email} name="email" onChange={handleInput}/>
						<input type="password" value={inputs.password} name="password" onChange={handleInput}/>
                        <input type="text" value={inputs.phone} name="phone" onChange={handleInput}/>
                        <input type="text" value={inputs.address} name="address" onChange={handleInput}/>
						<input type="file" onChange={hanldeFile} accept=".png,.jpg,.jpeg" name="avatar"/>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Update;