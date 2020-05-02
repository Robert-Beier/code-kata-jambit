# Code kata jambit

Solutions to and working environment for the code katas at jambit Leipzig.

## Choosing a challenge

This project is used to work on different individual challenges. It doesn't make sense to have a single `main.ts` script for all challenges. Neither does it make sense to run all the tests of all challenges. It is intended to always only work on a single challenge.

The script `yarn start` is setup to work only for a single challenge. They use an yarn/npm config variable to know which challenge you are working on. There are two ways to choose a challenge:

-  edit the config variable `challenge` in the `package.json`
-  set it with `yarn config set code-kata-jambit:challenge my_kata`

## Run code

To run and watch the code of a challenge, use `yarn start`.

## Run in debug mode

In VSCode just go into the `main.ts` file of a challenge, set a breakpoint and hit play for the launch configuration `Launch Program`.
