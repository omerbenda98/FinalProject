import { IconButton, Tooltip } from "@mui/material";
import { Fragment } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./components_css/AdoptionCard.css";

const AdoptionCard = ({
  name,
  age,
  breed,
  description,
  country,
  city,
  phone,
  email,
  id,
  imgUrl,
  userId,
  tokenId,
  onDelete,
}) => {
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const isBiz = useSelector((bigPie) => bigPie.authSlice.isBiz);
  const isLoggedIn = useSelector((bigPie) => bigPie.authSlice.isLoggedIn);
  const navigate = useNavigate();

  const handleAdoptClick = () => {
    if (isBiz) {
      navigate(`/chats/${userId}/${tokenId}`);
    } else {
      navigate(`/chats/${tokenId}/${userId}`);
    }
  };

  const bizAdminCardLayout = () => {
    if (userId === tokenId) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditBtnClick = () => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteBtnClick = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      onDelete(id);
      toast.success("Card Deleted");
    } catch (err) {
      toast.error("Error, can delete card");
      console.log("error when deleting", err.response.data);
    }
  };

  return (
    <div className="adoptionCard">
      <div>
        <img src={imgUrl} alt={breed} className="cardImg"></img>
      </div>
      <div className="cardTop">
        <div>
          <span className="cardName">My Name : {name}</span>
          <p className="cardDescription">My Age : {age}</p>
          <p className="cardDescription"> My Breed : {breed}</p>
        </div>
        {/* <p className="cardDescription">{description}</p> */}
        <div>
          <h6 className="cardHeaders">Where Do I Live :</h6>
          <p className="cardDescription">Country : {country}</p>
          <p className="cardDescription">City : {city}</p>
        </div>
      </div>
      <h6 className="cardHeaders">Contact Information :</h6>
      <p className="cardDescription">Phone : {phone}</p>
      <p className="cardDescription">Email : {email}</p>

      <div className="cardButtons">
        {(isBiz || isAdmin) && (
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDeleteBtnClick(id)}
              style={{ color: "lightgray" }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {bizAdminCardLayout() && (
          <Fragment>
            <Tooltip title="Edit">
              <IconButton
                onClick={handleEditBtnClick}
                style={{ color: "lightgray" }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Fragment>
        )}
      </div>
      {isLoggedIn ? (
        <button onClick={handleAdoptClick} className="adoptBtn">
          ADOPT!
        </button>
      ) : (
        <p>Must Be Registered To Adopt!</p>
      )}
    </div>
  );
};

// AdoptionCard.propTypes = {
//   id: PropTypes.string,
//   img: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   subTitle: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   onDelete: PropTypes.func,
//   onEdit: PropTypes.func,
//   onFavorite: PropTypes.func,
//   canEdit: PropTypes.bool,
// };

// AdoptionCard.defaultProps = {
//   img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
//   subTitle: "",
//   canEdit: false,
// };

export default AdoptionCard;
