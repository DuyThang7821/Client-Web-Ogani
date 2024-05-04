/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiPhoneFill } from "react-icons/ri";
import {
  BreadCrumb,
  ButtonParrent,
  ButtonQuantity,
  Sidebar,
  TabsParrent,
} from "../../components";
import icons from "../../ultils/icons";
import { useParams } from "react-router-dom";
import { apiGetProductById, apigetProducts } from "../../apis/products";
import { product } from "../../ultils/constants";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { apiAddCart, apiGetCartById, apiUpdateCart } from "../../apis";
import { setCartId, updateCart } from "../../store/user/userSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const pageTitle = "Ogani shop";
const { FaHeart, FaFacebook, FaLinkedinIn, FaTwitter, GrView, BsHandbagFill } =
  icons;
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};
const DetailProducts = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const { productId } = useParams();
  const userId = useSelector((state) => state.user.userId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async (id) => {
      try {
        const response = await apiGetProductById(id);
        const productDetails = response.data;
        setProductDetails(productDetails);
        fetchRelatedProducts(
          productDetails.categories.map((category) => category.id)
        );
      } catch (error) {
        console.error("Cannot get product data", error);
      }
    };

    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchRelatedProducts = async (categoryIds) => {
    try {
      const allProductsResponse = await apigetProducts({});
      const relatedProducts = allProductsResponse.data
        .filter((product) => {
          return (
            product.id !== productId &&
            product.categories.some((category) =>
              categoryIds.includes(category.id)
            )
          );
        })
        .slice(0, 4);
      setRelatedProducts(relatedProducts);
    } catch (error) {
      console.error("Cannot get related products", error);
    }
  };

  if (!productDetails) {
    return null;
  }
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: productDetails.name, path: `/product/${productId}` },
  ];

  const handleClickThumbnail = (imageUrl) => {
    setCurrentImage(imageUrl);
  };
  const handleAddToCart = async (relatedProduct, quantity) => {
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
      const productIndex = cart.findIndex(
        (item) => item.product.id === relatedProduct.id
      );
      if (cart && productIndex !== -1) {
        let data = [];
        cart.map((item) =>
          data.push({ productId: item.product.id, quantity: item.quantity })
        );
        data[productIndex].quantity += quantity;
        await apiUpdateCart({
          accountId: userId,
          cartDetails: data,
        });
        Swal.fire({
          icon: "success",
          title: "Update product to cart successfully!",
        });
      } else {
        let data = [];
        cart.map((item) =>
          data.push({ productId: item.product.id, quantity: item.quantity })
        );
        data.push({ productId: relatedProduct.id, quantity: quantity });
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
      setQuantity(1);
    } catch (error) {
      if (error.statusCode === 404) {
        await apiAddCart({
          accountId: userId,
          cartDetails: [{ productId: relatedProduct.id, quantity: quantity }],
        });
        Swal.fire({
          icon: "success",
          title: "Add product to cart successfully!",
        });
        const res = await apiGetCartById(userId);
        const cartId = res.data?.id;
        dispatch(setCartId(cartId));
        dispatch(updateCart({ cartDetails: res.data?.cartDetails }));
        setQuantity(1);
      } else {
        toast.error("Cannot update cart");
      }
    }
  };

  const handleRelatedProductClick = (relatedProductId) => {
    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: "smooth",
    });
    navigate(`/product/${relatedProductId}`);
  };
  return (
    <div className="w-full">
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto pr-10">
          <Sidebar defaultExpanded={false} />
        </div>

        <div className="flex flex-col gap-5 pl-10 w-[75%] flex-auto">
          <form className="flex">
            <div className="w-[170px] h-[50px] border flex items-center justify-center">
              <span className="p-2">All Categories</span>
              <RiArrowDropDownLine size={24} cursor="pointer" />
            </div>
            <input
              className="w-[350px] h-[50px] border p-2"
              placeholder="What do you need ?"
            />
            <button
              className="font-bold w-[100px] h-[50px] bg-[#7fad39] text-white px-4 py-2 mr-5"
              type="submit"
            >
              SEARCH
            </button>

            <div class="flex items-center p-2">
              <div class="px-2">
                <RiPhoneFill
                  color="#7fad39"
                  size={24}
                  class="border rounded-full bg-gray-200 flex items-center w-12 h-[50px] justify-center px-3 -mt-2 mr-5"
                />
              </div>
              <div>
                <h5 className="font-bold text-[20px] -mt-2">0826257475</h5>
                <span className="text-gray-500">Support 24/7 time</span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10 w-full">
        <BreadCrumb crumbs={breadcrumbs} title={pageTitle} />
      </div>
      <div className="mt-20 flex w-main h-full">
        <div className="w-[50%]">
          <img
            src={currentImage || productDetails.images[0]}
            className="w-[555px] h-[575px]"
          />
          <div className="w-[458px] mx-10 mt-5">
            {productDetails?.images.length > 1 ? (
              <Slider className="image-slider" {...settings}>
                {productDetails?.images.map((image, index) => (
                  <div key={index} className="px-2">
                    <img
                      onClick={() => handleClickThumbnail(image)}
                      src={image}
                      alt={`Product Image ${index}`}
                      className="cursor-pointer border h-[120px] w-[200px] object-cover outline-none"
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img
                src={productDetails?.images[0]}
                alt={`Product Image 0`}
                className="cursor-pointer border h-[120px] w-[100px] object-cover outline-none"
              />
            )}
          </div>
        </div>
        <div className="w-[50%]">
          <h3 className="font-bold text-[30px] p-2">{productDetails.name}</h3>
          <span className="font-semibold text-red-500 p-2 text-[30px]">
            ${productDetails.price}
          </span>
          <p className="p-2 text-gray-500">{productDetails.description}</p>

          <div className="mt-5 flex p-2">
            <div className="mx-2">
              <ButtonQuantity quantity={quantity} setQuantity={setQuantity} />
            </div>
            <div className="mx-2">
              <ButtonParrent
                onClick={() => handleAddToCart(productDetails, quantity)}
              >
                Add to Cart
              </ButtonParrent>
            </div>

            <div className="bg-gray-100 w-[50px] h-[50px] mx-2 flex justify-center items-center cursor-pointer rounded-md">
              <FaHeart className="text-black" />
            </div>
          </div>

          <div className="border-t-2 mt-10 p-2">
            <div className="mt-10">
              <ul className="grid grid-cols-2">
                <li className="mb-2">
                  <span className="font-bold">Availability</span>
                </li>
                <li className="mb-2">
                  <span>{productDetails.availability}</span>
                </li>
                <li className="mb-2">
                  <span className="font-bold">Shipping</span>
                </li>
                <li className="mb-2">
                  <span>{productDetails.shipping}</span>
                </li>
                <li className="mb-2">
                  <span className="font-bold">Weight</span>
                </li>
                <li className="mb-2">
                  <span>{productDetails.weight} kg</span>
                </li>
                <li className="mb-2">
                  <span className="font-bold">Share on</span>
                </li>
                <li className="mb-2">
                  <span className="flex">
                    <FaFacebook className="mr-8" size={16} />
                    <FaTwitter className="mr-8" size={16} />
                    <span className="relative">
                      <FaLinkedinIn size={16} className="mr-2" />
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center flex justify-center">
        <TabsParrent />
      </div>

      <div className="mt-10">
        <div className="text-center">
          <h3 className="text-[36px] font-bold py-2">Related Product</h3>
          <div className="border-b-4 border-[#7fad39] w-20 mx-auto"></div>
        </div>
        <div className="mt-10 flex justify-around flex-wrap">
          {relatedProducts
            .slice(0, product.productLimitDetail)
            .map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="w-1/4 p-4 cursor-pointer relative group"
                onClick={() => handleRelatedProductClick(relatedProduct.id)}
              >
                <img
                  src={relatedProduct.images[0]}
                  alt={relatedProduct.name}
                  className="w-full h-auto mb-2"
                />
                <div className="absolute top-[50px] left-2 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 hover:animate-slide-top">
                  <GrView className="m-1 text-black hover:text-white hover:bg-[#7fad39] bg-white rounded-full  border-black mr-5 w-10 h-10 p-3 shadow-md hover:shadow-none cursor-pointer" />
                  <FaHeart className="m-1 text-black hover:text-white hover:bg-[#7fad39] bg-white rounded-full  border-black mr-5 w-10 h-10 p-3 shadow-md hover:shadow-none cursor-pointer" />
                  <BsHandbagFill
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(relatedProduct, 1);
                    }}
                    className="m-1 text-black hover:text-white hover:bg-[#7fad39] bg-white rounded-full border-black mr-5 w-10 h-10 p-3 shadow-md hover:shadow-none cursor-pointer"
                  />
                </div>
                <h5 className="text-center">{relatedProduct.name}</h5>
                <p className="text-center font-bold">${relatedProduct.price}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailProducts;
