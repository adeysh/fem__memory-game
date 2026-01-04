const MenuSelection = ({
  label,
  isActive = false,
  onClick,
  className = "",
}) => {
  const baseClasses =
    "text-menu-selection px-inline-menu-selection py-block-menu-selection cursor-pointer rounded-full font-bold text-white-200 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300 focus-visible:outline-offset-2";

  const activeClasses = "bg-blue-400";
  const inactiveClasses = "bg-blue-100 hover:bg-blue-200";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={isActive}
      className={`${baseClasses} ${
        isActive ? activeClasses : inactiveClasses
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default MenuSelection;
