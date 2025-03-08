import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchItems = () => {
            const storedItem = JSON.parse(localStorage.getItem("cartItems")) || [];
            console.log("Retrieved from LocalStorage:", storedItem);
            setCartItems(storedItem);
        };
        fetchItems();
        window.addEventListener("storage", fetchItems);

        return () => window.removeEventListener("storage", fetchItems);
    }, []);

    const updateLocalStorage = (items) => {
        localStorage.setItem("cartItems", JSON.stringify(items));
    };

    const handleDelete = (id) => {
        const updatedCart = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleQuantity = (id, qtyValue) => {
        const updatedCart = cartItems.map((item) => {
            if (item._id === id) {
                const newQuantity = item.quantity + qtyValue;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const deliveryCharges = 30;
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container bg-white mt-4 p-3">
            <h2 className="text-center mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
                <div className="alert alert-warning text-center">Your Cart is empty</div>
            ) : (
                cartItems.map((item) => (
                    <div className="row border shadow rounded-4 p-2 align-items-center mb-2" key={item._id}>
                        {/* Image */}
                        <div className="col-4 col-sm-2 text-center">
                            {item.productImg ? (
                                <img
                                    src={item.productImg}
                                    alt={item.productName}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "80px" }}
                                />
                            ) : (
                                "No Image"
                            )}
                        </div>

                        {/* Product Name & Price */}
                        <div className="col-8 col-sm-4">
                            <strong>{item.productName}</strong>
                            <p className="m-0 text-muted">Price: Rs. {item.price}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="col-6 col-sm-3 d-flex align-items-center justify-content-center">
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleQuantity(item._id, -1)}
                                disabled={item.quantity === 1}
                            >
                                -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button className="btn btn-secondary btn-sm" onClick={() => handleQuantity(item._id, 1)}>
                                +
                            </button>
                        </div>

                        {/* Remove & Total Price */}
                        <div className="col-6 col-sm-3 d-flex justify-content-between align-items-center">
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
                                <i className="bi bi-trash"></i>
                            </button>
                            <p className="m-0 fw-bold">Rs. {item.price * item.quantity}</p>
                        </div>
                    </div>
                ))
            )}

            {/* Summary Section */}
            <div className="border-top pt-3 mt-3">
                <div className="d-flex justify-content-between">
                    <span>Delivery Charges:</span>
                    <strong>Rs. {deliveryCharges}</strong>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Discount:</span>
                    <strong>Rs. -0</strong>
                </div>
                <div className="d-flex justify-content-between">
                    <h5>Total:</h5>
                    <h5>Rs. {totalPrice + deliveryCharges}</h5>
                </div>
            </div>
            <div>
                <form className="text-start">
                    <label htmlFor="coupon" className="form-label">Do you have any Coupon ?</label>
                    <input type="text" className="form-control" id="coupon" placeholder="Enter coupon code here..." />
                </form>
            </div>
            
            <Link to='/home'>Add some more Products</Link>

            {/* Checkout Button */}
            <div className="text-center mt-3">
                <button className="btn btn-success w-100">Proceed to Checkout</button>
            </div>
        </div>
    );
}
