const OpenLoader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center mobileloader"
      style={{
        position: "fixed", 
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        zIndex: 1050,
        background: "linear-gradient(to bottom right, #f9fafb, #e0e7ff)"
      }}
    >
      <div
        className="load"
        role="status"
        style={{ width: "8rem", height: "8rem" }}
      >
        <img
          src="/inologo2.png"
          alt="logo"
          style={{ width: "8rem", height: "8rem", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};
export default OpenLoader;
