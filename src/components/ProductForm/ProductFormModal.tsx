import { useEffect, useRef } from "react";
import ProductForm from "./ProductForm";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/showForm.slice/showFormSlice";
import { addProduct } from "../../store/products.slice/productsSlice";
import { ProductProps, Product } from "../../types";
import { IoClose } from "react-icons/io5";

interface ProductFormModalProps {
  product: ProductProps;
  onClose: () => void;
}

export default function ProductFormModal({
  product,
  onClose,
}: ProductFormModalProps) {
  const dispatch = useDispatch();

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.showModal();
    }
  }, []);

  const handleClose = () => {
    dispatch(closeModal());
    onClose();
  };

  const convertImageToString = async (
    image: File | string | null
  ): Promise<string> => {
    if (typeof image === "string" || image === null) {
      return image || "";
    }
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  };

  const handleAddProduct = async (product: ProductProps) => {
    const imageString = await convertImageToString(product.image);
    const productToAdd: Product = {
      ...product,
      category: "Main courses",
      image: imageString,
    };
    dispatch(addProduct(productToAdd));
    dispatch(closeModal());
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="dialog">
      <div
        className="fixed inset-0 flex items-center justify-end z-30 bg-black bg-opacity-50 overflow-y-auto"
        onClick={handleClose}
      >
        <div className="bg-white h-full w-full max-w-md overflow-x-hidden overflow-y-auto">
          <button
            className="absolute top-7 right-4 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <IoClose size={24} />
          </button>
          <ProductForm
            onClose={onClose}
            onAddProduct={handleAddProduct}
            readOnly={false}
            initialProduct={product}
          />
        </div>
      </div>
    </dialog>
  );
}
