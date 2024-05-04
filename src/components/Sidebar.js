import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import icons from "../ultils/icons";
import { apiGetCategories } from "../apis/app";
import { Link } from "react-router-dom";

const Sidebar = ({ defaultExpanded }) => {
  const [expanded, setExpanded] = useState(defaultExpanded ? "panel1-header" : false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiGetCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { IoMdMenu } = icons;

  return (
    <div className="sidebar">
      <Accordion
        defaultExpanded={defaultExpanded}
        expanded={expanded === "panel1-header"}
        onChange={handleChange("panel1-header")}
        sx={{
          backgroundColor: "#7fad39",
          color: "white",
          position: 'sticky',
          top: '10px', // Adjust this value as needed for your layout
          zIndex: 1000, // Ensures that the Accordion is above other content
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ padding:'5px' }}
        >
          <IoMdMenu size={24} color="white" />
          <Typography sx={{ fontWeight: "bold", marginLeft: '20px' }}>ALL DEPARTMENTS</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            position: 'absolute',
            top: '100%', // Places the AccordionDetails directly under the summary
            width: '100%', // Match the width of the AccordionSummary
            zIndex: 2001, // Make sure the AccordionDetails pops out over other content
            backgroundColor: 'white', // Match your color scheme
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: add shadow for better visibility
          }}
        >
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              style={{
                textDecoration: 'none',
                color: 'black', // Adjust text color as needed
                display: 'block', // Each link is a block-level element
                padding: '8px 16px', // Add padding for better touch targets
              }}
            >
              <Typography>{category.name}</Typography>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Sidebar;