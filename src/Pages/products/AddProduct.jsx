// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AdminHeader from "../../Components/AdminHeader/AdminHeader";

// const AddProduct = () => {
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryImage, setCategoryImage] = useState(null);
//   const [selectedIcon, setSelectedIcon] = useState("");
//   const [subCategories, setSubCategories] = useState([]);
//   const [newSubCategory, setNewSubCategory] = useState("");
//   const navigate = useNavigate();

//   const handleAddSubCategory = () => {
//     if (newSubCategory.trim() !== "") {
//       setSubCategories([...subCategories, newSubCategory.trim()]);
//       setNewSubCategory("");
//     }
//   };

//   const handleRemoveSubCategory = (index) => {
//     const updated = [...subCategories];
//     updated.splice(index, 1);
//     setSubCategories(updated);
//   };

//   // const handleSubmit = async () => {
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("name", categoryName);
//   //     formData.append("icon", selectedIcon);
//   //     if (categoryImage) formData.append("image", categoryImage);
//   //     formData.append("children", JSON.stringify(subCategories)); // send subcategories as JSON

//   //     const response = await axios.post(
//   //       "http://localhost:8000/api/category",
//   //       formData
//   //     );
//   //     console.log("Category created:", response.data);

//   //     // Reset form
//   //     setCategoryName("");
//   //     setCategoryImage(null);
//   //     setSelectedIcon("");
//   //     setSubCategories([]);
//   //     navigate("/category"); // Navigate back to category list
//   //   } catch (error) {
//   //     console.error("Error creating category:", error);
//   //   }
//   // };
//   const handleSubmit = async () => {
//     try {
//       // Step 1: Create the parent category
//       const formData = new FormData();
//       formData.append("name", categoryName);
//       formData.append("icon", selectedIcon);
//       if (categoryImage) formData.append("image", categoryImage);

//       // const parentRes = await axios.post(
//       //   "http://localhost:8000/api/category",
//       //   formData
//       // );
//       const parentRes = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/category`,
//         formData
//       );

//       const parentCategory = parentRes.data;

//       // Step 2: Create each subcategory
//       for (let sub of subCategories) {
//         const subData = new FormData();
//         subData.append("name", sub);
//         subData.append("icon", selectedIcon); // Optional: reuse or change icon
//         subData.append("parent", parentCategory._id);

//         // await axios.post("http://localhost:8000/api/category", subData);
//         await axios.post(`${import.meta.env.VITE_BASE_URL}/category`, subData);
//       }

//       // Reset form
//       setCategoryName("");
//       setCategoryImage(null);
//       setSelectedIcon("");
//       setSubCategories([]);
//       navigate("/category");
//     } catch (error) {
//       console.error("Error creating category or subcategories:", error);
//     }
//   };

//   return (
//     <>
//       <AdminHeader />
//       <div className="p-6 max-w-2xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           Add New Product
//         </h2>

//         {/* Category Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Product Name
//           </label>
//           <input
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             placeholder="Enter category name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>

//         {/* Category Image */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setCategoryImage(e.target.files[0])}
//             className="w-full"
//           />
//         </div>

//         {/* Select Icon */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Select Icon
//           </label>
//           <select
//             value={selectedIcon}
//             onChange={(e) => setSelectedIcon(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//           >
//             <option value="">-- Choose an Icon --</option>
//             <option value="📚">📚 Education</option>
//             <option value="💻">💻 Tech</option>
//             <option value="🎨">🎨 Design</option>
//             <option value="🔧">🔧 Tools</option>
//             {/* Add more if you like */}
//           </select>
//         </div>

