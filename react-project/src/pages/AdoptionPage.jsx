import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Typography from "@mui/material/Typography";
import "./pages_css/Neon.css";
import "./pages_css/AdoptionPage.css";
import Loader from "../components/Loader";
import AdoptionCard from "../components/AdoptionCard";

const AdoptionPage = () => {
  const [cardsArr, setCardsArr] = useState(null);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {
        console.log("err from axios", err);
        toast.error("Oops");
      });
  }, []);
  const getTokenId = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    const payload = jwt_decode(token);
    const userId = payload._id;
    return userId;
  };
  const onDelete = (id) => {
    setCardsArr((newCardsArr) => newCardsArr.filter((item) => item.id !== id));
  };

  if (!cardsArr) {
    return <Loader />;
  }

  return (
    <Box className="adoption-container">
      <Box className="AdoptionPageHeader">
        <Typography className="neon" variant="h2">
          Welcome to the adoption page!
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          className="neon"
          sx={{ mt: 2, mb: 2, color: "white" }}
        >
          Here you can Explore and find a dog to adopt.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid
            item
            xs={10}
            md={6}
            lg={3}
            sx={{ ml: { xs: 4, lg: 8, md: 3 } }}
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
              tokenId={getTokenId()}
              userId={item.user_id}
              onDelete={onDelete}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdoptionPage;
