import "../../../global_style/style.css";

const SlideIn = ({ children, startAnimation }) => {
  const transitionProperties = startAnimation
    ? { marginTop: "8px", opacity: 1 }
    : {};
  return (
    <div class="slideIn" style={transitionProperties}>
      {children}
    </div>
  );
};
export default SlideIn;
