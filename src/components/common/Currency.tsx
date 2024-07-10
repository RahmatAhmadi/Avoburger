import React from "react";
import { useCurrency } from "../../context/currencyContext";

const tomanCurrency = "تومان";

export default function CurrencyDropdown() {
  const currencyContext = useCurrency();

  if (!currencyContext) {
    throw new Error();
  }

  const { currency, setCurrency } = currencyContext;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  return (
    <select
      value={currency}
      onChange={handleChange}
      className="currency-dropdown h-[42px] rounded-xl border border-gray-200 ml-3 px-1"
    >
      <option value="$">$</option>
      <option value={tomanCurrency}>{tomanCurrency}</option>
    </select>
  );
}
