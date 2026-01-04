import MenuButton from "../UI/MenuButton";
import MenuSelection from "../UI/MenuSelection";
import Logo from "../UI/Logo";
import { THEMES, GRID_SIZES, PLAYER_LIMITS } from "../../game/constants";
import { range } from "../../utils/range";
import SetupOptionGroup from "./SetupOptionGroup";

export default function SetupScreen({ state, setSettings, startGame }) {
  const { settings } = state;

  return (
    <div className="gap-setup-container flex max-w-2xl flex-col items-center justify-center px-6 py-20 md:px-0">
      {/* logo */}
      <Logo className="fill-white-100 w-width-logo-setup-screen h-height-logo-setup-screen" />

      {/* setup card */}
      <div className="bg-white-100 flex w-full flex-col gap-8 rounded-xs p-6 xl:p-14">
        {/* settings */}
        <div className="flex flex-col gap-6">
          {/* select theme */}
          <SetupOptionGroup label="Select Theme">
            <div className="flex gap-2.5 xl:gap-8">
              <MenuSelection
                label="Numbers"
                isActive={settings.theme === THEMES.NUMBERS}
                onClick={() => setSettings({ theme: THEMES.NUMBERS })}
              />
              <MenuSelection
                label="Icons"
                isActive={settings.theme === THEMES.ICONS}
                onClick={() => setSettings({ theme: THEMES.ICONS })}
              />
            </div>
          </SetupOptionGroup>

          {/* Number of players */}
          <SetupOptionGroup label="Number of Players">
            <div className="flex flex-wrap gap-2.5 xl:gap-5">
              {range(PLAYER_LIMITS.MIN, PLAYER_LIMITS.MAX).map(
                (playerCount) => (
                  <MenuSelection
                    key={playerCount}
                    label={playerCount}
                    isActive={settings.players === playerCount}
                    onClick={() => setSettings({ players: playerCount })}
                  />
                ),
              )}
            </div>
          </SetupOptionGroup>

          {/* Grid size */}
          <SetupOptionGroup label="Grid Size">
            <div className="flex gap-2.5 xl:gap-8">
              <MenuSelection
                label="4x4"
                isActive={settings.gridSize === GRID_SIZES.SMALL}
                onClick={() => setSettings({ gridSize: GRID_SIZES.SMALL })}
              />
              <MenuSelection
                label="6x6"
                isActive={settings.gridSize === GRID_SIZES.LARGE}
                onClick={() => setSettings({ gridSize: GRID_SIZES.LARGE })}
              />
            </div>
          </SetupOptionGroup>
        </div>

        {/* start game */}
        <MenuButton onClick={startGame} />
      </div>
    </div>
  );
}
