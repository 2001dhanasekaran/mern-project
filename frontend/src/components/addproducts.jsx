import axios from "axios";
import { useState } from "react";

const Addproduct = ({ onProductAdded, onClose, show }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [productImg, setProductImg] = useState(null);
  const [message, setMessage] = useState({ color: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('productImg', productImg);

    try {
      await axios.post(`${process.env.BACKEND_URL}/api/products/add_products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ color: 'success', text: 'Product added successfully' });
      
      setProductName('');
      setPrice('');
      setBrand('');
      setCategory('');
      setDescription('');
      setProductImg(null);

      setTimeout(() => {
        if (onProductAdded) {
          onProductAdded();
          setMessage({ color: '', text: '' });
        }
        onClose();
      }, 1000);

    } catch (error) {
      setMessage({ color: 'danger', text: 'Error adding product: ' + error.message });
    }
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Product</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-start">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className='form-label'>Product Name</label>
                <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className='form-label'>Brand</label>
                <input type="text" className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className='form-label'>Price (Rs.)</label>
                <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className='form-label'>Category</label>
                <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className='form-label'>Description</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className='form-label'>Product Image</label>
                <input type="file" className="form-control" onChange={(e) => setProductImg(e.target.files[0])} required />
              </div>
              {message.text && <div className={`alert alert-${message.color}`}>{message.text}</div>}
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Add Product</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
