import gc from "@sg/game-client-base";
import inversify from "inversify";
import mobx from "mobx";
import { calculateMultiplier } from "./game-definitions";

const { injectable, inject } = inversify;

@injectable()
export class ResultMultiplierStore {
    @inject(gc.Settlements.SettlementStore) private readonly settlementStore: gc.Settlements.SettlementStore;
    constructor() {
        mobx.makeAutoObservable(this);
        setTimeout(() => {
            mobx.reaction(
                () => this.settlementStore?.result,
                (result) => {
                    if (result) {
                        this.multipliers = calculateMultiplier(result);
                    }
                }
            );
        }, 0);
    }

    multipliers: Record<string, number> = {};
}
