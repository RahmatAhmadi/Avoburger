import { useState } from "react";
import SearchBar from "../components/Searchbar";
import CategoryFilter from "../components/CategoryFilter";
import Product from "../components/Product";
import ProductFormModal from "../components/ProductForm/ProductFormModal";
import ProductDetailModal from "../components/ProductForm/ProductDetailsModal";
import CurrencyDropdown from "../components/common/Currency";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { openModal } from "../store/showForm.slice/showFormSlice";
import { RootState } from "../store";
import { productsData } from "../data";
import { FaPlus } from "react-icons/fa";
import { PiBowlFoodFill, PiHamburgerFill } from "react-icons/pi";
import { RiDrinks2Fill } from "react-icons/ri";
import { LuIceCream2 } from "react-icons/lu";
import { ProductProps } from "../types";

const categories = [
  { name: "Main courses", icon: <PiHamburgerFill size={24} /> },
  { name: "Side dishes", icon: <PiBowlFoodFill size={24} /> },
  {
    name: "Drinks",
    icon: <RiDrinks2Fill size={24} className="-scale-x-100" />,
  },
  { name: "Other", icon: <LuIceCream2 size={24} /> },
];

const initialProduct: ProductProps = {
  id: "",
  category: "",
  title: "",
  ingredients: "Wheat bun, Veggie Patty, Lettuce, Jalapeno Peppers",
  weight: "",
  calories: "",
  price: "",
  image: null,
  isIcon: false,
};

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("Main courses");
  const [query, setQuery] = useState("");
  const [showProductFormModal, setShowProductFormModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const allProducts = [
    ...productsData,
    ...useSelector((state: RootState) => state.products.products),
  ];

  const filteredProducts = allProducts
    .filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.ingredients.toLowerCase().includes(query.toLowerCase())
    )
    .filter((product) => product.category === activeCategory);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    updateSearchQuery({ category });
  };

  const handleQueryChange = (query: string) => {
    setQuery(query);
    updateSearchQuery({ q: query });
  };

  const updateSearchQuery = (params: { [key: string]: string }) => {
    const searchParams = new URLSearchParams(location.search);

    for (const key in params) {
      if (params[key]) {
        searchParams.set(key, params[key]);
      } else {
        searchParams.delete(key);
      }
    }

    navigate({ pathname: location.pathname, search: searchParams.toString() });
  };

  const handleAddProduct = () => {
    setShowProductFormModal(true);
  };

  const handleViewProductDetails = (productId: string) => {
    dispatch(openModal(productId));
  };

  return (
    <section className="bg-gray-100 h-full px-10 pt-5">
      <div className="flex">
        <SearchBar query={query} onQueryChange={handleQueryChange} />
        <CurrencyDropdown />
      </div>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      <div className="grid grid-cols-4 gap-y-9 gap-x-[60px]">
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            {...product}
            onViewDetails={() => handleViewProductDetails(product.id)}
          />
        ))}
        <button
          className="flex flex-col justify-center items-center bg-transparent border border-gray-300 rounded-xl overflow-visible w-64 text-center relative cursor-pointer font-bold"
          onClick={handleAddProduct}
        >
          <FaPlus />
          <p className="mt-2">
            Add new <br /> product
          </p>
        </button>
      </div>
      {showProductFormModal && (
        <ProductFormModal
          product={initialProduct}
          onClose={() => setShowProductFormModal(false)}
        />
      )}
      <ProductDetailModal />
    </section>
  );
}
