import { useDispatch } from "react-redux";
import { openModal } from "../../store/productDetailsModal.slice/productDetailsModalSlice";
import { useCurrency } from "../../context/currencyContext";
import { FaEye, FaCog, FaLeaf } from "react-icons/fa";

interface ProductProps {
  id: string;
  image: string;
  title: string;
  weight: string;
  ingredients: string;
  price: string;
  isIcon?: boolean;
  onViewDetails: () => void;
}

export default function Product({
  id,
  image,
  title,
  weight,
  ingredients,
  price,
  isIcon = false,
  onViewDetails,
}: ProductProps) {
  const dispatch = useDispatch();
  const { currency } = useCurrency();

  const handleEyeClick = () => {
    dispatch(
      openModal({
        product: { id, image, title, weight, ingredients, price },
        mode: "view",
      })
    );
    onViewDetails();
  };

  const handleCogClick = () => {
    dispatch(
      openModal({
        product: { id, image, title, weight, ingredients, price },
        mode: "edit",
      })
    );
  };

  return (
    <div className="bg-white rounded-xl overflow-visible w-64 h-[300px] text-center relative pt-16">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3">
        <img src={image} alt={title} className="object-cover" />
      </div>
      {isIcon && (
        <div className="absolute top-3 right-5 text-green-500 -scale-x-125">
          <FaLeaf />
        </div>
      )}
      <div className="p-5 pt-10">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{weight}</p>
        <p className="text-gray-600 mb-4">{ingredients}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">
            {currency === "$" ? "$" : "تومان"}
            {price}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleEyeClick}
              className="p-2.5 rounded-md border"
            >
              <FaEye />
            </button>
            <button
              className="p-2.5 rounded-md border border-gray-200"
              onClick={handleCogClick}
            >
              <FaCog />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
