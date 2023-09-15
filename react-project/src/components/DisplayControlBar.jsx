import "./components_css/DisplayControlBar.css";

const DisplayControlBar = ({ setDisplayType }) => {
  return (
    <div className="display-buttons">
      <button onClick={() => setDisplayType("card")}>Cards</button>
      <button
        onClick={() => {
          console.log("List button clicked!");
          setDisplayType("list");
        }}
      >
        List
      </button>
      <button onClick={() => setDisplayType("slide")} className="slide-btn">
        Slide
      </button>
    </div>
  );
};

export default DisplayControlBar;
