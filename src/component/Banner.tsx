import IMG1 from "../assets/kelloggs-logo-1.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: '2rem',
        padding: "0"
      }}
    >
      <img src={IMG1} alt="" width={"40%"} />
      <ul style={{padding:"0"}}>
        <li>
          <input type="checkbox" />
          <div className="letter" >i</div >
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">D</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">o</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">c</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">s</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">R</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">e</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">s</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">o</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">l</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">u</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">t</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">i</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">o</div>
        </li>
        <li>
          <input type="checkbox" />
          <div className="letter">n</div>
        </li>
      </ul>
    </div>
  );
};

export default Banner;
