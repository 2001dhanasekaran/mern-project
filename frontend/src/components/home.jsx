import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import img1 from './imgs/img1.webp';
import img2 from './imgs/img2.avif';
import img3 from './imgs/img3.avif';
import Navbar from './navbar';
import Category from './category';
import Footer from './footer';

function Home() {
    const [products, setProducts]= useState([]);
    const [selectedCategory, setSelectedCategory]= useState(null);
    const categoryRef= useRef(null);

    useEffect(() => {
        axios.get(`${process.env.BACKEND_URL}/api/products`)
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching product data", error));
    }, []);

    const categorySet= new Set();
        products.forEach(product=>{
            if(Array.isArray(product.category)){
                product.category.forEach(cat=>categorySet.add(cat.trim()));
            }else if(typeof product.category === 'string'){
                product.category.split(',').forEach(cat=>categorySet.add(cat.trim()));
            }
        });

    const uniqueCategories = Array.from(categorySet);

    useEffect(() => {
        if (selectedCategory){
            setTimeout(()=>{
                if(categoryRef.current){
                    categoryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            },100);
        }
    }, [selectedCategory]);

    return (
        <div className="container-fluid">
            <Navbar />

            <Carousel className="mt-4 shadow rounded carousel">
                <Carousel.Item>
                    <img className="d-block w-100" src={img3} alt="Third slide" />
                    <Carousel.Caption>
                        <h3>Art & Creativity</h3>
                        <p>Explore our range of creative art supplies.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={img1} alt="First slide" />
                    <Carousel.Caption>
                        <h3>High-Quality Stationery</h3>
                        <p>Find the best products for your office and school needs.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={img2} alt="Second slide" />
                    <Carousel.Caption>
                        <h3>Best Prices Available</h3>
                        <p>Get premium products at unbeatable prices.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="row my-5 pb-4 shadow border rounded-4">
                <h2 className='my-4'><ins>Categories</ins></h2>
                {uniqueCategories.map((category, index)=>(
                    <div key={index} className='col-6 col-md-4 col-lg-3 mb-4'>
                        <button className='btn btn-outline-primary me-3' onClick={()=>setSelectedCategory(category)}>
                            {category}
                        </button>
                    </div>
                ))}
            </div>
            <div ref={categoryRef}></div>
            {selectedCategory && <Category category={selectedCategory} />}
            <Footer />
        </div>
    );
}

export default Home;