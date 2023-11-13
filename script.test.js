const game = require('./script');

test('Top row win', () => {
    game.gameController.playRound(0,0)
    game.gameController.playRound(1,0)
    game.gameController.playRound(0,1)
    game.gameController.playRound(2,0)
    expect(game.gameController.playRound(0,2)).toBe(true);
});

test('Middle row win', () => {
    game.gameController.playRound(1,0)
    game.gameController.playRound(0,0)
    game.gameController.playRound(1,1)
    game.gameController.playRound(0,1)
    expect(game.gameController.playRound(1,2)).toBe(true)
});

test('Bottom row win', () => {
    game.gameController.playRound(2,0)
    game.gameController.playRound(0,0)
    game.gameController.playRound(2,1)
    game.gameController.playRound(0,1)
    expect(game.gameController.playRound(2,2)).toBe(true)
});

test('First column win', () => {
    game.gameController.playRound(0,0)
    game.gameController.playRound(0,1)
    game.gameController.playRound(1,0)
    game.gameController.playRound(0,2)
    expect(game.gameController.playRound(2,0)).toBe(true)
})

test('Middle column win', () => {
    game.gameController.playRound(0,1)
    game.gameController.playRound(0,0)
    game.gameController.playRound(1,1)
    game.gameController.playRound(1,0)
    expect(game.gameController.playRound(2,1)).toBe(true)
})

test('Third column win', () => {
    game.gameController.playRound(0,2)
    game.gameController.playRound(0,0)
    game.gameController.playRound(1,2)
    game.gameController.playRound(0,1)
    expect(game.gameController.playRound(2,2)).toBe(true)
})