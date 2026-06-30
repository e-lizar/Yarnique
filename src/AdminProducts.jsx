import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminProducts() {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin");

  const [products, setProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const[editingId, setEditingId] = useState(null);

  const [productData, setProductData] =
  useState({
    name: "",
    category: "",
    description: "",
    images: [],
    colors: []
  });

  const [variants, setVariants] = useState([]);

  const [colorInput, setColorInput] =useState("");

  if (!isAdmin) {
    return (
      <Navigate to="/admin-login" />
    );
  }
      useEffect(() => {
    getProducts();
    }, []);

      const getProducts = async () => {
    try {
      const response =
        await fetch(
          `${import.meta.env.VITE_API_URL}/products`
        );

      const data =
        await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveProduct =
  async () => {
    try {
      const data =
        new FormData();

      data.append(
        "name",
        productData.name
      );

      data.append(
        "category",
        productData.category
      );

      data.append(
        "description",
        productData.description
      );

      data.append(
        "colors",
        JSON.stringify(
          productData.colors
        )
      );

      data.append(
        "variants",
        JSON.stringify(
          variants
        )
      );

      productData.images.forEach(
        (image) => {
          data.append(
            "images",
            image
          );
        }
      );
       let response;
       if (editingId){
        response =
        await fetch( `${import.meta.env.VITE_API_URL}/products/${editingId}`,
          {
            method:"PATCH",
            body: data
          }
        ) ;
       } else{
        response = await fetch(`${import.meta.env.VITE_API_URL}/products`,
          {method: "POST",
            body: data
          }
        );
       }
       const updatedProduct =
       await response.json();
       if (!response.ok){
        throw new Error(
          updatedProduct.message
        )
       }

       alert(editingId 
        ? "Product updated!"
        : "Product added!"

       );

       setShowForm(false);
       setEditingId(null);

       setProductData({
        name:"",
        category: "",
          description: "",
          images: [],
          colors: []
       });

       setVariants([]);
       getProducts();
      
      } catch (error){
        console.log(error);
      }
    };


  const handleEdit =
    (product) => {
      setEditingId(
        product._id
      );

      setProductData({
        name: product.name,
        category:
          product.category,
        description:
          product.description,
        images: [],
        colors:
          product.colors
      });

      setVariants(
        product.variants
      );

      setShowForm(true);
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {
        await fetch(
          `${import.meta.env.VITE_API_URL}/products/${id}`,
          {
            method: "DELETE"
          }
        );

        getProducts();
      } catch (error) {
        console.log(error);
      }
    };

  const handleLogout = () => {
    localStorage.removeItem(
      "isAdmin"
    );

    navigate("/admin-login");
  };

  return (
    <div className="admin-page">
           <h1>
              Yarnique Products 🧶💖
             </h1>
         <div className="admin-tabs">
              <button
                  onClick={() =>
                     navigate("/admin")
                     }
                >
                   📦 Custom Orders
                </button>
                <button
                  className="active-tab"
                >
                    🧶 Products
                </button>
          </div>

           <div className="products-section">
                  <button
                       className="add-product-btn"
                        onClick={() =>
                        setShowForm(!showForm)
                         }
                           >  
                        {showForm ?"Close Form" : "+ Add Product"}
                 </button>
                     {showForm && (

            <div className="product-form">
                  <input
                       type="text"
                       placeholder="Product Name"
                       value={productData.name}
                       onChange={(e) =>
                       setProductData({
                       ...productData,
                       name: e.target.value
                        })
                        }
                        />

                  <select
                        value={
                        productData.category
                         }
                        onChange={(e) =>
                        setProductData({
                         ...productData,
                        category:
                         e.target.value
                         })
                        }
                         >
                     <option value="">
                        Select Category
                     </option>

                     <option>
                        Bags
                     </option>

                      <option>
                         Dresses
                      </option>

                      <option>
                         Tops
                       </option>

                      <option>
                          Skirts
                      </option>

                      <option>
                           Two-Piece Sets
                       </option>

                      <option>
                          Bikinis
                         </option>
                  </select>

                  <textarea
                        placeholder="Description"
                         value={
                        productData.description
                       }
                      onChange={(e) =>
                         setProductData({
                          ...productData,
                           description:
                           e.target.value
                          })
                        }
                        />

                       <label>
                           Product Images
                        </label>

                      <input
                          type="file"
                            multiple
                         accept="image/*"
                         onChange={(e) =>
                         setProductData({
                         ...productData,
                         images: [
                         ...e.target.files
                          ]
                          })
                         }
                        />

                       {productData.images.length > 0 && (
               <div className="selected-images">
                    {productData.images.map(
                   (image, index) => (
                   <p key={index}>
                   📷 {image.name}
                   </p>
                    )
                    )}
                </div>
                )}
          
                   <label>
                      Add Colors
                  </label>

                <div className="color-input">

                     <input
                        type="text"
                        placeholder="Enter color"
                        value={colorInput}
                        onChange={(e) =>
                        setColorInput(
                         e.target.value
                       )
                     }
                    />
                    <button
                         type="button"
                         onClick={() => {
                         if (
                         colorInput.trim()
                         ) {
                         setProductData({
                         ...productData,
                         colors: [
                          ...productData.colors,
                           colorInput
                         ]
                       });
                     setColorInput("");
                       }
                      }}
                     >
                        Add Color
                    </button>
                </div>

                <div className="colors-list">

                     {productData.colors.map(
                     (color, index) => (
                     <span
                     key={index}
                     className="color-chip"
                     >
                     {color}
                     </span>
                     )
                    )}
                </div>
                   <button
                       type="button"
                       onClick={() => {
                        const newVariants =
                         productData.colors.map(
                        (color) => ({
                        color,
                        sizes: [
                          {
                         size: "Small",
                       price: "",
                        available: false
                        },
                        {
                          size: "Medium",
                         price: "",
                          available: false
                        },
                       {
                        size: "Large",
                        price: "",
                        available: false
                       }
                       ]
                        })
                        );
                       setVariants(
                       newVariants
                       );
                       }}
                       >
                        Generate Sizes
                    </button>

                       {variants.map(
                        (
                        variant,
                         colorIndex
                        ) => (
                        <div
                          key={colorIndex}
                           className="variant-card"
                            >
                           <h3>
                             {variant.color}
                           </h3>

                          {variant.sizes.map(
                          (
                            size,
                            sizeIndex
                           ) => (
                       <div
                            key={sizeIndex}
                            className="size-row"
                             >
                          <h4>
                             {size.size}
                           </h4>

                         <input
                           type="number"
                             placeholder="Price"
                            value={
                            size.price
                            }
                           onChange={(e) => {
                           const updated =
                            [...variants];
                           updated[
                            colorIndex
                          ].sizes[
                            sizeIndex
                          ].price =
                           e.target.value;
                            setVariants(
                          updated
                          );
                          }}
                         />
                         <label>

                           <input
                             type="checkbox"
                             checked={
                             size.available
                             }
                            onChange={(e) => {
                               const updated =
                            [...variants];

                             updated[
                            colorIndex
                           ].sizes[
                          sizeIndex
                         ].available =
                         e.target.checked;

                         setVariants(
                         updated
                          );
                          }}
                          />
                           Available
                      </label>
                    </div>
                    )
                    )}
                </div>
                   )
                   )}

                    <button
                        type="button"
                        className="save-product-btn"
                         onClick={
                         handleSaveProduct
                        }
                       >
                      {editingId
                       ? "Update Product"
                      :  "Save Product"}
                        </button>
      </div>
      )}
      </div>

        <div className="products-list">
                    {products.map((product) => (
                     <div
               key={product._id}
              className="product-card"
               >
              {/* Product Images */}
             {product.images &&
                 product.images.length > 0 && (
                 <img
                  src={`http://localhost:5000/uploads/${product.images[0]}`}
                   alt={product.name}
                   className="admin-product-image"
                   />
                   )}

                  <h2>{product.name}</h2>

                   <p>
                 <strong>Category:</strong>{" "}
                   {product.category}
                  </p>

                 {product.variants.map(
                    (variant, i) => (
                   <div key={i}>
                     <h4>{variant.color}</h4>

                     {variant.sizes.map(
                      (size, j) => (
                        <p key={j}>
                  {size.size} -{" "}
                  {size.available
                    ? "✅ Available"
                    : "❌ Out of Stock"}
                       </p>
                      )
                   )}
               </div>
              )
            )}

      <div className="product-actions">
        <button
        className="edit-btn"
        onClick={()=>
          handleEdit(product)
        }>
          ✏️ Edit
        </button>

        <button
        className="delete-btn"
          onClick={()=>
            handleDelete(product._id)
          }
        >
          🗑 Delete
        </button>
      </div>

    </div>
  ))}
</div>
      <footer className="admin-footer">
        <button
          className="logout-btn"
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

        <p>
          © 2025 Yarnique 🧶💖
        </p>

      </footer>

    </div>
  );
}

export default AdminProducts;