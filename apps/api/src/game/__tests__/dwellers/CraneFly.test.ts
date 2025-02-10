import { describe, expect, it } from "@jest/globals";

import { createFakeDwellers } from "../__tests__/fake";
import { CraneFly } from "../dwellers";
import { CardType, DwellerPosition } from "../types";

import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A Crane Fly card", () => {
  it.each([
    [0, 0],
    [1, 1],
    [2, 2],
    [5, 5],
  ])("scores %i points for %i bat cards", (expectedPoints, batCount) => {
    const { dweller, woodyPlant, forest } = createForestForDwellerTest({
      dwellerUnderTest: createAnyDweller(CraneFly),
      otherDwellers: createFakeDwellers(batCount, DwellerPosition.Left, {
        types: [CardType.Bat],
      }),
    });
    const game = createGame(forest);

    const points = CraneFly.score({
      game,
      forest,
      woodyPlant,
      dweller,
    });

    expect(points).toBe(expectedPoints);
  });
});
