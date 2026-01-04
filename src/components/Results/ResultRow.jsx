const ResultRow = ({ label, value, highlight = false, className = "" }) => {
  const containerClasses = highlight
    ? "bg-blue-500 text-white-100"
    : "bg-blue-light";

  const labelClasses = highlight ? "text-white-100" : "text-blue-300";
  const valueClasses = highlight ? "text-white-100" : "text-blue-400";

  return (
    <div
      className={`flex w-full items-center justify-between rounded-[5px] p-4 ${containerClasses} ${className}`}
    >
      <p className={`text-info-label font-bold ${labelClasses}`}>{label}</p>

      <span className={`text-info-detail font-bold ${valueClasses}`}>
        {value}
      </span>
    </div>
  );
};

export default ResultRow;
