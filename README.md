# Advent of Code 2022

These are my solutions to [Advent of Code 2021](https://adventofcode.com/2022), written in typescript.

## Setup

Install dependencies

```sh
yarn
```

## Usage

Scaffold out a new day folder with `yarn new-day <DAY-NUMBER>`. It copies the template day (`templates/day/*`) and writes updates `src/days.ts` accordingly. Example:

```sh
# Creates src/day2 from template
yarn new-day 2
```

## Running

Run the solutions with

```sh
ts-node index.ts --day=<DAY-NUMBER> --part=<PART>
```

where `DAY-NUMBER` is the day number (i.e. 4 for day 4) and `PART` is the part number (i.e. 1 or 2).

You can pass in `"all"` for both `DAY-NUMBER` and `PART` to run all days and both parts respectively. 

You can optionally pass in `--test` to run the example input/output given in the problem statement.

