const SecondaryButton = ({ label, variant, onClick }) => {
  const baseClasses =
    "text-h3 hover:text-white-200 px-block-secondary-button rounded-full py-3.5 font-bold text-blue-400 hover:bg-blue-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300 focus-visible:outline-offset-2";

  const variants = {
    secondary: "bg-blue-100",
    menu: "bg-blue-light",
  };

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {label}
    </button>
  );
};
export default SecondaryButton;
