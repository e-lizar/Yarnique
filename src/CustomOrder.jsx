import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CustomOrder.css";


function CustomOrder() {
    const location = useLocation();
    const orderData = location.state;

    {orderData?.image && (
     <div className="selected-product">
       <h3>Selected Product</h3>

       <img
          src={`http://localhost:5000/uploads/${orderData.image}`}
          alt={orderData.productName}
          className="selected-product-image"
        />
      </div>
    )}
    
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      itemType: "",
      size: "",
      bust: "",
      waist: "",
      hips: "",
      topLength: "",
      topLengthInches:"",
      bottomLength:"",
      bottomLengthInches:"",
      colors: "",
      description: "",
     image: 
     orderData?.image || null
    });

  const [showMessage, setShowMessage] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
    ...formData,
    [name]: value
    });
   };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log("Submit button clicked");

  const data = new FormData();

data.append("fullName", formData.fullName);
data.append("email", formData.email);
data.append("itemType", formData.itemType);

data.append("size", formData.size);
data.append("bust", formData.bust);
data.append("waist", formData.waist);
data.append("hips", formData.hips);

data.append("topLength", formData.topLength);
data.append("topLengthInches", formData.topLengthInches);

data.append("bottomLength", formData.bottomLength);
data.append("bottomLengthInches", formData.bottomLengthInches);

data.append("colors", formData.colors);
data.append("description", formData.description);

if (formData.image) {
  data.append("image", formData.image);
}

await fetch(
  "http://localhost:5000/custom-order",
  {
    method: "POST",
    body: data
  }
);

  setShowMessage(true);
  // Clear the form
  setFormData({
    fullName: "",
    email: "",
    itemType: "",
    colors: "",
    description: "",
    image: null
  });

  setTimeout(() => {
    setShowMessage(false);
  }, 8000);
  };
  
  return (
    <div className="custom-page">

      {/* Hero */}
      <section className="custom-hero">
        <h1>Custom Crochet Orders 🧶💖</h1>

        <p>
          Tell us your dream crochet piece and we'll
          create something handmade just for you.
        </p>
      </section>

      {/* Form */}
      <section className="form-section">

        <div className="form-card">

          <h2>Tell Us About Your Order</h2>

          <form className="custom-form"
          onSubmit={handleSubmit}
          >

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <select
              name="itemType"
              value={formData.itemType}
              onChange={handleChange}
            >
             <option value="">
                Choose Item Type
             </option>

            <option>Bag</option>
            <option>Dress</option>
            <option>Trouser</option>
            <option>Top</option>
            <option>Skirt</option>
            <option>Doll</option>
            <option>Two-Piece Set</option>
            <option>Other</option> 
            </select>

            {(
              formData.itemType === "Dress" ||
              formData.itemType === "Trouser" ||
              formData.itemType === "Top" ||
              formData.itemType === "Two-Piece Set" ||
              formData.itemType === "Skirt"
            ) && (
            <>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
            >
            <option value="">
              Choose Size
            </option>

             <option>XS</option>
             <option>S</option>
             <option>M</option>
             <option>L</option>
             <option>XL</option>
             <option>XXL</option>
             <option>Custom Measurements</option>
           </select>

           <input
              type="text"
              name="bust"
              placeholder="Bust (inches"
              value={formData.bust}
              onChange={handleChange}
            />

           <input
              type="text"
              name="waist"
              placeholder="Waist (inches)"
              value={formData.waist}
              onChange={handleChange}
            />

           <input
              type="text"
              name="hips"
              placeholder="Hips (inches)"
              value={formData.hips}
              onChange={handleChange}
            />             
             </>
             )}
           {(
             formData.itemType === "Top" ||
             formData.itemType === "Two-Piece Set"
           ) && (
           <>
           <select
             name="topLength"
             value={formData.topLength}
             onChange={handleChange}
           >
           <option value="">
             Choose Top Length
           </option>

           <option>Cropped</option>
           <option>Waist Length</option>
           <option>Hip Length</option>
           <option>Custom Length</option>
           </select>

             {formData.topLength ===
             "Custom Length" && (
            <input
              type="text"
              name="topLengthInches"
              placeholder="Top Length (Inches)"
              value={formData.topLengthInches}
              onChange={handleChange}
            />
            )}
            </>
            )}
            {(
                 formData.itemType === "Dress" ||
                 formData.itemType === "Skirt" ||
                 formData.itemType === "Trouser" ||

                 formData.itemType === "Two-Piece Set"
               ) && (
               <>
              <select
                  name="bottomLength"
                  value={formData.bottomLength}
                  onChange={handleChange}
                >
               <option value="">
                   Choose Length
               </option>

               <option>Mini</option>
               <option>Knee Length</option>
               <option>Midi</option>
               <option>Maxi</option>
               <option>Custom Length</option>
             </select>

             {formData.bottomLength ===
                 "Custom Length" && (
              <input
                  type="text"
                  name="bottomLengthInches"
                  placeholder="Length (inches)"
                  value={formData.bottomLengthInches}
                 onChange={handleChange}
              />
              )}
             </>
           )}
            <input
              type="text"
              name="colors"
              placeholder="Preferred Colors"
              value={formData.colors}
              onChange={handleChange}
            />

            <textarea
              rows="6"
              name="description"
              placeholder="Describe your custom order..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <input 
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) =>
              setFormData({
              ...formData,
              image: e.target.files[0]
             })
             }
            />

            {formData.image && (
              <p className="file-name">
                 📷 Selected: {formData.image.name}
              </p>
            )}

            <button type="submit">
              Submit Request
            </button>

          </form>
          
        </div>

      </section>

      {showMessage && (
        <div className="notification">
        <h4>🧶💖 Request Submitted!</h4>

        <p>
           Thank you for choosing Yarnique.
           We'll contact you soon.
         </p>
       </div>
     )}
      

     <footer className="about-footer">
             <Link to="/" className="back-home">
              Home
            </Link>
      
            <p>© 2025 Yarnique 🧶💖</p>
     </footer>

    </div>
  );
}

export default CustomOrder;