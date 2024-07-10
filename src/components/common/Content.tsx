import { ReactNode } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function Content({ children }: Props) {
  return (
    <section className="bg-gray-100 flex flex-col items-center justify-center h-full px-10 pt-5 text-center">
      <div className="bg-white w-2/5 font-semibold p-16 px-20 rounded-lg">
        <h2 className="text-lg mb-2">{children}</h2>
        <p className="text-gray-800">No content yet.</p>
        <div className="mt-3 underline">
          <Link
            to="/products"
            className="flex items-center justify-center gap-3  transition-all group"
          >
            Please visit products page
            <FaArrowRightLong
              size={20}
              className="mt-2 group-hover:text-[#3ec995] transition-all"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
