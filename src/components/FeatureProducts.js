import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import icons from "../ultils/icons";
import { apigetProducts } from "../apis/products";
import {
  apiAddCart,
  apiGetCartById,
  apiGetCategories,
  apiUpdateCart,
} from "../apis";
import PaginationPage from "./pagination/PaginationPage";
import { product } from "../ultils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCartId, updateCart } from "../store/user/userSlice";
import Swal from "sweetalert2";
const { BsHandbagFill, FaHeart, GrView } = icons;
const FeatureProducts = () => {
  const [valueCategories, setValueCategories] = useState(0);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false);
  const pageSize = product.productLimit;
  const userId = useSelector((state) => state.user.userId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await apiGetCategories();
        setCategories(categoriesResponse.data);
      } catch (error) {
        toast.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [pageSize]);

  const handleChange = (event, tabValue) => {
    setValueCategories(tabValue);
    setCurrentPage(1);
    fetchProductByCategory(tabValue);
  };

  const fetchProductByCategory = async (categoryId) => {
    try {
      const productsResponse = await apigetProducts({});
      let filteredProducts = [];
      if (categoryId === 0) {
        filteredProducts = productsResponse.data;
        setShowPagination(true);
      } else {
        filteredProducts = productsResponse.data.filter((product) =>
          product.categories.some((category) => category.id === categoryId)
        );
        setShowPagination(false);
      }
      setProducts(filteredProducts);
    } catch (error) {
      toast.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductByCategory(valueCategories);
  }, [valueCategories, currentPage]);

  const handlePageChange = (newPage) => {
    window.scrollTo({
      top: window.innerHeight + 300,
      behavior: "smooth",
    });
    setCurrentPage(newPage);
  };
  const totalPages = Math.ceil(products.length / pageSize);
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "You need to log in to add products to the cart!",
      });
      return;
    }
  
    try {
      let cartResponse = await apiGetCartById(userId);
      let cart = cartResponse.data.cartDetails;
      const productIndex = cart.findIndex((item) => item.product.id === product.id);
      if (cart && productIndex !== -1) {
        let data = [];
        cart.map((item) => data.push({ productId: item.product.id, quantity: item.quantity }));
        data[productIndex].quantity += 1;
        await apiUpdateCart({
          accountId: userId,
          cartDetails: data
        });
        Swal.fire({
          icon: "success",
          title: "Update product to cart successfully!",
        });
      } else {
        let data = [];
        cart.map((item) => data.push({ productId: item.product.id, quantity: item.quantity }));
        data.push({ productId: product.id, quantity: 1 });
        await apiUpdateCart({ accountId: userId, cartDetails: data });
        Swal.fire({
          icon: "success",
          title: "Add product to cart successfully!",
        });
      }
      const res = await apiGetCartById(userId);
      const cartId = res.data?.id; 
      dispatch(setCartId(cartId)); 
      dispatch(updateCart({ cartDetails: res.data?.cartDetails }));
    } catch (error) {
      if (error.statusCode === 404) {
        await apiAddCart({ accountId: userId, cartDetails: [{ productId: product.id, quantity: 1 }] });
        Swal.fire({
          icon: "success",
          title: "Add product to cart successfully!",
        });
        const res = await apiGetCartById(userId);
        const cartId = res.data?.id; 
        dispatch(setCartId(cartId));
        dispatch(updateCart({ cartDetails: res.data?.cartDetails }));
      } else {
        toast.error("Cannot update cart");
        console.error("Error updating cart:", error);
      }
    }
  };
  
  const handleProductClick = (productId) => {
    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: "smooth",
    });
    navigate(`/product/${productId}`);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center columns-3">
      <div className="text-center">
        <h3 className="text-[36px] font-bold py-2">Feature Products</h3>
        <div className="border-b-4 border-[#7fad39] w-20 mx-auto"></div>
      </div>

      <div className="mt-8">
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Tab
            label="All"
            value={valueCategories}
            selected={valueCategories === 0}
            onChange={(event) => handleChange(event, 0)}
            sx={{
              borderBottom: valueCategories === 0 ? 2 : 0,
              borderColor: valueCategories === 0 ? "#7fad39" : "",
            }}
          />
          <Box sx={{ width: "calc(100% - 100px)", maxWidth: "800px" }}>
            <Tabs
              value={valueCategories}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ width: "100%" }}
              TabIndicatorProps={{
                style: {
                  backgroundColor:
                    valueCategories === 0 ? "transparent" : "#7fad39",
                },
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  value={category.id}
                  sx={{ color: "black !important" }}
                />
              ))}
            </Tabs>
          </Box>
        </Box>
      </div>

      <div className="mt-8 flex flex-auto flex-wrap cursor-pointer">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="flex flex-col items-center justify-center p-3 relative group"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-[270px] h-[270px] object-cover"
              />
              <div className="absolute top-[50px] left-2 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 hover:animate-slide-top">
                <GrView className="m-1 text-black hover:text-white hover:bg-[#7fad39] bg-white rounded-full  border-black mr-5 w-10 h-10 p-3 shadow-md hover:shadow-none cursor-pointer" />
                <FaHeart className="m-1 text-black hover:text-white hover:bg-[#7fad39] bg-white rounded-full  border-black mr-5 w-10 h-10 p-3 shadow-md hover:shadow-none cursor-pointer" />
                <BsHandbagFill
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="m-1 text-black hover:text-white hover:bg-[#7fad39] bg-white rounded-full border-black mr-5 w-10 h-10 p-3 shadow-md hover:shadow-none cursor-pointer"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="mt-2">{product.name}</span>
                <h5 className="mt-2 font-bold text-lg">${product.price}</h5>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-4 text-[24px] font-bold">
            This category does not have products.
          </div>
        )}
      </div>
      <div className="mt-20 w-full">
        {showPagination && (
          <div className="flex justify-end">
            <PaginationPage
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default FeatureProducts;
