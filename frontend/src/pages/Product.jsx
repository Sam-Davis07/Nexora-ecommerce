import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Product.css";

export default function Product() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));

    fetch(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setSimilarProducts(data.slice(0,4)));

  }, [id]);

   const addToWishlist = async () => {

    await fetch("${process.env.REACT_APP_API_URL}/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: 1,
        product_id: product.id
      })
    });

    alert("Added to Wishlist ❤️");

  };


  if (!product) return <h2>Loading...</h2>;

  return (

    <div className="product-page">

      {/* LEFT IMAGE GRID */}

      <div className="product-images">

        <img src={product.image} alt={product.name}/>
        <img src={product.image} alt={product.name}/>
        <img src={product.image} alt={product.name}/>
        <img src={product.image} alt={product.name}/>

      </div>


      {/* RIGHT DETAILS */}

      <div className="product-details">

        <h2>{product.name}</h2>

        <p className="price">₹ {product.price}</p>

        <p className="tax">Price inclusive of all taxes</p>


        {/* SIZE */}

        <h4>Please select a size</h4>

        <div className="sizes">

          {["XS","S","M","L","XL"].map(size => (

            <button
              key={size}
              className={selectedSize === size ? "active" : ""}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>

          ))}

        </div>


        {/* QUANTITY */}

        <div className="qty">

          <label>Quantity</label>

          <select
            value={qty}
            onChange={(e)=>setQty(e.target.value)}
          >
            {[1,2,3,4,5].map(n=>(
              <option key={n}>{n}</option>
            ))}
          </select>

        </div>


        {/* ADD TO CART */}

        <button className="cart-btn">
          ADD TO CART
        </button>


        {/* PRODUCT DETAILS */}

        <div className="info-box">

          <h4>Product Details</h4>

          <p>{product.description}</p>

          <p>Category: {product.category}</p>

          <p>Stock: {product.stock}</p>

        </div>

      </div>


      {/* SIMILAR PRODUCTS */}

      <div className="similar-section">

        <h3>Other Also Bought</h3>

        <div className="similar-grid">

          {similarProducts.map(p => (

            <div className="similar-card" key={p.id}>

              <img src={p.image} alt={p.name}/>

              <h4>{p.name}</h4>

              <p>₹ {p.price}</p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}