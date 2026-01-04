import PrimaryButton from "../UI/PrimaryButton";
import SecondaryButton from "../UI/SecondaryButton";

const GameMenuModal = ({ onClose, onRestart, onNewGame }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black px-12 opacity-50"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="bg-white-200 relative z-10 flex max-w-md flex-col gap-4 rounded-xs p-6 md:gap-6 md:p-8">
        <PrimaryButton label="Restart" variant="primary" onClick={onRestart} />

        <SecondaryButton label="New Game" variant="menu" onClick={onNewGame} />

        <SecondaryButton label="Resume Game" variant="menu" onClick={onClose} />
      </div>
    </div>
  );
};

export default GameMenuModal;
