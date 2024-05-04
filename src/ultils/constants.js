import path from "./path";
import icons from "./icons";
export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "SHOP",
    path: `/${path.SHOPS}`,
  },
  {
    id: 3,
    value: "PAGES",
    path: `/${path.PAGES}`,
  },
  {
    id: 4,
    value: "BLOG",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "CONTACT",
    path: `/${path.CONTACTS}`,
  },
];
const { AiOutlineDashboard, RiBillLine, FaUserCircle } = icons;
export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Profile Information",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <AiOutlineDashboard size={20} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Order History",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <RiBillLine size={20} />,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "Change Password",
    path: `/${path.MEMBER}/${path.CHANGE_PASSWORD}`,
    icon: <FaUserCircle size={20} />,
  },
];
export const message = {
  firstNameRequired: "First name is required",
  lastNameRequired: "Last name is required",
  emailRequired: "Email is required",
  invalidEmailFormat: "Invalid email format",
  phoneRequired: "Phone is required",
  phoneLength: "Phone number needs at least 10 digits",
  phoneFormat: "Phone number is incorrect",
  passwordRequired: "Password is required",
  confirmPasswordRequired: "Confirm Password is required",
  addressRequired: "Address is required",
  passwordLength: "Password needs at least 6 characters, uppercase, lowercase, numbers, and special characters",
  comparePassword: "Confirm Password do not match",
};

export const regex = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  passwordLength: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]+)[A-Za-z\d@$!%*?&]{8,}$/,
  regexPhone: /^(0?3[2-9]|0?5[689]|0?7[06-9]|0?8[1-689]|0?9[0-46-9])[0-9]{7}$/,
};

export const product = {
  productLimit: 8,
  productLimitDetail: 4,
  orderHistoryLimit: 8,
};
export const productInfoTabs = [
  {
    id: 1,
    name: "Description",
    content: `Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. 
    Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.
    Vivamus suscipit tortor eget felis porttitor volutpat. 
    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. 
    Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. 
    Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. 
    Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. 
    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. 
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
    `,
  },

  {
    id: 2,
    name: "Infomation",
    content: `Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. 
    Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. 
    Vivamus suscipit tortor eget felis porttitor volutpat. 
    Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. 
    Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. 
    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. 
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
    Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.
    `,
  },

  {
    id: 3,
    name: "Reviews(1)",
    content: `Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. 
    Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. 
    Vivamus suscipit tortor eget felis porttitor volutpat. 
    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. 
    Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. 
    Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. 
    Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. 
    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. 
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
    Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.
    `,
  }
];
export const titlePage = [
  {
    id: 1,
    title: 'Ogani shop',
  },

  {
    id: 2,
    title: 'Shopping cart',
  },
]

