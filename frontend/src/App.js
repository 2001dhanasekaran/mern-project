import './App.css';
import './components/style.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AddProducts from './components/addproducts';
import Admin from './components/admin';
import CartPage from './components/cart';
import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
import ProtectedRoute from './components/protectedroute';
import Unauthorized from './components/unauthorized';
import About from './components/about';
import Contact from './components/contact';
import Wishlist from './components/wishlist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login />} />
          <Route path='/admin' element={<ProtectedRoute requiredRole="admin"><Admin /></ProtectedRoute>} />
          <Route path='/admin/add_products' element={<ProtectedRoute requiredRole="admin"><AddProducts /></ProtectedRoute>} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
