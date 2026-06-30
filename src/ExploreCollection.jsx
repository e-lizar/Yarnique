import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ExploreCollection.css";

function ExploreCollection() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Stores image index for each product
  const [selectedImages, setSelectedImages] =
    useState({});

  const [products, setProducts] =
    useState([]);
  const [cart, setCart] = useState(


     JSON.parse(
    localStorage.getItem("cart")
     ) || []
    );

  const [openProduct, setOpenProduct] =
   useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((response) =>
        response.json()
      )
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSlide = (
    productId,
    direction,
    imagesLength
  ) => {
    setSelectedImages((prev) => {
      const current =
        prev[productId] || 0;

      let next;

      if (direction === "next") {
        next =
          current === imagesLength - 1
            ? 0
            : current + 1;
      } else {
        next =
          current === 0
            ? imagesLength - 1
            : current - 1;
      }

      return {
        ...prev,
        [productId]: next
      };
    });
  };
         
     const handleAddToCart = (
  product,
  color,
  size
) => {
  const customer =
    JSON.parse(
      localStorage.getItem(
        "customer"
      )
    );

  const cartItem = {
    productId:
      product._id,
    name:
      product.name,
    image:
      product.images[0],
    color,
    size:
      size.size,
    price:
      size.price
  };

  const updatedCart = [
    ...cart,
    cartItem
  ];

  setCart(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(
      updatedCart
    )
  );

  if (!customer) {
    alert(
      "Please login or create an account to continue 🧶💖"
    );

    navigate("/login");

    return;
  }

  alert(
    `${product.name} added to cart 🧶💖`
  );
};

  const filteredProducts =
    products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category ===
          selectedCategory;

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesSearch
      );
    });

    
  return (
    <div className="explore-page">

      <section className="explore-hero">
        <h1>
          Explore Collection 🧶💖
        </h1>

        <p>
          Discover our handmade
          crochet pieces.
        </p>
      </section>

      {/* Search */}
      <section className="search-section">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </section>

      {/* Categories */}
      <section className="categories-section">

        <button
          onClick={() =>
            setSelectedCategory(
              "All"
            )
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setSelectedCategory(
              "Bags"
            )
          }
        >
          Bags
        </button>

        <button
          onClick={() =>
            setSelectedCategory(
              "Dresses"
            )
          }
        >
          Dresses
        </button>

        <button
          onClick={() =>
            setSelectedCategory(
              "Tops"
            )
          }
        >
          Tops
        </button>

        <button
          onClick={() =>
            setSelectedCategory(
              "Skirts"
            )
          }
          >
            Skirts
          </button>

        <button
          onClick={() =>
            setSelectedCategory(
              "Two-Piece Sets"
            )
          }
        >
          Two-Piece Sets
        </button>

        <button
          onClick={() =>
            setSelectedCategory(
              "Bikinis"
            )
          }
        >
          Bikinis
        </button>

      </section>

      {/* Products */}
      <section className="products-grid">

        {filteredProducts.map(
          (product) => (
            <div
              className="product-card"
              key={product._id}
            >

              {product.images?.length >
                0 && (
                <div className="image-slider">

                  {product.images.length >
                    1 && (
                    <button
                      className="slider-btn prev"
                      onClick={() =>
                        handleSlide(
                          product._id,
                          "prev",
                          product.images.length
                        )
                      }
                    >
                      ❮
                    </button>
                  )}

                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${
                      product.images[
                        selectedImages[
                          product._id
                        ] || 0
                      ]
                    }`}
                    alt={product.name}
                    className="product-image"
                  />

                  {product.images.length >
                    1 && (
                    <button
                      className="slider-btn next"
                      onClick={() =>
                        handleSlide(
                          product._id,
                          "next",
                          product.images.length
                        )
                      }
                    >
                      ❯
                    </button>
                  )}

                </div>
              )}

              <h3>
                {product.name}
              </h3>

              <p>
                <strong>
                  Category:
                </strong>{" "}
                {product.category}
              </p>

              <p>
                <strong>
                  Starting at:
                </strong>{" "}
                KSh{" "}
                {product
                  .variants?.[0]
                  ?.sizes?.[0]
                  ?.price || "N/A"}
              </p>

              <div className="colors-section">
                <strong>
                  Colors:
                </strong>

                {product.colors?.map(
                  (
                    color,
                    index
                  ) => (
                    <span
                      key={index}
                    >
                      {color}
                    </span>
                  )
                )}
              </div>

              <button
                 onClick={() =>
                 setOpenProduct(
                 openProduct === product._id
                 ? null
                 : product._id
                 )
                }
               >
               {openProduct === product._id
                ? "Hide Details"
               : "View Details"}
              </button>

              {openProduct === product._id && (
                 <div className="details-section">

                   <h4>Available Variants</h4>

                     {product.variants?.map(
                     (variant) => (
                  <div
                     key={variant._id}
                        className="variant-card"
                      >
                       <h5>
                      {variant.color}
                    </h5>

          <div className="sizes-list">
            {variant.sizes.map(
              (size) => (
                <div
                  key={size._id}
                  className="size-card"
                >
                  <p>
                    <strong>
                      Size:
                    </strong>{" "}
                    {size.size}
                  </p>

                  <p>
                    <strong>
                      Price:
                    </strong>{" "}
                    KSh {size.price}
                  </p>

                
                    
                  {size.available ? (
                     <button
    onClick={() =>
      handleAddToCart(
        product,
        variant.color,
        size
      )
    }
  >
    Add to Cart
  </button>
                    ) : (
                  <button
                    className="custom-btn"
                    onClick={() =>
                    navigate("/custom-order",
                      {state: {image: product.images?.[0]}
                    }
                    )
                  }
                  >
                   Request Custom Order
                  </button>
                  )}
                  
                </div>
              )
            )}
          </div>
        </div>
      )
    )}

  </div>
)}

            </div>
          )
        )}

      </section>

      <footer className="explore-footer">
        <Link to="/">
          Home
        </Link>

        <p>
          © 2025 Yarnique 🧶💖
        </p>
      </footer>

    </div>
  );
}

export default ExploreCollection;