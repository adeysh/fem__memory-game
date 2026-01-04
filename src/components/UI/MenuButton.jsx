const MenuButton = ({
  label = "Start Game",
  onClick,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "text-h2 px-inline-menu-button-big py-block-menu-button-big font-bold cursor-pointer rounded-md bg-orange text-white-200 hover:bg-orange-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300 focus-visible:outline-offset-2";

  return (
    <button
      type={type}
      aria-label={label}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {label}
    </button>
  );
};

export default MenuButton;
