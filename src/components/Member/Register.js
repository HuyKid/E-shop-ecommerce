import { useState } from "react";
import axios from "axios"

const arr = [
    {
        "id": 0,
        "name": "Member",
    },
    {
        "id": 1,
        "name": "Admin",
    }
]
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
}
function Chooses(){
    if(Object.keys(arr).length > 0){
        const listarr = arr.map((key) => {
            return (
                    <option value={key.id}>{key.name}</option>
            )
                            
        })
        return(
                listarr
        );
    }
}
function Register(props){
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        level:"",
        avatar:""
    })
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

        if(inputs.phone == ""){
            errorsSubmit.phone = "Vui lòng nhập số điện thoại";
            flag = false;
        }

        if(inputs.address == ""){
            errorsSubmit.address = "Vui lòng nhập địa chỉ";
            flag = false;
        }

        if(inputs.choose == ""){
            errorsSubmit.level = "Vui lòng chọn level";
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
            const data={
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                avatar: getAvatar,
                level:0
            }
            axios.post("http://localhost/laravel/laravel/public/api/register", data)
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
    
    return (  
        <div>
            <div class="col-sm-4">
                <div class="signup-form">
                    <h2>New User Signup!</h2>
                    {renderError()}
                    <form onSubmit={handelSubmit} enctype="multipart/form-data">
                        <input type="text" placeholder="Name" name="name" onChange={handleInput}/>
                        <input type="text" placeholder="Email" name="email" onChange={handleInput}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                        <input type="text" placeholder="Phone" name="phone" onChange={handleInput}/>
                        <input type="text" placeholder="Address" name="address" onChange={handleInput}/>
                        <input type="file" onChange={hanldeFile} accept=".png,.jpg,.jpeg" name="avatar"/>
                        <select name="level" onChange={handleInput}>
                            {Chooses()}
                        </select><br/>
                        <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );  
}
export default Register;