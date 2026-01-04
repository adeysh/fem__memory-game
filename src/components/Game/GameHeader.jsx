import PrimaryButton from "../UI/PrimaryButton";
import SecondaryButton from "../UI/SecondaryButton";
import Logo from "../UI/Logo";

const GameHeader = ({ onMenu, onRestart, onNewGame }) => {
  return (
    <header className="mb-20 flex w-full items-center justify-between px-6 md:mb-40 md:px-0 xl:mb-24">
      <Logo className="w-width-logo-game-screen h-height-logo-game-screen fill-blue-500" />

      {/* Mobile */}
      <PrimaryButton
        label="Menu"
        variant="menu"
        onClick={onMenu}
        className="md:hidden"
      />

      {/* Desktop */}
      <div className="hidden gap-4 md:flex">
        <PrimaryButton label="Restart" variant="menu" onClick={onRestart} />
        <SecondaryButton label="New Game" variant="menu" onClick={onNewGame} />
      </div>
    </header>
  );
};

export default GameHeader;
