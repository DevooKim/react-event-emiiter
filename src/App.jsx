import { useEffect, useState } from "react";
import "./App.css";

import EventProvider, { useBattleEvent, useGameEvent } from "./EventContext";
import useInitBattle from "./useInitBattle";

const App = () => {
    return (
        <EventProvider>
            <Inner />
        </EventProvider>
    );
};

function Inner() {
    const { attack, fin } = useInitBattle();
    const GameEvent = useGameEvent();
    const BattleEvent = useBattleEvent();

    const [game, setGame] = useState({
        players: {},
    });
    const [battle, setBattle] = useState({
        state: "",
        attackCount: 0,
    });

    useEffect(() => {
        BattleEvent.on("state", ({ state, user, attackCount }) => {
            setBattle((prev) => ({ ...prev, state, attackCount }));
            setGame((prev) => ({ ...prev, players: user }));
        });

        GameEvent.on("attack", ({ result }) =>
            setGame((prev) => ({ ...prev, players: result }))
        );
    }, [BattleEvent]);

    return (
        <>
            <h1>state - {battle.state}</h1>
            <button onClick={() => attack("A", "B")}>attack1</button>
            <button onClick={() => attack("A", "D")}>attack2</button>
            <button onClick={() => attack("B", "C")}>attack3</button>
            <button onClick={fin}>fin</button>
            <h3>players - {JSON.stringify(game)}</h3>
            <h3>attackCount - {battle.attackCount}</h3>
        </>
    );
}

export default App;
