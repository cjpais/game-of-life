# Game of Life

This is a simple implementation of Conway's Game of Life.

It has non-periodic and periodic boundary conditions.

## Development Instructions

Install a local node http server

`npm install -g http-server`

Run the server `http-server`

Compile and watch for changes `tsc -w`

## Structure

This repository is loosely structured.

The `index.html` file is relatively simple and is just a frame.

The main code resides in `src`.

* `gol.ts` - Game of Life, Backend, written in typescript. Exports the function `Step()`
* `interface.ts` - Defines the basic JS interface for the frontend to consume
* `index.ts` - The frontend itself. Bootstraps the game.

## Expectations

This code was written mainly with two interfaces in mind.

The frontend will consume a `Board` and will `Draw()` it.
The backend will provide a `Step()` function which takes a board and outputs the boards next state.

This was done so that the frontend could more easily support backends written in many languages.
This TypeScript backend implementation is one way to go about it.