import React from "react";
import {
  Sidebar,
  Banner,
  FeatureProducts,
  HotProduct,
  Blogs,
} from "../../components/";
import Slider from "react-slick";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiPhoneFill } from "react-icons/ri";
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};
const Home = () => {
  return (
    <div className="w-full">
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto pr-10">
          <Sidebar defaultExpanded={true} />
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
          <Banner />
        </div>
      </div>
      <div className="mt-10 w-full">
        <Slider {...settings}>
          <div className="flex flex-col items-center justify-center p-2 h-[50px] relative">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/categories/cat-5.jpg.webp"
              alt="img1"
            />
            <div className="absolute top-[220px] left-[42px]  w-[200px]  items-center h-full bg-white flex flex-auto  justify-center p-2 rounded z-10">
              <h5>
                <a className="font-bold" href="abc">
                  DREAD FOOD
                </a>
              </h5>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-2 h-[50px] relative">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/categories/cat-4.jpg.webp"
              alt="img2"
            />
            <div className="absolute top-[220px] left-[42px]  w-[200px]  items-center h-full bg-white flex flex-auto  justify-center p-2 rounded z-10">
              <h5>
                <a className="font-bold" href="abc">
                  DREAD FOOD
                </a>
              </h5>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 h-[50px] relative">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/categories/cat-1.jpg.webp"
              alt="img3"
            />
            <div className="absolute top-[220px] left-[42px]  w-[200px]  items-center h-full bg-white flex flex-auto  justify-center p-2 rounded z-10">
              <h5>
                <a className="font-bold" href="abc">
                  DREAD FOOD
                </a>
              </h5>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 h-[50px] relative">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/categories/cat-3.jpg.webp"
              alt="img4"
            />
            <div className="absolute top-[220px] left-[42px]  w-[200px]  items-center h-full bg-white flex flex-auto  justify-center p-2 rounded z-10">
              <h5>
                <a className="font-bold" href="abc">
                  DREAD FOOD
                </a>
              </h5>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-2 h-[50px] relative">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/categories/cat-2.jpg.webp"
              alt="img5"
            />
            <div className="absolute top-[220px] left-[42px]  w-[200px]  items-center h-full bg-white flex flex-auto  justify-center p-2 rounded z-10">
              <h5>
                <a className="font-bold" href="abc">
                  DREAD FOOD
                </a>
              </h5>
            </div>
          </div>
          <div className="p-2">
            <img
              src="https://preview.colorlib.com/theme/ogani/img/categories/cat-4.jpg.webp"
              alt="img6"
            />
          </div>
        </Slider>
      </div>

      <div className="my-8">
        <FeatureProducts />
      </div>

      <div className="w-main flex justify-between">
        <img
          src="https://preview.colorlib.com/theme/ogani/img/banner/banner-1.jpg.webp"
          alt="banner1"
        />
        <img
          src="https://preview.colorlib.com/theme/ogani/img/banner/banner-2.jpg.webp"
          alt="banner2"
        />
      </div>

      <div className="w-main mt-8">
        <HotProduct />
      </div>

      <div className="w-main mt-8">
        <Blogs />
      </div>

    </div>
  );
};

export default Home;
