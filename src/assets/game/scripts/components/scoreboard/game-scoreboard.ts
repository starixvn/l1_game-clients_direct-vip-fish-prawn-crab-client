import { _decorator, Component, instantiate, Layout, Node, Prefab, ScrollView } from "cc";
import { GameResultItem } from "../game-result-item";
const { ccclass, property } = _decorator;

@ccclass("GameScoreBoard")
export class GameScoreBoard extends Component {
    @property(Prefab)
    itemPrefab: Prefab = null;

    @property(Node)
    content: Node = null;

    private _scrollView: ScrollView = null;

    get scrollView() {
        if (!this._scrollView) {
            this._scrollView = this.getComponentsInChildren(ScrollView)[0];
        }
        return this._scrollView;
    }

    render(histories: any[]) {
        this.content.destroyAllChildren();
        histories.forEach((history) => {
            const node = instantiate(this.itemPrefab);
            this.content.addChild(node);

            const resultItem = node.getComponent(GameResultItem);
            resultItem.setData(history.result);
        });

        this.scrollToEnd();
    }

    scrollToEnd() {
        this.updateLayout();
        this.scrollView?.scrollToPercentHorizontal(1, 0.1, true);
    }

    updateLayout() {
        const layout = this.content.getComponent(Layout);
        if (!layout) {
            return;
        }
        layout.enabled = true;
        layout.updateLayout();
        layout.enabled = false;
    }
}
