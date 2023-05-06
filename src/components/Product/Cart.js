import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'

function Cart(){
    const getCart = JSON.parse(localStorage.getItem('cart'))
    const [data, setData] = useState({})
	const value = useContext(UserContext)
    let sumAllQty = 0

    useEffect(() => {
        axios
            .post('http://localhost/laravel/laravel/public/api/product/cart', getCart)
            .then((res) => {
                if (res.data) {
                    setData(res.data.data)
                } else {
                    alert(res.data.error)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    function upQtyClick(e){
        let getId= e.target.name;
        Object.keys(getCart).map((key, value) => {
            if (key === getId) {
                getCart[key] = getCart[key] + 1
                localStorage.setItem('cart', JSON.stringify(getCart))
            }
            sumAllQty += getCart[key]
        })
        // copy data ra 1 cai moi
        let newData =[...data];
        Object.keys(newData).map((key2, value2) => {
            if(newData[key2].id == getId){
                newData[key2].qty += 1
            }
        })
        // console.log(newData);
        setData(newData)
        value.tinhTongQty(sumAllQty);
    }


    function downQtyClick(e){
        let getId= e.target.name;
        Object.keys(getCart).map((key, value) => {
            if (key === getId) {
                getCart[key] = getCart[key] - 1
                if(getCart[key]>0){
                    localStorage.setItem('cart', JSON.stringify(getCart))
                }else{
                    delete getCart[getId]
                    document.getElementById(getId).closest('.cart_id').remove()
                    localStorage.setItem('cart', JSON.stringify(getCart))
                }
            }
        })
        let newData =[...data];
        Object.keys(newData).map((key2, value2) => {
            if(newData[key2].id == getId){
                newData[key2].qty -= 1
            }
        })
        setData(newData)
        Object.keys(getCart).map((key3, value3) => {
            sumAllQty += getCart[key3]
        })
        // console.log(newData);
        value.tinhTongQty(sumAllQty);
    }
    function deleteClick(e){
        Object.keys(getCart).map((key, value) => {
            // console.log(e.target.name);
            if (key === e.target.name) {
                delete getCart[e.target.name]
                document.getElementById(e.target.name).closest('.cart_id').remove()
                // console.log(getCart[key]);
            }
            // localStorage.setItem('cart', JSON.stringify(getCart))
            // sumAllQty += getCart[key]
            // console.log(sumAllQty);
        })
        localStorage.setItem('cart', JSON.stringify(getCart))
        Object.keys(getCart).map((key2, value2) => {
            sumAllQty += getCart[key2]
        })
        console.log(sumAllQty);
        value.tinhTongQty(sumAllQty);
    }

    // console.log(data)
    // console.log(getCart)
    function renderData(){
        if (Object.keys(data).length > 0) {
            return Object.keys(data).map((key, value) => {
                let sum = data[key].price * data[key].qty
                const Image = JSON.parse(data[key].image)
                return (

                                <tr className='cart_id'>
                                    <td className="cart_product">
                                        <Link to>
                                            <img
                                                style={{ width: '100px', height: '100px'}}
                                                alt=""
                                                src={'http://localhost/laravel/laravel/public/upload/user/product/' +data[key].id_user +'/' +Image[0]}
                                            />
                                        </Link>
                                    </td>
                                    <td className="cart_description">
                                        <h4>
                                            <Link to={"/productdetail/"+data[key].id}>{data[key].name}</Link>
                                        </h4>
                                        <p>Web ID:proc0</p>
                                    </td>
                                    <td className="cart_price">
                                        <p>{data[key].price}</p>
                                    </td>
                                    <td className="cart_quantity">
                                        <div className="cart_quantity_button">
                                            <Link className="cart_quantity_down" name={data[key].id} onClick={downQtyClick}>
                                                -
                                            </Link>
                                            <input
                                                className="cart_quantity_input"
                                                type="text"
                                                id={data[key].id}
                                                value={data[key].qty}
                                                name="quantity"
                                                autoComplete="off"
                                                size={2}
                                            />
                                            <Link className="cart_quantity_up" name={data[key].id} onClick={upQtyClick}>
                                                +
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="cart_total">
                                        {/* <p className="cart_total_price">${data[key].price}</p> */}
                                        <p className="cart_total_price">${sum}</p>
                                    </td>
                                    <td >
                                        <div className="cart_delete">
                                            <Link className="cart_quantity_delete" name={data[key].id} onClick={deleteClick}>
                                                X
                                            </Link>
                                        </div>
                                    </td>
                                </tr>

                )
            })
        }
    }
    return (
        <section id="cart_items">
            <div className="container">
            <table className="col-md-9 table-responsive cart_info">
                <thead>
                    <tr className="cart_menu">
                        <td className="image">Item</td>
                        <td className="description" />
                        <td className="price">Price</td>
                        <td className="quantity">Quantity</td>
                        <td className="total">Total</td>
                        <td />
                    </tr>
                </thead>
            {renderData()}
            </table>
            </div>
        </section>
    )
}

export default Cart
