import { useEffect, useState } from "react";
import axios from "axios";
import Addproduct from "./addproducts";

export default function Admin(){
    const [message, setMessage]= useState({color:'', text:''});
    const [products, setProducts]= useState([]);
    const [editingProduct, setEditingProduct]= useState(null);
    const [showAddForm, setShowAddForm]= useState(false);

    
    const fetchProducts= async()=>{
        try{
            const response= await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
            setProducts(response.data);
        }catch(error){
            setMessage({color:'danger',text:'Error fetching product'+error.message});
        }
    };
    
    useEffect(()=>{
    fetchProducts();
    },[]);

    const handleLogout = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/logout`, {}, { withCredentials: true });
        window.location.href = '/login';
    }

    const onSave= async (id, updatedProduct)=>{
        try{
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/products/update_product/${id}`, updatedProduct, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            
            fetchProducts();
            setEditingProduct(null);
        }catch(error){
            setMessage({color:'danger', text:'Error updating product'+error.message})
        }
    }

    const handleDelete= async(id)=>{
        if(window.confirm('Are you sure want to delete this product ?')){
            try{
                await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/delete_product/${id}`);
                setProducts(products.filter((product)=>product._id !==id));
                fetchProducts();
            }catch(error){
                setMessage({color:'danger',text:'Error deleting product'+error.message});
            }
        }
    };

    return(
        <div className="container">
            <div className="d-flex align-items-center">
                <h2 className="text-center">Product List</h2>
                <div className="my-2 my-lg-0 ms-auto">
                    <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Add Products</button>
                    <button className="btn btn-outline-danger ms-3" title='Logout' onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </div>
            {message.text && <div className={`alert alert-${message.color}`}>{message.text}</div>}

            <Addproduct show={showAddForm} onClose={() => setShowAddForm(false)}
                onProductAdded={() => {
                    setShowAddForm(false);
                    fetchProducts();
                }}
            />
            {products.length === 0 ?(
                <div className="alert alert-warning mt-3 text-center">No products available in the inventory</div>
            ):(
                <table className="table table-bordered table-hover table-striped mt-3 shadow rounded-table">
                    <thead className="table-dark">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>(
                            <tr key={product._id}>
                                <td>{product.productImg && <img src={`${process.env.REACT_APP_BACKEND_URL}${product.productImg}`} alt={product.productName} style={{ width: "50px" }} />}</td>
                                <td>{product.productName}</td>
                                <td>{product.brand}</td>
                                <td>Rs. {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2 my-1" onClick={()=>setEditingProduct(product)} >Edit</button>
                                    <button className="btn btn-danger btn-sm my-1" onClick={()=>handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {editingProduct && <EditProductForm product={editingProduct} onCancel={()=>setEditingProduct(null)} onSave={onSave} />} 
        </div>
    );
    
};

const EditProductForm=({product, onCancel, onSave})=>{
    const [updatedProduct, setUpdatedProduct]= useState({...product});
    const [newImage, setNewImage]= useState(null);

    const handleChange=(e)=>{
        setUpdatedProduct({...updatedProduct, [e.target.name]: e.target.value});
    };

    const handleImageChange=(e)=>{
        setNewImage(e.target.files[0]);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append('productName', updatedProduct.productName);
        formData.append('brand', updatedProduct.brand);
        formData.append('price', updatedProduct.price);
        formData.append('category', updatedProduct.category);
        formData.append('description', updatedProduct.description);

        if(newImage){
            formData.append('productImg', newImage);
        }

        onSave(product._id, formData);
    };

    return(
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Product details</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 text-start">
                                <label htmlFor="editProductName" className="form-label">Product Name</label>
                                <input 
                                    type="text" name="productName" id="editProductName" className="form-control" 
                                    value={updatedProduct.productName} onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="editBrand" className="form-label">Brand</label>
                                <input 
                                    type="text" name="brand" id="editBrand" className="form-control" 
                                    value={updatedProduct.brand} onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="editPrice" className="form-label">Price</label>
                                <input 
                                    type="number" name="price" id="editPrice" className="form-control" 
                                    value={updatedProduct.price} onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="editCategory" className="form-label">Category</label>
                                <input 
                                    type="text" name="category" id="editCategory" className="form-control" 
                                    value={updatedProduct.category} onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="editDescription" className="form-label">Description</label>
                                <textarea 
                                    name="description" id="editDescription" className="form-control"
                                    value={updatedProduct.description} onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label htmlFor="editProductImg" className="form-label">Product Image</label>
                                <input 
                                    type="file" name="productImg" id="editProductImg" className="form-control"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Save Changes</button>
                                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};