import { createContext, useContext } from "react";
import EventEmitter from "./events";

const GameEventContext = createContext();
const BattleEventContext = createContext();

export const useGameEvent = () => useContext(GameEventContext);
export const useBattleEvent = () => useContext(BattleEventContext);

const EventProvider = ({ children }) => {
    const GameEvent = new EventEmitter();
    const BattleEvent = new EventEmitter();

    return (
        <GameEventContext.Provider value={GameEvent}>
            <BattleEventContext.Provider value={BattleEvent}>
                {children}
            </BattleEventContext.Provider>
        </GameEventContext.Provider>
    );
};

export default EventProvider;
