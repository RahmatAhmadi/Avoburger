import React, { createContext, useState, useContext, ReactNode } from "react";

interface ChildrenProps {
  children: ReactNode;
}

interface Product {
  id: string;
  image: string;
  title: string;
  weight: string;
  ingredients: string;
  price: string;
}

interface ProductDetailContext {
  product: Product | null;
  mode: "view" | "edit";
  showModal: boolean;
  openModal: (product: Product, mode: "view" | "edit") => void;
  closeModal: () => void;
  updateProduct: (updatedProduct: Product) => void;
}

const ProductDetailContext = createContext<ProductDetailContext | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useProductDetailContext = () => {
  const context = useContext(ProductDetailContext);
  if (!context) {
    throw new Error();
  }

  return context;
};

export const ProductDetailProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [showModal, setShowModal] = useState(false);

  const openModal = (product: Product, mode: "view" | "edit") => {
    setProduct(product);
    setMode(mode);
    setShowModal(true);
  };

  const closeModal = () => {
    setProduct(null);
    setMode("view");
    setShowModal(false);
  };

  const updateProduct = (updatedProduct: Product) => {
    if (product && product.id === updatedProduct.id) {
      setProduct(updatedProduct);
    }
  };

  const contextValue: ProductDetailContext = {
    product,
    mode,
    showModal,
    openModal,
    closeModal,
    updateProduct,
  };

  return (
    <ProductDetailContext.Provider value={contextValue}>
      {children}
    </ProductDetailContext.Provider>
  );
};
