import React, { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CiCalendar } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
const Blogs = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
        <h3 className="text-[36px] font-bold pt-10 mx-4">From the Blog</h3>
        <div class="border-b-4 border-[#7fad39] w-20 mx-auto mb-10"></div>


      <div className="flex">
        <Card sx={{ maxWidth: 360 }} className="mr-5">
          <CardActionArea>
            <CardMedia
              component="img"
              height="258"
              image="https://preview.colorlib.com/theme/ogani/img/blog/blog-1.jpg.webp"
              alt="green iguana"
            />
            <CardContent>
              <div className="flex mb-5">
                <CiCalendar size={24} style={{ opacity: 0.5 }} />
                <span style={{ marginRight: "20px", opacity: 0.5 }}>
                  May 4, 2019
                </span>
                <FiMessageCircle size={24} style={{ opacity: 0.5 }} />
                <span style={{ marginLeft: "5px", opacity: 0.5 }}>5</span>
              </div>

              <Typography gutterBottom variant="h5" component="div">
                <span className="font-bold">
                  Cooking tips make cooking simple
                </span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 360 }} className="mr-5">
          <CardActionArea>
            <CardMedia
              component="img"
              height="258"
              image="https://preview.colorlib.com/theme/ogani/img/blog/blog-2.jpg.webp"
              alt="green iguana"
            />
            <CardContent>
              <div className="flex mb-5">
                <CiCalendar size={24} style={{ opacity: 0.5 }} />
                <span style={{ marginRight: "20px", opacity: 0.5 }}>
                  May 4, 2019
                </span>
                <FiMessageCircle size={24} style={{ opacity: 0.5 }} />
                <span style={{ marginLeft: "5px", opacity: 0.5 }}>5</span>
              </div>
              <Typography gutterBottom variant="h5" component="div">
                <span className="font-bold">6 ways to prepare breakfast for 30</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ maxWidth: 360 }} className="mr-5">
          <CardActionArea>
            <CardMedia
              component="img"
              height="258"
              image="https://preview.colorlib.com/theme/ogani/img/blog/blog-3.jpg.webp"
              alt="green iguana"
            />
            <CardContent>
              <div className="flex mb-5">
                <CiCalendar size={24} style={{ opacity: 0.5 }} />
                <span style={{ marginRight: "20px", opacity: 0.5 }}>
                  May 4, 2019
                </span>
                <FiMessageCircle size={24} style={{ opacity: 0.5 }} />
                <span style={{ marginLeft: "5px", opacity: 0.5 }}>5</span>
              </div>
              <Typography gutterBottom variant="h5" component="div">
                <span className="font-bold">Visit the clean farm in the US</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default memo(Blogs);
