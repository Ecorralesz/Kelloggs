import  IMG1  from '../assets/kelloggs-logo-1.png'

const Banner = () => {
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <img src={IMG1} alt="" width={"40%"}/>
    </div>
  );
};

export default Banner;