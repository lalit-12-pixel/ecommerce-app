const Loader = () => {
 return (
  <div
    className="d-flex justify-content-center align-items-center mobileloader"
    style={{
      top: 0,
      left: 0,
      height: "80vh",
      width: "100vw",
      zIndex: 1050,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    }}
  >
    <div
      className="spinner-border loader"
      role="status"
      style={{ width: "3rem", height: "3rem" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

};
export default Loader;
