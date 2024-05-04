import React, { useEffect } from "react";
import { RiArrowDropDownLine, RiPhoneFill } from "react-icons/ri";
import {
  BreadCrumb,
  ButtonParrent,
  ButtonQuantity,
  Paypal,
  Sidebar,
} from "../../components";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, clearCartId, setCartId } from "../../store/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { apiCreateOder, apiGetCartById, apiUpdateCart } from "../../apis";
import Swal from "sweetalert2";
const pageTitle = "Shopping Cart";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.userId);
  const cartId = useSelector((state) => state.user.cartId); 
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await apiGetCartById(userId);
        const cartId = cartResponse.data?.id; 
        dispatch(setCartId({ cartId }));
        if (!cartResponse.data || !cartResponse.data.cartDetails) {
          dispatch(clearCartId());
          return;
        }
      } catch (error) {
      }
    };
  
    fetchCart();
  }, [userId, cartId, dispatch]);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "/cart" },
  ];
  const cartItems = useSelector((state) => state.user.cart);
  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.quantity * (item.product?.price ?? 0),
    0
  );

  const handleSetQuantity = (index, newQuantity) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    dispatch(updateCart({ cartDetails: updatedCartItems }));
    updateCartOnServer(updatedCartItems);
  };

  const handleRemoveItem = async (index) => {
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    dispatch(updateCart({ cartDetails: updatedCartItems }));
    if (updatedCartItems.length === 0) {
      dispatch(clearCartId());
      await apiUpdateCart({ accountId: userId, cartDetails: [] });
    } else {
      await updateCartOnServer(updatedCartItems);
    }
  };

  const updateCartOnServer = async (cartDetails) => {
    try {
      const updateData = cartDetails
        .map((detail) => ({
          productId: detail.product?.id,
          quantity: detail.quantity,
          accountId: userId,
        }))
        .filter((detail) => detail.productId);

      if (updateData.length > 0) {
        const response = await apiUpdateCart({
          accountId: userId,
          cartDetails: updateData,
        });
        dispatch(updateCart({ cartDetails: response.data.cart }));
      }
    } catch (error) {
      console.error("Error updating cart on server:", error);
    }
  };
  const handleCheckout = async () => {
    try {
      await apiCreateOder(cartId);
      Swal.fire("Congratulations!", "You have successfully placed your order", "success").then(
        () => {
          dispatch(clearCartId());
          navigate("/");
        }
      );
    } catch (error) {
      console.error("Error creating order:", error);
      Swal.fire("Oops!", "There was an error when ordering", "error");
    }
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    navigate(`/${path.HOME}`);
    window.scrollTo(0, 0);
  };
  if (!isLoggedIn) {
    navigate("/");
    return null;
  }
  if (cartItems.length === 0) {
    return (
      <div className="w-full">
        <h1 className="text-center text-2xl mt-10">
          Your cart is empty. Please go back shopping :D.
        </h1>
        <div className="flex justify-center mt-5">
          <Link onClick={handleContinueShopping}>
            <ButtonParrent className="p-3 bg-[#7fad39] text-white font-bold rounded-md">
              Continue Shopping
            </ButtonParrent>
          </Link>
        </div>
      </div>
    );
  }
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

            <div className="flex items-center p-2">
              <div className="px-2">
                <RiPhoneFill
                  color="#7fad39"
                  size={24}
                  className="border rounded-full bg-gray-200 flex items-center w-12 h-[50px] justify-center px-3 -mt-2 mr-5"
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
      <div className="w-full mt-20">
        <div className="flex flex-col w-main mx-auto my-8">
          <div className="w-main mx-auto font-bold py-3  grid grid-cols-10 border-b-2">
            <span className="col-span-4 w-full text-left font-bold text-[20px]">
              Products
            </span>
            <span className="col-span-2 w-full mx-5 font-bold text-[20px]">
              Price
            </span>
            <span className="col-span-2 w-full mx-5 font-bold text-[20px]">
              Quantity
            </span>
            <span className="col-span-2 w-full mx-5 font-bold text-[20px]">
              Total
            </span>
          </div>
          <div>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-10 items-center mt-5 border-b-2"
              >
                <div className="col-span-4 flex items-center mb-5">
                  <img
                    src={item.product?.images?.[0] || "error images"}
                    alt={item.product?.name || "Error"}
                    className="w-[101px] h-[100px]"
                  />
                  <span className="mx-5">
                    {item.product?.name || "Product name unavailable"}
                  </span>
                </div>
                <span className="col-span-2 w-full mx-5">
                  ${item.product?.price?.toFixed(2) || "Price unavailable"}
                </span>
                <div className="col-span-2 w-full flex items-center">
                  <ButtonQuantity
                    quantity={item.quantity}
                    setQuantity={(newQuantity) =>
                      handleSetQuantity(index, newQuantity)
                    }
                  />
                </div>
                <span className="col-span-1 w-full mx-5">
                  ${(item.quantity * (item.product?.price || 0)).toFixed(2)}
                </span>
                <div className="col-span-1 text-right mx-5">
                  <CloseIcon
                    onClick={() => handleRemoveItem(index)}
                    sx={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <Link onClick={handleContinueShopping}>
            <ButtonParrent className="p-3 bg-[#7fad39] text-white font-bold rounded-md">
              Continue Shopping
            </ButtonParrent>
          </Link>
          <ButtonParrent
            className="p-3 bg-[#7fad39] text-white font-bold rounded-md"
            onClick={handleCheckout}
          >
            Checkout
          </ButtonParrent>
          <div className="bg-gray-100 w-[555px] h-[300px] p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-[24px] text-center">Cart Total</h3>
              <div className="flex justify-between mt-10">
                <span className="font-bold text-[20px]">Total:</span>
                <span className="font-bold text-[20px] text-red-500">
                  ${totalPrice}
                </span>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <Paypal
                amount={totalPrice}
                payload={{ userId, cartItems, cartId }}
                handleCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
