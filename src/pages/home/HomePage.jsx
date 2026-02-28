import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";
import { useSearchParams } from "react-router";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchHomeData = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";
      const response = await axios.get(urlPath);

      setProducts(response.data);
    };

    fetchHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
