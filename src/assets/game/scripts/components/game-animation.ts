import { _decorator, Component, Node, sp } from "cc";
import { AnimationUtils, ComponentUtils } from "../../../../extensions/shared-components/assets/shared/utils";
import { settings } from "../game-settings";
import { GameResultItem } from "./game-result-item";
const { ccclass, property, executeInEditMode } = _decorator;

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

    @property(Node)
    randomPositionContainer: Node = null;

    onLoad() {
        this.randomPositionContainer.active = false;
    }

    setResult(result) {
        this.resultItem.node.active = true;
        this.resultItem.setData(result);
    }

    setRandomPosition(roundId: number) {
        const randomIndex = roundId % this.randomPositionContainer.children.length;
        const randomContainer = this.randomPositionContainer.children[randomIndex];

        this.resultItem.content.children.forEach((child, index) => {
            const target = randomContainer.children[index];
            child.position = ComponentUtils.convertPosition(child.parent, target);
            child.scale = target.scale;
        });
    }

    playAnimationClosed() {
        this.skeleton.setAnimation(0, GameAnimationType.Closed, false);
    }

    async playAnimationOpen() {
        await AnimationUtils.playSpine(this.skeleton, GameAnimationType.Open, false, settings.durations.generatingResult);
    }

    playAnimationShake() {
        AnimationUtils.playSpine(this.skeleton, GameAnimationType.Shake, false, settings.durations.startRound);
    }

    playAnimationOpened() {
        this.skeleton.setAnimation(0, GameAnimationType.Opened, false);
    }
}
