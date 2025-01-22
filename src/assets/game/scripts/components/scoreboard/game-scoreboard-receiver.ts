import gc from "@sg/game-client-base";
import { _decorator } from "cc";
import { ResultPercentage } from "db://shared-components/game/result-percentage/scripts/result-percentage";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";
import Observer from "observer";
import { GameScoreBoard } from "./game-scoreboard";
const { ccclass, property } = _decorator;
const { render } = Observer;
@ccclass("GameScoreBoardReceiver")
export class GameScoreBoardReceiver extends ObserverComponent {
    @property(ResultPercentage)
    resultPercentage: ResultPercentage = null;

    @property({ type: GameScoreBoard })
    scoreboard: GameScoreBoard = null;

    protected rounds: gc.RoundHistories.RoundHistory[] = [];

    @render(gc.RoundHistories.RoundHistoryStore, (store) => store.histories)
    public render(rounds: gc.RoundHistories.RoundHistory[]) {
        if (!rounds) {
            return;
        }
        const reversedRounds = [...rounds].reverse();

        this.scoreboard.render(reversedRounds);
        this.resultPercentage?.render(reversedRounds);
    }
}
