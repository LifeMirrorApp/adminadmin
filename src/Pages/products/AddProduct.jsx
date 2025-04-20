import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const AddProduct = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState("");
  const navigate = useNavigate();

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

  // const handleSubmit = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", categoryName);
  //     formData.append("icon", selectedIcon);
  //     if (categoryImage) formData.append("image", categoryImage);
  //     formData.append("children", JSON.stringify(subCategories)); // send subcategories as JSON

  //     const response = await axios.post(
  //       "http://localhost:8000/api/category",
  //       formData
  //     );
  //     console.log("Category created:", response.data);

  //     // Reset form
  //     setCategoryName("");
  //     setCategoryImage(null);
  //     setSelectedIcon("");
  //     setSubCategories([]);
  //     navigate("/category"); // Navigate back to category list
  //   } catch (error) {
  //     console.error("Error creating category:", error);
  //   }
  // };
  const handleSubmit = async () => {
    try {
      // Step 1: Create the parent category
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("icon", selectedIcon);
      if (categoryImage) formData.append("image", categoryImage);

      // const parentRes = await axios.post(
      //   "http://localhost:8000/api/category",
      //   formData
      // );
      const parentRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/category`,
        formData
      );

      const parentCategory = parentRes.data;

      // Step 2: Create each subcategory
      for (let sub of subCategories) {
        const subData = new FormData();
        subData.append("name", sub);
        subData.append("icon", selectedIcon); // Optional: reuse or change icon
        subData.append("parent", parentCategory._id);

        // await axios.post("http://localhost:8000/api/category", subData);
        await axios.post(`${import.meta.env.VITE_BASE_URL}/category`, subData);
      }

      // Reset form
      setCategoryName("");
      setCategoryImage(null);
      setSelectedIcon("");
      setSubCategories([]);
      navigate("/category");
    } catch (error) {
      console.error("Error creating category or subcategories:", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Category
        </h2>

        {/* Category Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Category Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCategoryImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Select Icon */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select Icon
          </label>
          <select
            value={selectedIcon}
            onChange={(e) => setSelectedIcon(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">-- Choose an Icon --</option>
            <option value="📚">📚 Education</option>
            <option value="💻">💻 Tech</option>
            <option value="🎨">🎨 Design</option>
            <option value="🔧">🔧 Tools</option>
            {/* Add more if you like */}
          </select>
        </div>

        {/* Subcategories */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Subcategories
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}
              placeholder="Enter subcategory name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={handleAddSubCategory}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Add
            </button>
          </div>
          {subCategories.length > 0 && (
            <ul className="list-disc ml-5">
              {subCategories.map((sub, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between mb-1"
                >
                  <span>{sub}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubCategory(idx)}
                    className="text-red-500 text-sm ml-4 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Submit Category
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
