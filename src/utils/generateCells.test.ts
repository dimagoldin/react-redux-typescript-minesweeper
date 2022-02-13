import { calculateBombCounts, calculateNumberOfBombs } from ".";
import { Cell, CellState, CellValue } from "../types";
describe("generateCells utils function tests", () => {
  describe("test neighbor bombs callucaltion for small board", () => {
    const cells: Cell[][] = [
      [
        { state: CellState.open, value: CellValue.bomb, row: 0, col: 0 },
        { state: CellState.open, value: CellValue.none, row: 0, col: 1 },
        { state: CellState.open, value: CellValue.none, row: 0, col: 2 },
      ],
      [
        { state: CellState.open, value: CellValue.none, row: 1, col: 0 },
        { state: CellState.open, value: CellValue.none, row: 1, col: 1 },
        { state: CellState.open, value: CellValue.none, row: 1, col: 2 },
      ],
      [
        { state: CellState.open, value: CellValue.bomb, row: 2, col: 0 },
        { state: CellState.open, value: CellValue.bomb, row: 2, col: 1 },
        { state: CellState.open, value: CellValue.none, row: 2, col: 2 },
      ],
    ];

    test("test number of neightbor bombs calculated correctly for non border cell close to bombs", () => {
      expect(calculateNumberOfBombs({ cells: cells, row: 1, col: 1 })).toMatchObject({
        state: CellState.open,
        value: CellValue.three,
      });
    });

    test("test number of neightbor bombs calculated correctly for border cell close to many bombs", () => {
      expect(calculateNumberOfBombs({ cells: cells, row: 0, col: 1 })).toMatchObject({
        state: CellState.open,
        value: CellValue.one,
      });
    });

    test.each([
      { given: { cells: cells, row: 1, col: 0 }, expected: expect.objectContaining({ state: CellState.open, value: CellValue.three }) },
      { given: { cells: cells, row: 1, col: 2 }, expected: expect.objectContaining({ state: CellState.open, value: CellValue.one }) },
      { given: { cells: cells, row: 2, col: 2 }, expected: expect.objectContaining({ state: CellState.open, value: CellValue.one }) },
    ])("given border cell $given expect $expected with correct calculated bombs", ({ given, expected }) => {
      expect(calculateNumberOfBombs(given)).toStrictEqual(expected);
    });
    test("test number of neightbor bombs calculated correctly for border cell close to single bomb", () => {
      expect(calculateNumberOfBombs({ cells: cells, row: 1, col: 0 })).toMatchObject({
        state: CellState.open,
        value: CellValue.three,
      });
      expect(calculateNumberOfBombs({ cells: cells, row: 1, col: 2 })).toMatchObject({
        state: CellState.open,
        value: CellValue.one,
      });
      expect(calculateNumberOfBombs({ cells: cells, row: 2, col: 2 })).toMatchObject({
        state: CellState.open,
        value: CellValue.one,
      });
    });

    test("test number of neightbor bombs calculated correctly for border cell with no adjecent bombs", () => {
      expect(calculateNumberOfBombs({ cells: cells, row: 0, col: 2 })).toMatchObject({
        state: CellState.open,
        value: CellValue.none,
      });
    });

    test("test bombs are untouched", () => {
      expect(calculateNumberOfBombs({ cells: cells, row: 0, col: 0 })).toMatchObject({
        state: CellState.open,
        value: CellValue.bomb,
      });
      expect(calculateNumberOfBombs({ cells: cells, row: 2, col: 0 })).toMatchObject({
        state: CellState.open,
        value: CellValue.bomb,
      });
      expect(calculateNumberOfBombs({ cells: cells, row: 2, col: 1 })).toMatchObject({
        state: CellState.open,
        value: CellValue.bomb,
      });
    });

    test("test board counts are correct", () => {
      const updatedCells: Cell[][] = [
        [
          { state: CellState.open, value: CellValue.bomb, row: 0, col: 0 },
          { state: CellState.open, value: CellValue.one, row: 0, col: 1 },
          { state: CellState.open, value: CellValue.none, row: 0, col: 2 },
        ],
        [
          { state: CellState.open, value: CellValue.three, row: 1, col: 0 },
          { state: CellState.open, value: CellValue.three, row: 1, col: 1 },
          { state: CellState.open, value: CellValue.one, row: 1, col: 2 },
        ],
        [
          { state: CellState.open, value: CellValue.bomb, row: 2, col: 0 },
          { state: CellState.open, value: CellValue.bomb, row: 2, col: 1 },
          { state: CellState.open, value: CellValue.one, row: 2, col: 2 },
        ],
      ];
      expect(calculateBombCounts(cells)).toStrictEqual(updatedCells);
    });
  });
});
