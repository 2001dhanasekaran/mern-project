import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

export default function Wishlist() {
    const [wishList, setWishList] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const fetchItems = () => {
        const storedItem = JSON.parse(localStorage.getItem("wishList")) || [];
        setWishList(storedItem);
    };

    const fetchCart = () => {
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCart(storedCart);
    };

    useEffect(() => {
        fetchItems();
        fetchCart();
        window.addEventListener("storage", () => {
            fetchItems();
            fetchCart();
        });
        return () =>
            window.removeEventListener("storage", () => {
                fetchItems();
                fetchCart();
            });
    }, []);

    const updateLocalStorage = (key, items) => {
        localStorage.setItem(key, JSON.stringify(items));
        window.dispatchEvent(new Event("storage"));
    };

    const handleDelete = (id) => {
        const updatedList = wishList.filter((item) => item._id !== id);
        setWishList(updatedList);
        updateLocalStorage("wishList", updatedList);
    };

    const addToCart = (item) => {
        const cartItems = [...cart];
        const itemExists = cartItems.find((cartItem) => cartItem._id === item._id);

        if (!itemExists) {
            cartItems.push({
                ...item,
                quantity: 1,
            });
            setCart(cartItems);
            updateLocalStorage("cartItems", cartItems);
            alert(`${item.productName} now added to the Cart`);
            navigate("/cart");
        } else {
            alert(`${item.productName} is already in the Cart!`);
            navigate("/cart");
        }
    };

    return (
        <div className="container bg-white mt-5 p-3 ">
            <Navbar />
            <h2 className="text-center mb-4">Your Wishlist</h2>
            {wishList.length === 0 ? (
                <div className="alert alert-warning text-center">Your Wishlist is empty</div>
            ) : (
                wishList.map((item, index) => (
                    <div
                        className="row border p-2 align-items-center mb-2 rounded shadow-sm"
                        key={item._id || index}
                    >
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

                        {/* Description */}
                        <div className="col-12 col-sm-3">
                            <p className="small text-muted">{item.description}</p>
                        </div>

                        {/* Buttons */}
                        <div className="col-6 col-sm-3 d-flex flex-column flex-sm-row gap-2 justify-content-center">
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
                                <i className="bi bi-trash"></i> Remove
                            </button>
                            <button className="btn btn-success btn-sm" onClick={() => addToCart(item)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
