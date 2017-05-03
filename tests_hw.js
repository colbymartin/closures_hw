import test from 'ava';

let hw = require('./hw');

test('number1', function (t) {
    let c = hw.counter(2);
    t.deepEqual(c.next(), 3);
    t.deepEqual(c.next(), 4);
});

test('number2', function (t) {
    let c = hw.multiply(5);
    t.deepEqual(c(3), 15);
    t.deepEqual(c(7), 35);
});

test('number3', function (t) {
    let c = hw.total(20);
    t.deepEqual(c.discount(.5), 10);
    t.deepEqual(c.discount(.2), 16);
});

test('number4', function (t) {
    let c = hw.user();
    t.deepEqual(c.setName('Francis Bacon'), true);
    t.deepEqual(c.getName(), 'Francis Bacon');
    t.deepEqual(c.setName('123 hi'), false);
    t.deepEqual(c.getName(), 'Francis Bacon');
});

test('number5', function (t) {
    let color1 = hw.color(150, 200, 18);
    let color2 = hw.color(240, 80, 10)
    color1.incrRed(12);
    color1.incrGreen(30);
    color1.incrBlue(-9);
    t.deepEqual(color1.red(), 162);
    t.deepEqual(color1.green(), 230);
    t.deepEqual(color1.blue(), 9);
    color2.incrRed(20);
    color2.incrGreen(30);
    color2.incrBlue(-20);
    t.deepEqual(color2.red(), 255);
    t.deepEqual(color2.green(), 110);
    t.deepEqual(color2.blue(), 0);
});

test('number6', function (t) {
    let lives = hw.lives(5);
    lives.died();
    t.deepEqual(lives.left(), 4);
    lives.died();
    t.deepEqual(lives.left(), 3);
    lives.died();
    t.deepEqual(lives.left(), 2);
    lives.died();
    t.deepEqual(lives.left(), 1);
    lives.died();
    t.deepEqual(lives.left(), 'GAME OVER');
});

test('number7', function (t) {
    let logger = hw.messages();
    t.deepEqual(logger.record('first message'), '[1] first message');
    t.deepEqual(logger.record('second message'), '[2] second message');
});

test('number8', function (t) {
    let pocket = hw.pocket(50);
    pocket.buy();
    t.deepEqual(pocket.coins(), 40);
    t.deepEqual(pocket.trinkets(), 1);
    pocket.buy();
    t.deepEqual(pocket.coins(), 30);
    t.deepEqual(pocket.trinkets(), 2);
    pocket.sell();
    t.deepEqual(pocket.coins(), 35);
    t.deepEqual(pocket.trinkets(), 1);
    pocket.sell();
    t.deepEqual(pocket.coins(), 40);
    t.deepEqual(pocket.trinkets(), 0);
    pocket.sell();
    t.deepEqual(pocket.coins(), 40);
    t.deepEqual(pocket.trinkets(), 0);   
});

test('number9', function (t) {
    let acct = hw.account(200);
    acct.withdraw(100);
    acct.deposit(25);
    acct.withdraw(200);
    t.deepEqual(acct.transactions(), [
        {type: 'withdraw', amount: 100, success: true},
        {type: 'deposit', amount: 25, success: true},
        {type: 'withdraw', amount: 200, success: false},
    ]);

});






