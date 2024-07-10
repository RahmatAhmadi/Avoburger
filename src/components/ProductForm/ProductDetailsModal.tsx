import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  closeModal,
  updateProduct,
} from "../../store/productDetailsModal.slice/productDetailsModalSlice";
import { IoClose } from "react-icons/io5";

export default function ProductDetailModal() {
  const dispatch = useDispatch();
  const { showModal, selectedProduct, mode } = useSelector(
    (state: RootState) => state.productDetailModal
  );

  const [editableProduct, setEditableProduct] = useState(selectedProduct);

  useEffect(() => {
    setEditableProduct(selectedProduct);
  }, [selectedProduct]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setEditableProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateProduct(editableProduct));
    handleClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <dialog open={showModal} className="dialog">
      <div
        className="fixed inset-0 flex items-center justify-end z-30 bg-black bg-opacity-50 overflow-y-auto"
        onClick={handleClose}
      >
        <div
          className="bg-white p-6 w-[400px] h-full max-w-md overflow-x-hidden overflow-y-auto"
          onClick={handleFormClick}
        >
          <button
            className="absolute top-7 right-4 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <IoClose size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <div className="text-center">
            <img
              src={editableProduct.image}
              alt={editableProduct.title}
              className="w-40 h-auto mx-auto rounded-lg mb-4"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-1">
                Name of the product
              </label>
              <input
                type="text"
                id="title"
                value={editableProduct.title}
                onChange={handleChange}
                readOnly={mode === "view"}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="weight" className="block font-medium mb-1">
                Weight in grams
              </label>
              <input
                type="text"
                id="weight"
                value={editableProduct.weight}
                onChange={handleChange}
                readOnly={mode === "view"}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ingredients" className="block font-medium mb-1">
                Ingredients
              </label>
              <textarea
                id="ingredients"
                value={editableProduct.ingredients}
                onChange={handleChange}
                readOnly={mode === "view"}
                className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none"
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="price" className="block font-medium mb-1">
                Price of the product
              </label>
              <span className="absolute left-3 top-9">$</span>
              <input
                type="text"
                id="price"
                value={editableProduct.price}
                onChange={handleChange}
                readOnly={mode === "view"}
                className="w-full pl-8 border-2 border-gray-300 rounded-lg p-2"
              />
            </div>
            {mode === "edit" && (
              <div className="flex">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#3ec995] to-[#77f07f] text-white w-full py-2 px-4 rounded-lg"
                >
                  Save
                </button>
              </div>
            )}
          </form>
          {mode === "view" && (
            <div className="flex">
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-[#3ec995] to-[#77f07f] text-white w-full py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
