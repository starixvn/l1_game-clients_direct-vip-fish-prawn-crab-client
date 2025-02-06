export enum Choice {
    Stag = "stag",
    Gourd = "gourd",
    Rooster = "rooster",
    Fish = "fish",
    Crab = "crab",
    Prawn = "prawn",
}

export const Choices = "stag,gourd,rooster,fish,crab,prawn";

export const RESULT_MAPPER = [Choice.Stag, Choice.Gourd, Choice.Rooster, Choice.Fish, Choice.Crab, Choice.Prawn];
export function calculateMultiplier(result: any) {
    const diceResults = [result.dice1, result.dice2, result.dice3];

    const multipliers = diceResults.reduce((acc, curr) => {
        const choice = RESULT_MAPPER[curr];
        acc[choice] = (acc[choice] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    return multipliers;
}
