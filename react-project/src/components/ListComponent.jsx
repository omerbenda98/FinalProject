import "./components_css/ListComponent.css";
import "../pages/pages_css/Neon.css";
import { useNavigate } from "react-router-dom";

const ListComponent = ({ name, img, height, weight, lifeSpan, origin, id }) => {
  const navigate = useNavigate();

  const handleSelectBreedBtnClick = async () => {
    navigate(`/breed/${id}`);
  };
  return (
    <div className="list-item">
      <div className="icon">
        <img src={img} alt="image" className="list-img"></img>
        <div className="neon">origin : {origin}</div>
      </div>
      <div className="list-content">
        <span className="list-title neon">Breed : {name}</span>
        <div className="list-desc">
          <div>height : {height} CM</div>
          <div>weight : {weight.metric}</div>
          {/* <p>lifeSpan : {lifeSpan}</p> */}

          <div>lifeSpan : {lifeSpan}</div>
        </div>
      </div>

      <div className="list-end">
        <button className="see-more" onClick={handleSelectBreedBtnClick}>
          See More About {name}
        </button>
      </div>
    </div>
  );
};

export default ListComponent;
