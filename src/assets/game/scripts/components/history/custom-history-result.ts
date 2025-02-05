import gc from "@sg/game-client-base";
import { _decorator } from "cc";
import Observer from "observer";
import { BaseResultBodyItem } from "../../../../../extensions/shared-components/assets/game/bet-history/scripts/components/bet-history-body-item";
import { GameResultItem } from "../game-result-item";
const { ccclass, property } = _decorator;
const { render } = Observer;
@ccclass("CustomHistoryResult")
export class CustomHistoryResult extends BaseResultBodyItem {
    @property(GameResultItem)
    resultItem: GameResultItem = null;

    setData(result: gc.BetHistory.DynamicObject<object>, settlementResult: gc.BetHistory.DynamicObject<boolean>) {
        this.resultItem.setData(result);
    }
}
