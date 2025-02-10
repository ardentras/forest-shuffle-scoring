import { describe, expect, it } from "@jest/globals";

import { createFakeDwellers } from "../__tests__/fake";
import { StingingNettle } from "../dwellers";
import { CardType, DwellerPosition } from "../types";

import {
  createAnyDweller,
  createForestForDwellerTest,
  createGame,
} from "../helpers";

describe("A StingingNettle card", () => {
  it.each([
    [0, 0],
    [2, 1],
    [4, 2],
    [10, 5],
  ])(
    "scores %i points for %i butterfly cards",
    (expectedPoints, butterflyCount) => {
      const { dweller, woodyPlant, forest } = createForestForDwellerTest({
        dwellerUnderTest: createAnyDweller(StingingNettle),
        otherDwellers: createFakeDwellers(butterflyCount, DwellerPosition.Top, {
          types: [CardType.Butterfly],
        }),
      });
      const game = createGame(forest);

      const points = StingingNettle.score({
        game,
        forest,
        woodyPlant,
        dweller,
      });

      expect(points).toBe(expectedPoints);
    },
  );
});
