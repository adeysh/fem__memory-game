const PrimaryButton = ({ label, variant, onClick, className }) => {
  const baseClasses =
    "bg-orange text-h3 text-white-200 hover:bg-orange-hover rounded-full font-bold cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300 focus-visible:outline-offset-2";

  const variants = {
    primary: "px-block-primary-button py-3.5",
    menu: "px-inline-primary-menu-button py-block-primary-menu-button",
  };

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
};
export default PrimaryButton;
