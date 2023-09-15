import { Fragment } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { Box, Grid, Typography } from "@mui/material";

import CardComp from "../components/CardComp";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import ROUTES from "../routes/ROUTES";
import "./pages_css/Neon.css";
import Loader from "../components/Loader";
import AdoptionCard from "../components/AdoptionCard";

const MyCardsPage = () => {
  const [userData, setUserData] = useState(null);
  const [cardsArr, setCardsArr] = useState([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const navigate = useNavigate();
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/cards/my-cards");
        setUserData(data);
        setIsDataEmpty(true);
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, []);
  const onDelete = (id) => {
    setUserData((newCardsArr) => newCardsArr.filter((item) => item._id !== id));
  };
  const handleNavigate = () => {
    navigate(ROUTES.CREATE);
  };
  const getTokenId = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }
    const payload = jwt_decode(token);

    const userId = payload._id;
    return userId;
  };

  if (!userData) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Typography variant="h3" sx={{ textAlign: "center" }} className="neon">
        My Cards
      </Typography>
      {!userData === true ? (
        <Typography variant="h5" sx={{ textAlign: "center" }} className="neon">
          No cards created. Click add button below to add cards.
        </Typography>
      ) : (
        <div className="mycards-container">
          <Grid container spacing={2}>
            {userData.map((item) => (
              <Grid
                item
                xs={10}
                md={6}
                lg={3}
                sx={{
                  ml: { xs: 0, lg: 4, md: 0 },
                }}
                key={item._id + Date.now()}
              >
                <AdoptionCard
                  name={item.name}
                  age={item.age}
                  breed={item.breed}
                  description={item.description}
                  country={item.country}
                  city={item.city}
                  phone={item.phone}
                  email={item.email}
                  id={item._id}
                  imgUrl={item.imageUrl}
                  userId={item.user_id}
                  tokenId={getTokenId()}
                  onDelete={onDelete}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      <IconButton onClick={handleNavigate}>
        <AddCircleIcon
          color="success"
          sx={{
            fontSize: 80,
          }}
        />
      </IconButton>
    </Fragment>
  );
};
export default MyCardsPage;
