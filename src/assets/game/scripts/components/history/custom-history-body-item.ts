import gc from "@sg/game-client-base";
import { _decorator, Color, instantiate, Label, Node } from "cc";
import Observer from "observer";
const { FormatUtils } = gc;
import BetHistoryBodyItem, {
    BetHistoryBodyItemType,
} from "../../../../../extensions/shared-components/assets/game/bet-history/scripts/components/bet-history-body-item";
import { DateTimeLabels } from "../../../../../extensions/shared-components/assets/shared/common-components/date-time-labels";
import { calculateMultiplier, RESULT_MAPPER } from "../../game-definitions";
const { ccclass, property } = _decorator;
const { render } = Observer;
@ccclass("CustomHistoryBodyItem")
export class CustomHistoryBodyItem extends BetHistoryBodyItem {
    @property(Node)
    betContainer: Node = null;

    @property(Node)
    betSample: Node = null;

    @property(DateTimeLabels)
    dateTimeLabels: DateTimeLabels = null;

    addNewBetDetail() {
        const node = instantiate(this.betSample);
        this.betContainer.addChild(node);
        return node;
    }

    setData(data: BetHistoryBodyItemType) {
        super.setData(data);

        this.dateTimeLabels.setTime(data.betHistoryLog.time);

        const history = data.betHistoryLog;
        const details = this.createBetDetail(history);
        Object.keys(details).forEach((key, index) => {
            const detail = details[key];
            const node = index > 0 ? this.addNewBetDetail() : this.betSample;
            const choiceLabel = node.getChildByName("choice").getComponent(Label);
            choiceLabel.string = `${gc.Translator.gameTranslate(`bet_option_${key}`)} @ ${detail.odds}`;
            const stakeLabel = node.getChildByName("stake").getComponent(Label);
            stakeLabel.string = FormatUtils.numberWithCommas(detail.bet, 2);

            choiceLabel.color = detail.win ? Color.YELLOW : Color.WHITE;
            stakeLabel.color = detail.win ? Color.YELLOW : Color.WHITE;
        });
    }

    test() {
        const history = {
            roundId: 2444605,
            freeBet: false,
            anyTriple: 0,
            betwin: 55,
            crab: 10,
            fish: 10,
            gourd: 10,
            mountain: 0,
            name: "Jaguar26593",
            ocean: 0,
            odds: {
                single: 2,
                double: 3.5,
                triple: 6,
                anyTriple: 31,
                mountain: 1.96,
                ocean: 1.96,
            },
            prawn: 10,
            rate: 1,
            rooster: 10,
            stag: 10,
            time: "2025-02-04T03:16:10.985Z",
            phien: 2444605,
            result: {
                dice1: 5,
                dice2: 1,
                dice3: 1,
            },
            settlementResult: {
                stag: false,
                gourd: true,
                rooster: false,
                fish: false,
                crab: false,
                prawn: true,
                anyTriple: false,
                mountain: true,
                ocean: false,
            },
            betLogDetails: [],
        };

        this.createBetDetail(history);
    }

    private createBetDetail(history: any) {
        const multipliers = calculateMultiplier(history.result);

        const details = RESULT_MAPPER.reduce((acc, choice) => {
            if (history[choice] > 0) {
                const multiplier = multipliers[choice] ?? 1;
                const oddType = multiplier === 1 ? "single" : multiplier === 2 ? "double" : "triple";
                acc[choice] = {
                    odds: history.odds[oddType],
                    bet: history[choice] || 0,
                    win: history.settlementResult[choice],
                };
            }
            return acc;
        }, {} as Record<string, { odds: number; bet: number; win: boolean }>);
        return details;
    }
}
