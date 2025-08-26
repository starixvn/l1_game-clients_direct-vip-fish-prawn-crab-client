const GAME_NAME = "VipFishPrawnCrab";

export const settings = {
    id: 26,
    name: GAME_NAME,
    observerNamespace: GAME_NAME,
    namespaces: ["Common", GAME_NAME],
    durations: {
        wholeRound: 42,
        lockingBet: 5,
        placingBet: 30,
        generatingResult: 5,
        showingResult: 5,
        startRound: 3,
    },
    numberOfRoundHistory: 100,
};

