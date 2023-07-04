import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom'

export default function Card(props) {

    let dispatch = useDispatchCart();
    let options = props.options;


    let data = useCart();
    let priceRef = useRef();
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleAddToCart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }


        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {

                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return
                // await console.log(data);
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })


    }

    let finalPrice = qty * parseInt(options[size]);



    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div><div><div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'fill' }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                {/* <p className="card-text">{props.foodDes}</p> */}

                <div className='container w-100'>
                    <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>

                    <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => {
                            return <option key={data} value={data}>{data}</option>
                        })}
                    </select>

                    <div className='d-inline h-100 fd-5'>
                        {finalPrice}/-
                    </div>

                </div>

            </div>
            <hr />


            <button className={'btn btn-success justify-center '} onClick={handleAddToCart}>Add to cart</button>

        </div>
        </div>
        </div>
    )
}