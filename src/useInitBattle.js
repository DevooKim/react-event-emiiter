import { useEffect, useState } from "react";
import { useBattleEvent, useGameEvent } from "./EventContext";

//NOTE battle과 game의 경계???

const useInitBattle = () => {
    const GameEvent = useGameEvent();
    const BattleEvent = useBattleEvent();

    const [user, setUser] = useState({ A: 100, B: 100, C: 100, D: 100 });
    const [attackCount, setAtt] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            BattleEvent.emit("state", { state: "ready", user, attackCount }); // 여기에 유저가 왜들어감
        }, 1000);
    }, [BattleEvent]);

    const attack = (att, def) => {
        const _user = { ...user };
        _user[def] -= 10;

        GameEvent.emit("attack", {
            att,
            def,
            result: _user,
        });

        setUser(_user);
        setAtt((prev) => prev + 1);
    };

    const fin = () => {
        BattleEvent.emit("state", { state: "end", user, attackCount });
    };

    return {
        attack,
        fin,
    };
};

export default useInitBattle;