//         {/* Subcategories */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Subcategories
//           </label>
//           <div className="flex gap-2 mb-2">
//             <input
//               type="text"
//               value={newSubCategory}
//               onChange={(e) => setNewSubCategory(e.target.value)}
//               placeholder="Enter subcategory name"
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
//             />
//             <button
//               type="button"
//               onClick={handleAddSubCategory}
//               className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//             >
//               Add
//             </button>
//           </div>
//           {subCategories.length > 0 && (
//             <ul className="list-disc ml-5">
//               {subCategories.map((sub, idx) => (
//                 <li
//                   key={idx}
//                   className="flex items-center justify-between mb-1"
//                 >
//                   <span>{sub}</span>
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveSubCategory(idx)}
//                     className="text-red-500 text-sm ml-4 hover:underline"
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
//           >
//             Submit Category
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddProduct;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productType, setProductType] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productSize, setProductSize] = useState("");
  const [productISBN, setProductISBN] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [language, setLanguage] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState("");
  const [selectedChildId, setSelectedChildId] = useState("");

  const [newSubCategory, setNewSubCategory] = useState("");
  const navigate = useNavigate();

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/categories`
      );
      const allCategories = res.data;
      setCategories(allCategories);

      // Parent categories are those with null or no parent
      const parents = allCategories.filter(
        (cat) => !cat.parent || cat.parent === null
      );
      setParentCategories(parents);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Handle parent selection
  // const handleParentChange = (e) => {
  //   const parentId = e.target.value;
  //   setSelectedParentId(parentId);
  //   setSelectedChildId("");

  //   const children = categories.filter((cat) => cat.parent === parentId);
  //   setChildCategories(children);
  // };
  // const handleParentChange = (e) => {
  //   const parentId = e.target.value;
  //   setSelectedParentId(parentId);
  //   setSelectedChildId("");

  //   const children = categories.filter((cat) => {
  //     // Normalize the parent ID
  //     if (!cat.parent) return false;

  //     const catParentId =
  //       typeof cat.parent === "string" ? cat.parent : cat.parent._id;

  //     return catParentId === parentId;
  //   });
  //   console.log("Parent ID:", selectedParentId);
  //   console.log("All categories:", categories);
  //   console.log("Filtered children:", childCategories);

  //   setChildCategories(children);
  // };
  const handleParentChange = (e) => {
    const parentId = e.target.value;
    setSelectedParentId(parentId);
    setSelectedChildId("");

    const selectedParent = categories.find((cat) => cat._id === parentId);

    const children =
      selectedParent?.children?.filter((child) => {
        // Optional: Filter out products if you only want subcategories
        return child.name && child._id;
      }) || [];

    console.log("Parent ID:", parentId);
    console.log("Selected Parent:", selectedParent);
    console.log("Filtered children:", children);

    setChildCategories(children);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const handleAddSubCategory = () => {
    if (newSubCategory.trim() !== "") {
      setSubCategories([...subCategories, newSubCategory.trim()]);
      setNewSubCategory("");
    }
  };

  const handleRemoveSubCategory = (index) => {
    const updated = [...subCategories];
    updated.splice(index, 1);
    setSubCategories(updated);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // const handleSubmit = async () => {
  //   try {
  //     // Step 1: Create the parent category
  //     const formData = new FormData();
  //     formData.append("name", categoryName);
  //     formData.append("icon", selectedIcon);
  //     if (categoryImage) formData.append("image", categoryImage);

  //     // Create the category
  //     const parentRes = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/category`,
  //       formData
  //     );

  //     const parentCategory = parentRes.data;

  //     // Step 2: Create each subcategory
  //     for (let sub of subCategories) {
  //       const subData = new FormData();
  //       subData.append("name", sub);
  //       subData.append("icon", selectedIcon); // Optional: reuse or change icon
  //       subData.append("parent", parentCategory._id);

  //       await axios.post(`${import.meta.env.VITE_BASE_URL}/category`, subData);
  //     }

  //     // Step 3: Now create the product
  //     const productFormData = new FormData();
  //     productFormData.append("name", productName);
  //     productFormData.append("description", productDescription);
  //     productFormData.append("price", productPrice);
  //     productFormData.append("category", parentCategory._id); // Attach the category to the product
  //     productFormData.append("quantityAvailable", productQuantity);
  //     productFormData.append("size", productSize);
  //     productFormData.append("isbn", productISBN);
  //     productFormData.append("productType", productType);
  //     if (productImages.length > 0) {
  //       productImages.forEach((image, index) => {
  //         productFormData.append(`images[${index}]`, image);
  //       });
  //     }

  //     const productRes = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/create-product`,
  //       productFormData
  //     );

  //     console.log("Product created:", productRes.data);

  //     // Reset form
  //     setProductName("");
  //     setProductDescription("");
  //     setProductPrice("");
  //     setProductCategory("");
  //     setProductImages([]);
  //     setProductType("");
  //     setProductQuantity(0);
  //     setProductSize("");
  //     setProductISBN("");
  //     setCategoryName("");
  //     setCategoryImage(null);
  //     setSelectedIcon("");
  //     setSubCategories([]);
  //     navigate("/products"); // Navigate back to products list
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("discountPrice", discountPrice);
      formData.append("quantityAvailable", productQuantity);
      formData.append("size", productSize);
      formData.append("language", language);
      formData.append("isbn", productISBN);
      formData.append("productType", productType);
      formData.append("category", selectedChildId); // Attach child category

      productImages.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      const productRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-product`,
        formData
      );

      console.log("Product created:", productRes.data);
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Product
        </h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Description
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Product Price */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Discount Price</label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        {/* Quantity, Size, Language */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Size</label>
            <input
              value={productSize}
              onChange={(e) => setProductSize(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Language</label>
            <input
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Parent Category */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Category</label>
          <select
            value={selectedParentId}
            onChange={handleParentChange}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Parent --</option>
            {parentCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Child Category */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Sub Category</label>
          <select
            value={selectedChildId}
            onChange={(e) => setSelectedChildId(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={!childCategories.length}
          >
            <option value="">-- Select Sub Category --</option>
            {childCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Type
          </label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">-- Select Product Type --</option>
            <option value="book">Book</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="course">Course</option>
          </select>
        </div>
        {/* Product Images */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Product Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setProductImages(e.target.files)}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Submit Product
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
