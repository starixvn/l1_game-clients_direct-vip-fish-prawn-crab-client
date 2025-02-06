import gc from "@sg/game-client-base";
import { LogStore } from "db://shared-components/game/scripts/stores/log-store";

import { sharedContainer } from "../../scripts/shared-container";

export const settings = {
    id: 26,
    name: "VipFishPrawnCrab",
    namespaces: ["Common", "VipFishPrawnCrab"],
    durations: {
        wholeRound: 42,
        lockingBet: 5,
        placingBet: 30,
        generatingResult: 3,
        showingResult: 6,
        startRound: 3,
    },
    numberOfRoundHistory: 100,
};

export const containerOptions: gc.IContainerOptions = {
    globalContainer: sharedContainer,
    onContainerCreated: (container) => {
        container.bind(gc.GameConfigs.GameSetting).toConstantValue(settings);
        container.bind(LogStore).to(LogStore);
    },
    features: [...gc.defaultFeatures, gc.BetDetailsNew],
};
