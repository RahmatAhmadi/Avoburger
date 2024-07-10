import React, { useState } from "react";
import { ProductProps } from "../../types";
import { FaLeaf, FaPlus } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { PiHamburgerFill } from "react-icons/pi";

interface ProductFormProps {
  onClose: () => void;
  onAddProduct: (product: ProductProps) => void;
  readOnly?: boolean;
  initialProduct?: ProductProps;
}

const options = ["Wheat bun", "Veggie Patty", "Lettuce", "Jalapeno Peppers"];

export default function ProductForm({
  onClose,
  onAddProduct,
  readOnly = false,
  initialProduct,
}: ProductFormProps) {
  const [name, setName] = useState(initialProduct?.title || "");
  const [ingredients, setIngredients] = useState<string[]>(
    typeof initialProduct?.ingredients === "string"
      ? initialProduct.ingredients.split(", ")
      : options
  );
  const [weight, setWeight] = useState(initialProduct?.weight || "");
  const [calories, setCalories] = useState(initialProduct?.calories || "");
  const [price, setPrice] = useState(initialProduct?.price || "");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    typeof initialProduct?.image === "string" ? initialProduct.image : null
  );
  const [isIcon, setIsIcon] = useState<boolean>(
    initialProduct?.isIcon || false
  );

  const handleIngredientRemove = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Math.random().toString(),
      title: name,
      ingredients: ingredients.join(", "),
      weight,
      calories,
      price,
      image: imageUrl || image,
      category: "Main courses",
      isIcon,
    };
    onAddProduct(newProduct);
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="bg-white py-6 px-8 w-full max-w-md z-30 overflow-y-auto"
      onClick={handleFormClick}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">
        {readOnly ? "Product Details" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block font-medium mb-1">
            Name of the product
          </label>
          <input
            type="text"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-2"
            required
            readOnly={readOnly}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block font-medium mb-1">
            Ingredients
          </label>
          <div className="flex flex-wrap gap-2 border-2 border-gray-300 rounded-lg p-3">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="bg-[#eee] text-gray-800 flex items-center rounded-lg p-1 pr-2 pb-2"
              >
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => handleIngredientRemove(index)}
                  >
                    <IoIosClose size={25} className="pt-1" />
                  </button>
                )}
                {ingredient}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isIcon}
                onChange={(e) => setIsIcon(e.target.checked)}
                className="mr-2 h-8 w-8 rounded-lg"
              />
              <FaLeaf className="text-green-500 -scale-x-125" />
              Suitable for vegans
            </div>
          </label>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="productWeight" className="block font-medium mb-1">
              Weight in grams
            </label>
            <input
              type="number"
              id="productWeight"
              value={weight}
              min={1}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-2"
              readOnly={readOnly}
            />
          </div>
          <div>
            <label htmlFor="calories" className="block font-medium mb-1">
              Calories
            </label>
            <input
              type="number"
              id="calories"
              value={calories}
              min={1}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg p-2"
              readOnly={readOnly}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="block font-medium mb-1">
            Price of the product
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2">$</span>
            <input
              type="number"
              id="productPrice"
              value={price}
              min={1}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-8 border-2 border-gray-300 rounded-lg p-2"
              required
              readOnly={readOnly}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center gap-2">
            <div className="w-full">
              <p className="font-medium mb-1 block">Upload photo</p>
              <p className="text-sm text-gray-500 mb-2 block">JPG, max. 2MB</p>
            </div>
            <label className="flex items-center justify-center gap-4 px-4 py-3.5 bg-gray-200 text-gray-800 font-semibold rounded-lg cursor-pointer w-full">
              <HiUpload size={24} />
              <span>Choose photo...</span>
              <input
                type="file"
                accept=".jpg,.jpeg"
                onChange={handleImageChange}
                className="hidden"
                disabled={readOnly}
              />
            </label>
          </div>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Product Preview"
              className="mt-2 w-full max-h-80 object-contain"
            />
          )}
        </div>
        {!readOnly && (
          <div>
            <button
              type="submit"
              className="flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-900 text-white transition p-3 rounded-lg w-full"
            >
              <div className="flex gap-1">
                <FaPlus size={12} className="mt-1" />
                <PiHamburgerFill size={20} />
              </div>
              Add product to the menu
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
