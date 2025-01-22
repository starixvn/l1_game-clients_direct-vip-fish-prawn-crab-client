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

    @render(gc.GameConfigs.GameConfigStore, (store) => store.odds)
    renderOdds(odds: any) {
        Object.keys(odds).forEach((key) => {
            const node = this.labelContainer.getChildByName(key);
            const label = node.getComponent(Label);
            label.string = `1:${odds[key]}`;
        });
    }
}
