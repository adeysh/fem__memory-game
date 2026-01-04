import SetupSectionHeading from "./SetupSectionHeading";

const SetupOptionGroup = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-2.5">
      <SetupSectionHeading label={label} />
      {children}
    </div>
  );
};

export default SetupOptionGroup;
