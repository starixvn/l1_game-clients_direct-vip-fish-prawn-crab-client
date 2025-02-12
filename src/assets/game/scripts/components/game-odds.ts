import gc from "@sg/game-client-base";
import { _decorator, Label, Node } from "cc";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";
import Observer from "observer";
const { ccclass, property } = _decorator;
const { render } = Observer;
@ccclass("GameOdd")
export class GameOdd extends ObserverComponent {
    @property(Node)
    oddValues: Node[] = [];

    @render(gc.Rounds.RoundStore, (store) => store.roundOdds)
    renderOdds(roundOdds: gc.Rounds.RoundOdds) {
        const { odds, fractional } = roundOdds;
        if (!odds) {
            return;
        }

        Object.keys(odds).forEach((key) => {
            const oddItem = this.oddValues.find((item) => item.name === key);

            if (oddItem) {
                const label = oddItem.getComponent(Label);
                label.string = gc.FormatUtils.formatOdds(odds[key], fractional);
            }
        });
    }
}
