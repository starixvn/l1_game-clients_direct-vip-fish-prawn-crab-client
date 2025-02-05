import gc from "@sg/game-client-base";
import { _decorator, Label, Node } from "cc";
import { ObserverComponent } from "db://shared-components/shared/common-components/observer-component/scripts/observer-component";
import Observer from "observer";
const { ccclass, property } = _decorator;
const { render } = Observer;
@ccclass("GameOdd")
export class GameOdd extends ObserverComponent {
    @property(Node)
    labelContainer: Node = null;

    @render(gc.Rounds.RoundStore, (store) => store.roundOdds)
    renderOdds(roundOdds: gc.Rounds.RoundOdds) {
        const { odds, fractional } = roundOdds;
        if (!odds) {
            return;
        }
        Object.keys(odds).forEach((key) => {
            const node = this.labelContainer.getChildByName(key);
            const label = node.getComponent(Label);
            label.string = gc.FormatUtils.formatOdds(odds[key], fractional);
        });
    }
}
