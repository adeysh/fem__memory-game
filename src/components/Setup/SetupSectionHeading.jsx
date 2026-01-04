const SetupSectionHeading = ({ label, className = "" }) => {
  if (!label) return null;

  return (
    <h2
      className={`text-menu-selection-label font-bold text-blue-300 ${className}`}
    >
      {label}
    </h2>
  );
};

export default SetupSectionHeading;
