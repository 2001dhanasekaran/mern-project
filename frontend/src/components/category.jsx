import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Category({ category }) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4);
    const navigate = useNavigate();

    // Fetch Products from API
    useEffect(() => {
        if (!category) return;
        axios.get(`${process.env.BACKEND_URL}/api/products?category=${encodeURIComponent(category)}`)
            .then(response => {
                console.log("Fetched Products:", response.data);
                const uniqueProducts = Array.from(new Map(response.data.map(product => [product._id, product])).values());
                setFilteredProducts(uniqueProducts);
                setCurrentPage(1);
            })
            .catch(error => console.error("Error fetching products", error));
    }, [category]);

    // Fetch Wishlist from Local Storage
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem("wishList")) || [];
        setWishlist(savedWishlist);
    }, []);

    // Add to Cart Function
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existingProductIndex = cart.findIndex(item => item._id === product._id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1,
                productImg: product.productImg.startsWith("http") ? product.productImg : `${process.env.BACKEND_URL}${product.productImg}`
            });
        }

        localStorage.setItem("cartItems", JSON.stringify(cart));
        alert(`${product.productName} added to the Cart!`);
        navigate('/cart');
    };

    // Toggle Wishlist Function
    const toggleWishlist = (product) => {
        let list = JSON.parse(localStorage.getItem('wishList')) || [];
        const exists = list.some(item => item._id === product._id);

        if (exists) {
            list = list.filter(item => item._id !== product._id);
            alert(`${product.productName} removed from Wishlist`);
        } else {
            list.push({
                ...product,
                productImg: product.productImg.startsWith("http") ? product.productImg : `${process.env.BACKEND_URL}${product.productImg}`
            });
            alert(`${product.productName} added to Wishlist`);
        }

        localStorage.setItem('wishList', JSON.stringify(list));
        setWishlist([...list]);
    };

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="my-4" >
            <h2 className="my-4">Products in "{category}"</h2>
            <div className="d-flex gap-3 justify-content-center">
                {currentProducts.map((product) => {
                    const isWishlisted = wishlist.some(item => item._id === product._id);

                    return (
                        <div key={product._id} className='shadow rounded-4'>
                            <div className='card product-card border-0'>
                                <img
                                    src={product.productImg.startsWith("http") ? product.productImg : `${process.env.BACKEND_URL}${product.productImg}`}
                                    className='card-img-top'
                                    alt={product.productName}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p className="card-text"><strong>Rs. {product.price}</strong></p>
                                </div>
                                <div className="hover-overlay d-flex flex-column">
                                    <p className="px-3 text-center">{product.description}</p>
                                    <div className='d-flex justify-content-center mt-auto pb-3'>
                                        <button className='btn mx-2 cart btn-outline-success' onClick={() => addToCart(product)}>
                                            <i className="bi bi-cart"></i> Add
                                        </button>
                                        <button onClick={() => toggleWishlist(product)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                                            <i className={`${isWishlisted ? "bi-heart-fill text-danger" : "bi-heart text-secondary"}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-outline-primary mx-2 rounded-circle" onClick={prevPage} disabled={currentPage === 1}>
                    <i className="bi bi-caret-left-fill"></i>                
                </button>
                <span className="mx-3 align-self-center">
                    Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}
                </span>
                <button className="btn btn-outline-primary mx-2 rounded-circle" onClick={nextPage} disabled={currentPage >= Math.ceil(filteredProducts.length / productsPerPage)}>
                    <i className="bi bi-caret-right-fill"></i>
                </button>
            </div>                          
        </div>
    );
}
