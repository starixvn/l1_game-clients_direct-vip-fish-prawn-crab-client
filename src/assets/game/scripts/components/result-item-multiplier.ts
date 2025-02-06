import { _decorator, Sprite, SpriteAtlas } from "cc";
import Observer from "observer";
import { ObserverComponent } from "../../../../extensions/shared-components/assets/shared/common-components/observer-component/scripts/observer-component";
import { ResultMultiplierStore } from "../result-multiplier-store";
const { render } = Observer;
const { ccclass, property } = _decorator;

@ccclass("ResultItemMultiplier")
export class ResultItemMultiplier extends ObserverComponent {
    @property(Sprite)
    sprite: Sprite = null;

    @property(SpriteAtlas)
    atlas: SpriteAtlas = null;

    @property
    suffix = "";

    @render(ResultMultiplierStore, (store) => store.multipliers)
    setResult(multipliers: any) {
        const choice = this.node.name;
        const multiplier = multipliers[choice] ?? 1;
        if (multiplier === 1) {
            this.sprite.spriteFrame = null;
            return;
        }

        this.sprite.spriteFrame = this.atlas.getSpriteFrame(`x${multiplier}${this.suffix}`);
    }
}
