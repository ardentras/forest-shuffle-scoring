import { describe, expect, it } from "@jest/globals";

import { createFakeDwellers } from "../__tests__/fake";
import { BeeSwarm } from "../dwellers";
import { CardType, DwellerPosition } from "../types";

import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Bee Swarm card", () => {
  it.each([
    [0, 0],
    [1, 1],
    [2, 2],
    [5, 5],
  ])("scores %i points for %i plant cards", (expectedPoints, plantCount) => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(BeeSwarm),
      otherDwellers: createFakeDwellers(plantCount, DwellerPosition.Bottom, {
        types: [CardType.Plant],
      }),
    });
    const game = createGame(forest);

    const points = BeeSwarm.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(expectedPoints);
  });
});
