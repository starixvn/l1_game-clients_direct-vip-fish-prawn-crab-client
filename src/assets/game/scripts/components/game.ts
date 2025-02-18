import "./../../../resources/i18n";

import gc from "@sg/game-client-base";
import { _decorator, Node } from "cc";
import { AudioContainer } from "db://shared-components/game/audios/scripts/component/audio-container";
import { ChipFlying } from "db://shared-components/game/chip-flying/scripts/components/chip-flying";
import GameComponent from "db://shared-components/game/scripts/components/game-component";
import { startGame } from "db://shared-components/shared/scripts/startup";
import Observer from "observer";

import { AnimationUtils } from "../../../../extensions/shared-components/assets/shared/utils";
import { siteConfigs } from "../../../scripts/site-configs";
import { RESULT_MAPPER } from "../game-definitions";
import { containerOptions, settings } from "../game-settings";
import { GameAnimation } from "./game-animation";

startGame(settings.name, containerOptions, siteConfigs, settings.namespaces);
const { Rounds, RoundHistories } = gc;

const { ccclass, property } = _decorator;
const { observer, render } = Observer;

@ccclass
@observer(settings.name)
export default class Game extends GameComponent {
    @property(ChipFlying)
    chipFlying: ChipFlying = null;

    @property(Node)
    nodeAudioContainer: Node = null;

    @property(Node)
    nodeGameAnimation: Node = null;

    @property(Node)
    nodeGameAnimationBelowTheChip: Node = null;

    @property(Node)
    nodeGameAnimationAboveTheChip: Node = null;

    override namespace = settings.name;
    override containerOptions = containerOptions;
    protected enableFixHandleFinish = true;

    private gameAnimation: GameAnimation = null;
    private audioContainer: AudioContainer = null;

    onLoad() {
        this.audioContainer = this.nodeAudioContainer.getComponent(AudioContainer);
        this.gameAnimation = this.nodeGameAnimation.getComponent(GameAnimation);
        super.onLoad();
    }

    async showResult(
        result: gc.GameServiceMessage.TResult,
        hasAnimation: boolean,
        settlementResult: gc.GameServiceMessage.TSettlementResult
    ) {
        if (result) {
            this.nodeGameAnimation.setParent(this.nodeGameAnimationAboveTheChip);
            await this.gameResultAnimation(result, hasAnimation);
        }
    }

    handleStartRound(isStartRound: boolean) {
        this.playSound("shake");
        if (isStartRound) {
            this.nodeGameAnimation.setParent(this.nodeGameAnimationBelowTheChip);
            this.gameAnimation.playAnimationShake();
        }
    }

    private async gameResultAnimation(result, animated) {
        this.gameAnimation.setResult(result);
        if (animated) {
            await this.gameAnimation.playAnimationOpen();
        } else {
            this.gameAnimation.playAnimationOpened();
        }
    }

    async renderCurrentFinish(currentFinish: gc.GameServiceMessage.Finish) {
        if (!currentFinish || !this.enableFixHandleFinish) {
            return;
        }
        const { result, settlementResult, roundId } = currentFinish as any;

        if (!this.isValidResult(result, settlementResult)) {
            return;
        }

        this.gameAnimation.setRandomPosition(roundId);
        this.scheduleOnce(() => {
            this.playResultAudio(result);
        }, 2);

        this.showResult(result, true, settlementResult).then(() => {
            this.finishShowResult(result, settlementResult);
            this.nodeGameAnimation.setParent(this.nodeGameAnimationBelowTheChip);
            this.chipFlying.callActionPayChips();
        });
        this.playSound(gc.Audios.AudioIds.RECEIVE_FINISH);
    }

    @render(RoundHistories.RoundHistoryStore, (store) => store.firstJoinGameHistory)
    async renderStaticResult(firstJoinGameHistory: gc.RoundHistories.IFirstJoinGameHistory) {
        if (!firstJoinGameHistory) {
            return;
        }

        const lastRound = firstJoinGameHistory.roundHistory as any;
        if (lastRound) {
            const { result, settlementResult, roundId } = lastRound;
            this.gameAnimation.setRandomPosition(roundId);
            if (firstJoinGameHistory.animationHighlight) {
                this.showResult(result, false, settlementResult);
            }

            if (firstJoinGameHistory.staticHighlight) {
                this.gameAnimation.playAnimationClosed();
            }
        }
    }

    @render(Rounds.RoundTimeStore, (store) => store.roundState)
    fadeVolumeBgMusic(roundState: string) {
        if (roundState === Rounds.ROUND_STATE.LOCKING_BET) {
            this.audioContainer.updateVolumeMusicSource(0.3, 3);
        } else if (roundState === Rounds.ROUND_STATE.SHOW_RESULT) {
            this.audioContainer.updateVolumeMusicSource(1, 3);
        }
    }

    async playResultAudio(result) {
        const choices = Object.values(result).map((value: number) => RESULT_MAPPER[value]);
        const languageId = gc.Translator.getLanguageId();
        try {
            for (const choice of choices) {
                this.playSound(`win_${choice}_${languageId}`);
                await AnimationUtils.delayTime(0.8);
            }
        } catch (e) {}
    }
}
