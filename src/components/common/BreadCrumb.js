import * as React from "react";
import {  Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const BreadCrumb = ({ crumbs = [], title }) => {
return (
    <div className="relative w-full">
      <img
        src="https://preview.colorlib.com/theme/ogani/img/breadcrumb.jpg.webp"
        style={{ width: "100%" }}
        alt="breadcrumb"
        className="w-full h-[164px]"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-[46px] mb-8 font-bold">{title}</h1>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ color: "white !important" }}
          className="flex justify-center"
        >
          {crumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index === crumbs.length - 1 ? (
                <Typography sx={{ color: "white !important" }}>{crumb.name}</Typography>
              ) : (
                <Link component={RouterLink} color="inherit" to={crumb.path}>
                  {crumb.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </Breadcrumbs>
      </div>
    </div>
  );
};
export default BreadCrumb;