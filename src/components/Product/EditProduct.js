import axios from "axios"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

function EditProduct() {
    let params = useParams()

    const getInfo = JSON.parse(localStorage.getItem('auth'))
        const accessToken = getInfo.success.token
        let config = {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json'
            }
        }

        
        const [inputs, setInputs] = useState({
            name:"",
            price:"",
            category: "",
            brand: "",
            sale: 0,
            status: 0,
            company:"",
            image: "",
            detail: "",
        })
    
    useEffect(() => {
        axios.get('http://localhost/laravel/laravel/public/api/user/product/' + params.id, config).then((res) => {
            console.log(res.data.data)
            setInputs((state) => ({
                ...state,
                id_user: res.data.data.id_user,
                name: res.data.data.name,
                price: res.data.data.price,
                category: res.data.data.id_category,
                brand: res.data.data.id_brand,
                status: res.data.data.status,
                sale: res.data.data.sale,
                company : res.data.data.company_profile,
                image: res.data.data.image,
                detail: res.data.data.detail
            }))
            // console.log(inputs.image);
        })
    }, [])
    
    const [category, setCategory] = useState({})
    const [brand, setBrand] = useState({})
    const [sale, setSale] = useState('0')
    const [img, setImg] = useState({
        avatarCheckBox: []
    })


    const handleCheckInput = (e) => {
        if(e.target.checked){
            img.avatarCheckBox.push(e.target.value)
        }else{
            img.avatarCheckBox.splice(e.target.value, 1)
        }
        console.log(img);
    }

    useEffect(() => {
        axios.get('http://localhost/laravel/laravel/public/api/category-brand').then((res) => {
            setCategory(res.data.category)
            setBrand(res.data.brand)
        })
    }, [])
    const renderCategory = () => {
        if (Object.keys(category).length > 0) {
            return Object.keys(category).map((key, value) => {
                return (
                    <option value={category[key].id} key={key}>
                        {category[key].category}
                    </option>
                )
            })
        }
    }
    const renderBrand = () => {
        if (Object.keys(brand).length > 0) {
            return Object.keys(brand).map((key, value) => {
                return (
                    <option value={brand[key].id} key={key}>
                        {brand[key].brand}
                    </option>
                )
            })
        }
    }

    function renderImage(){
        if (inputs.image.length > 0) {
            return inputs.image.map((index, value) => {
                console.log(inputs.image);
                return(
                    <li style={{float: "left"}}>
                    <img
                        style={{ width: '100px', height: '100px', marginRight: '20px', marginBottom:'20px' }}
                        src={"http://localhost/laravel/laravel/public/upload/user/product/" + inputs.id_user + '/' + index}
                    />
                    <input type="checkbox" value={index} onChange={handleCheckInput} />
                    </li>
                )
            })
        }
    }

    const handleSale = (e) => {
        setSale(e.target.value)
    }
    const handleInput = (e) => {
        const nameInput = e.target.name
        const value = e.target.value
        setInputs((state) => ({ ...state, [nameInput]: value }))
    }
    const showInputSale = () => {
        const showSale = document.getElementById('sale-show')
        if (sale == 1) {
            showSale.style.display = 'block'
        } else {
            showSale.style.display = 'none'
        }
    }
    const [getFile, setFile] = useState({
        file: []
    })

    function hanldeFile(e){
        const file = e.target.files
        if (file.length > 3) {
            alert('Không được chọn quá 3 hình ảnh')
            e.target.value = ''
        } else {
            setFile(file)
        }
    }

    const [errors, setErrors] = useState({})
    
    function handelSubmit(e){
        e.preventDefault();
        let errorsSubmit ={};
        let flag = true;

        if(inputs.name == ""){
            errorsSubmit.name = "Vui lòng nhập tên";
            flag = false;
        }
    
        if(inputs.price == ""){
            errorsSubmit.price = "Vui lòng nhập giá tiền";
            flag = false;
        }

        if(inputs.category == ""){
            errorsSubmit.category = "Vui lòng nhập category";
            flag = false;
        }

        if(inputs.brand == ""){
            errorsSubmit.brand = "Vui lòng nhập brand";
            flag = false;
        }

        if(inputs.company == ""){
            errorsSubmit.company = "Vui lòng nhập company";
            flag = false;
        }

        if(getFile.file == ""){
            errorsSubmit.image ="Vui Lòng chọn hình ảnh";
            flag = false;
        }
        else{
            console.log(getFile);
            Object.keys(getFile).map((key, value) => {
                let size = getFile[key].size
                let f1 = getFile[key].name
                let f2 = String(f1).split(".");
                let f3 = f2[f2.length - 1]
                const fileType = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"]
                if(!fileType.includes(f3)){
                    errorsSubmit.image = "Vui Lòng chọn đúng định dạng hình ảnh";
                    flag = false;
                }else{
                    if(size > 1024*1024){
                        errorsSubmit.image = "Vui Lòng chọn hình ảnh size < 1MB";
                        flag = false;
                    }
                }
            })
        }

        if(inputs.detail == ""){
            errorsSubmit.detail = "Vui lòng nhập chi tiết";
            flag = false;
        }

        // const getInfo = JSON.parse(localStorage.getItem('auth'))
        // const accessToken = getInfo.success.token
        // let config = {
        //     headers: {
        //         Authorization: 'Bearer ' + accessToken,
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         Accept: 'application/json'
        //     }
        // }

        if(!flag){
            setErrors(errorsSubmit);
        }else{
            setErrors({})
            const formData = new FormData()
                formData.append('name', inputs.name)
                formData.append('price', inputs.price)
                formData.append('category', inputs.category)
                formData.append('brand', inputs.brand)
                formData.append('company', inputs.company)
                formData.append('detail', inputs.detail)
                formData.append('status', inputs.status)
                formData.append('sale', inputs.sale)
                Object.keys(getFile).map((item, i) => {
                    // console.log(getFile[item].name)
                    formData.append('file[]', getFile[item])
                })
                console.log(img.avatarCheckBox);
                img.avatarCheckBox.map((index, key) => {
                    formData.append('avatarCheckBox[]', img.avatarCheckBox[key])
                })

            axios.post("http://localhost/laravel/laravel/public/api/user/edit-product/"+params.id, formData, config)
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
        <div>
                <div class="col-sm-8">
					<div class="signup-form">
						<h2>New User Signup!</h2>
                        {renderError()}
						<form onSubmit={handelSubmit} enctype="multipart/form-data">
                            <input type="text" value={inputs.name} name="name" onChange={handleInput}/>
                            <input type="text" value={inputs.price} name="price" onChange={handleInput}/>

                            <select onChange={handleInput} value={inputs.category} name="category">
                                <option>Please choose category</option>
                                {renderCategory()}
                            </select>

                            <select onChange={handleInput} value={inputs.brand} name="brand">
                                <option>Please choose brand</option>
                                {renderBrand()}
                            </select>

                            <select name="status" value={inputs.status}
                                onChange={(e) => {
                                    handleInput(e)
                                    handleSale(e)
                                    }
                                }
                                onClick={showInputSale}>
                                <option value="0">Not Sale</option>
                                <option value="1">Sale</option>
                            </select>

                            <div id="sale-show" style={{ display: 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <input
                                        id="sale_off"
                                        type="text"
                                        className="form-control "
                                        name="sale"
                                        placeholder="0"
                                        style={{ width: '30%' }}
                                        value={inputs.sale}
                                        onChange={handleInput}
                                    />
                                    <span style={{ marginLeft: '5px' }}>%</span>
                                </div>
                            </div>

                            <input type="text" value={inputs.company} name="company" onChange={handleInput}/>
							<input multiple type="file" onChange={hanldeFile} accept=".png,.jpg,.jpeg" name="image"/>
                            <ul>
                                {renderImage()}
                            </ul>
                            <input type="text" value={inputs.detail} name="detail" onChange={handleInput}/>
							<button type="submit" className="btn btn-default">Add Product</button>
						</form>
					</div>
				</div>
            </div>
    )
}
export default EditProduct