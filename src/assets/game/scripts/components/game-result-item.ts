import { _decorator, Component, Node, Sprite, SpriteAtlas } from "cc";
import { RESULT_MAPPER } from "../game-definitions";
const { ccclass, property } = _decorator;

@ccclass("GameResultItem")
export class GameResultItem extends Component {
    @property(SpriteAtlas)
    atlas: SpriteAtlas = null;

    @property
    prefix = "";

    @property(Node)
    content: Node = null;

    setData(result: any, highlight = false) {
        const sprites = this.getComponentsInChildren(Sprite);
        const values = Object.values<number>(result);
        sprites.forEach((sprite, index) => {
            const choice = RESULT_MAPPER[values[index]];
            const spriteName = highlight ? `${this.prefix}outer-${choice}` : `${this.prefix}${choice}`;
            sprite.spriteFrame = this.atlas.getSpriteFrame(spriteName);
        });
    }
}
