import ProductForm from "../ProductForm/ProductForm";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";

export default function AddProduct() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div
        className="w-64 bg-gray-200 shadow-lg rounded-lg m-4 p-4 flex justify-center items-center cursor-pointer"
        onClick={() => setIsFormOpen(true)}
      >
        <FaPlus size={24} />
        <span className="ml-2">Add new product</span>
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-1/3 h-full p-4">
            <button className="mb-4" onClick={() => setIsFormOpen(false)}>
              Close
            </button>
            <ProductForm
              onClose={() => setIsFormOpen(false)}
              onAddProduct={(product) => console.log(product)}
            />
          </div>
        </div>
      )}
    </>
  );
}
