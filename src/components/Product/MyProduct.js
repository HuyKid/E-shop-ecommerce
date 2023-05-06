import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import{ Link } from "react-router-dom"

function MyProduct() {
	const navigate = useNavigate();
    const [items, setItems] = useState({})
    const getInfo = JSON.parse(localStorage.getItem('auth'))
    const accessToken = getInfo.success.token
    let config = {
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        }
    }
    useEffect(() => {
        axios.get("http://localhost/laravel/laravel/public/api/user/my-product", config)
        .then((res) => {
            console.log(res.data.data);
            setItems(res.data.data)
        })
    }, [])

    

    function btnClickDelete(e){
        axios.get("http://localhost/laravel/laravel/public/api/user/delete-product/" + e.target.value, config)
        .then((res) => {
            setItems(res.data.data)
        })
    }
    function addProduct(){
        navigate("/account/product/addproduct")
    }

    const renderData = () => {
        if (Object.keys(items).length > 0) {
            return Object.keys(items).map((key, value) => {
                const Image = JSON.parse(items[key].image)
                console.log(Image);
                return (
                    <tr key={key}>
                        <th scope="row">{items[key].id}</th>
                        <td>{items[key].name}</td>
                        <td>
                            <img
                                style={{ width: '50px' }}
                                src={"http://localhost/laravel/laravel/public/upload/user/product/" + items[key].id_user + '/' + Image[0]}
                            />
                        </td>
                        <td>{items[key].price}</td>
                        <td>
                            <Link to={"editproduct/"+ items[key].id}>
                                <button>Edit</button>
                            </Link>
						    {/* <a class="btn btn-primary" href="" value={items[key].id} onClick={btnClickDelete}>Delete</a> */}
                            <button value={items[key].id} onClick={btnClickDelete}>Delete</button>
                        </td>
                    </tr>
                )
            })
        }
    }

    return(
        <div className="col-md-8">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>{renderData()}</tbody>
            </table>
            {/* <button type="submit" class="btn btn-default" onClick={addProduct}>Add New</button> */}
			<a  class="btn btn-primary" href="" onClick={addProduct}>Add New</a>
        </div>
    )
}
export default MyProduct