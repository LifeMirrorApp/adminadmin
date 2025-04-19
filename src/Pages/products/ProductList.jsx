import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  MoreVertical,
  Edit,
  Trash,
  Mail,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import { LuView } from "react-icons/lu";
import Layout from "../../Components/Layout/Layout";

const ProductList = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [gender, setGender] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [size, setSize] = useState("");
  const [productDate, setProductDate] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories"); // replace with your actual API endpoint
        const data = await res.json();
        setCategories(data); // make sure your API returns an array
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const users = [
    {
      id: 1,
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      state: "California",
      address: "123 Tech Lane, San Francisco",
      phoneNumber: "+1 (555) 123-4567",

      gender: "Female",
      verified: true,
    },
    {
      id: 2,
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      state: "California",
      address: "123 Tech Lane, San Francisco",
      phoneNumber: "+1 (555) 123-4567",

      gender: "Female",
      verified: true,
    },
    {
      id: 3,
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      state: "California",
      address: "123 Tech Lane, San Francisco",
      phoneNumber: "+1 (555) 123-4567",

      gender: "Female",
      verified: true,
    },
    {
      id: 4,
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      state: "California",
      address: "123 Tech Lane, San Francisco",
      phoneNumber: "+1 (555) 123-4567",

      gender: "Female",
      verified: true,
    },
    {
      id: 5,
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      state: "California",
      address: "123 Tech Lane, San Francisco",
      phoneNumber: "+1 (555) 123-4567",

      gender: "Female",
      verified: true,
    },
  ];

  const handleAction = (action, user) => {
    setOpenDropdownId(null);

    switch (action) {
      case "view":
        navigate(`/user/${user.id}`);
        break;
      case "edit":
        console.log("Edit user:", user);
        break;
      case "delete":
        console.log("Delete user:", user);
        break;
      case "email":
        console.log("Email user:", user);
        break;
      case "promote":
        console.log("Promote user:", user);
        break;
      default:
        break;
    }
  };
  const handleAddCategory = () => {
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("icon", selectedIcon);
    if (categoryImage) formData.append("image", categoryImage);

    // Send formData to backend...
    console.log("Submitting category:", {
      name: categoryName,
      icon: selectedIcon,
      image: categoryImage,
    });

    // Reset and close modal
    setCategoryName("");
    setCategoryImage(null);
    setSelectedIcon("");
    setIsModalOpen(false);
  };
  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", selectedCategory);
    formData.append("gender", gender);
    formData.append("brand", selectedBrand);
    formData.append("description", description);
    formData.append("size", size);
    formData.append("productDate", productDate);
    images.forEach((img, index) => {
      formData.append(`images`, img);
    });

    // Send to backend API
    console.log("Submitting product:", formData);

    // Reset form and close modal
    setProductName("");
    setSelectedCategory("");
    setGender("");
    setSelectedBrand("");
    setDescription("");
    setImages([]);
    setSize("");
    setProductDate("");
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="w-full px-3 lg:px-[8rem]">
        <div className="px-4 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-800">All Order</h1>
          <p className="text-gray-600 mt-1">
            View and manage all orders paid and unpaid
          </p>
        </div>

        <div className="lg:flex justify-between lg:space-x-5 space-y-4 lg:space-y-0 items-center mb-6">
          <input
            type="text"
            placeholder="Search product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="btn   w-full lg:w-[20%]">
            <button
              className="px-6 py-3 bg-secondary text-white w-full rounded-md hover:bg-blue-600"
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: "purple" }}
            >
              Add New Product
            </button>
          </div>
        </div>
        {/* Search and Filter Section */}

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>

                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.fullName}
                    </div>
                    <div className="text-sm text-gray-500">{user.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">
                      {user.phoneNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.state}</div>
                    <div className="text-sm text-gray-500">{user.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.state}</div>
                    <div className="text-sm text-gray-500">{user.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.state}</div>
                    <div className="text-sm text-gray-500">{user.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.verified ? (
                      <CheckCircle className="inline-block w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="inline-block w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center relative">
                    <button
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === user.id ? null : user.id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {openDropdownId === user.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu">
                          <button
                            onClick={() => handleAction("view", user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <LuView className="w-4 h-4 mr-2" /> View User
                          </button>
                          <button
                            onClick={() => handleAction("edit", user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit className="w-4 h-4 mr-2" /> Edit User
                          </button>
                          <button
                            onClick={() => handleAction("email", user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Mail className="w-4 h-4 mr-2" /> Send Email
                          </button>
                          <button
                            onClick={() => handleAction("promote", user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <UserPlus className="w-4 h-4 mr-2" /> Promote
                          </button>
                          <button
                            onClick={() => handleAction("delete", user)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                          >
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full overflow-y-auto max-h-screen">
            <h3 className="text-2xl font-bold mb-4">Add New Product</h3>

            {/* Product Name */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter product name"
              />
            </div>

            {/* Select Category */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                Select Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            {/* Select Brand */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Select Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">-- Select Brand --</option>
                {brands.map((brand, idx) => (
                  <option key={idx} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter product description"
              />
            </div>

            {/* Upload Images */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Product Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages([...e.target.files])}
                className="w-full"
              />
            </div>

            {/* Product Size */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Product Size</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. S, M, L, XL"
              />
            </div>

            {/* Product Date */}
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Product Date</label>
              <input
                type="date"
                value={productDate}
                onChange={(e) => setProductDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductList;
