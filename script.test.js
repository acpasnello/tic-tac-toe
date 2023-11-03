const game = require('./script');

test('Top row win', () => {
    game.gameController.playRound(0,0)
    game.gameController.playRound(1,0)
    game.gameController.playRound(0,1)
    game.gameController.playRound(2,0)
    expect(game.gameController.playRound(0,2)).toBe(true);
});