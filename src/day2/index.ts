// To do this, count the number of times a depth measurement increases from the previous measurement.

enum Shape {
  ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors",
}

const ShapeValueMap = {
  [Shape.ROCK]: 1,
  [Shape.PAPER]: 2,
  [Shape.SCISSORS]: 3,
};

enum Outcome {
  WIN = "win",
  LOSE = "lose",
  DRAW = "draw",
}

const OutcomeValueMap = {
  [Outcome.WIN]: 6,
  [Outcome.LOSE]: 0,
  [Outcome.DRAW]: 3,
};

const LogicMap = {
  [Shape.ROCK]: {
    [Shape.SCISSORS]: Outcome.WIN,
    [Shape.PAPER]: Outcome.LOSE,
    [Shape.ROCK]: Outcome.DRAW,

    [Outcome.LOSE]: Shape.SCISSORS,
    [Outcome.WIN]: Shape.PAPER,
    [Outcome.DRAW]: Shape.ROCK,
  },
  [Shape.PAPER]: {
    [Shape.ROCK]: Outcome.WIN,
    [Shape.SCISSORS]: Outcome.LOSE,
    [Shape.PAPER]: Outcome.DRAW,

    [Outcome.LOSE]: Shape.ROCK,
    [Outcome.WIN]: Shape.SCISSORS,
    [Outcome.DRAW]: Shape.PAPER,
  },
  [Shape.SCISSORS]: {
    [Shape.PAPER]: Outcome.WIN,
    [Shape.ROCK]: Outcome.LOSE,
    [Shape.SCISSORS]: Outcome.DRAW,

    [Outcome.LOSE]: Shape.PAPER,
    [Outcome.WIN]: Shape.ROCK,
    [Outcome.DRAW]: Shape.SCISSORS,
  },
};

const GuideMap = {
  A: Shape.ROCK,
  B: Shape.PAPER,
  C: Shape.SCISSORS,
  X: Shape.ROCK,
  Y: Shape.PAPER,
  Z: Shape.SCISSORS,
};

function getGuide(input: string): Array<[string, string]> {
  return input.split("\n").map((line) => line.split(" ") as [string, string]);
}

function getScore(round: [string, string]): number {
  const opponent = GuideMap[round[0]];
  const self = GuideMap[round[1]];
  const shapeValue = ShapeValueMap[self];
  const outcome = LogicMap[self][opponent];
  const outcomeValue = OutcomeValueMap[outcome];
  return shapeValue + outcomeValue;
}

export function part1(input: string): any {
  const guide = getGuide(input);
  const scores = guide.map(getScore);
  return scores.reduce((a, b) => a + b);
}

const GuideMap2 = {
  X: Outcome.LOSE,
  Y: Outcome.DRAW,
  Z: Outcome.WIN,
};

function getScore2(round: [string, string]): number {
  const opponent = GuideMap[round[0]];
  const outcome = GuideMap2[round[1]];
  const playedShape = LogicMap[opponent][outcome];
  const outcomeValue = OutcomeValueMap[outcome];
  const shapeValue = ShapeValueMap[playedShape];
  return shapeValue + outcomeValue;
}

export function part2(input: string): any {
  const guide = getGuide(input);
  const scores = guide.map(getScore2);
  return scores.reduce((a, b) => a + b);
}

export default {
  part1,
  part2,
};
