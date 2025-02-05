import { _decorator, Component, sp } from "cc";
import { AnimationUtils } from "../../../../extensions/shared-components/assets/shared/utils";
import { GameResultItem } from "./game-result-item";
const { ccclass, property } = _decorator;

export enum GameAnimationType {
    Open = "open",
    Shake = "shake",
    Closed = "closed",
    Opened = "opened",
}

@ccclass("GameAnimation")
export class GameAnimation extends Component {
    @property(GameResultItem)
    resultItem: GameResultItem = null;

    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    setResult(result) {
        this.resultItem.setData(result);
    }

    setRandomPosition(roundId: number) {}

    playAnimationClosed() {
        this.skeleton.setAnimation(0, GameAnimationType.Closed, false);
    }

    async playAnimationOpen() {
        await AnimationUtils.playSpine(this.skeleton, GameAnimationType.Open, false);
    }

    playAnimationShake() {
        this.skeleton.setAnimation(0, GameAnimationType.Shake, false);
    }

    playAnimationOpened() {
        this.skeleton.setAnimation(0, GameAnimationType.Opened, false);
    }
}
