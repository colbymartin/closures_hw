module.exports = {
    /**
     * Return an object with a next() property. Each time the next function
     * is called the value returned is one higher than the time before.
     *
     *  var c = hw.counter(2);
     *  c.next(); // return 3
     */
    counter: function (start) {
        return {
            next: function () {
                start = start +1;
                return start;
            },
        }
    },

    /**
     * Return a function that accepts the value to multiply `val` by.
     *
     *  multiply(3)(5); // return 15
     */
    multiply: function (val) {
        return function(product) {return val * product};    
    },

    /**
     * Return an object with a discount() property. The discount property should
     * accept an amount that the original price should be discounted by. This
     * should not affect the original amount!
     *
     *  var tot = hw.total(20);
     *  tot.discount(0.50); // return 10
     *  tot.discount(0.20); // return 16
     */
    total: function (amount) {
        return {
            discount: function (percent) {
                return amount * (1 - percent);
            }
        }
    },

    /**
     * Set the name of a user. Only valid names can be provided. A `valid` name is
     * one that matches the regex ^[A-Za-z ]+$.
     *
     *  var user = hw.user();
     *  user.setName('Francis Bacon'); // return true
     *  user.getName(); // return 'Francis Bacon'
     *  user.setName('123 hi'); // return false
     *  user.getName(); // return 'Francis Bacon'
     */
    user: function () {
        let username = null;
        return {
            setName: function (name) {
                let pass = new RegExp('^[A-Za-z ]+$');
                if (pass.test(name)) {
                    username = name;
                    return true;
                } else {
                    return false;
                }
            },
            getName: function () {
                return username;
            }
        }
    },

    /**
     * Create a color object that's got six different properties: incrRed(amount), 
     * incrGreen(amount), and incrBlue(amount) - all of which change the R, G, or B
     * value by the specified quantity (could be negative).
     *
     * There should also be a red(), green(), and blue() function that return the current
     * value for that color channel.
     *
     * You can't have a color value less than zero or greater than 255.
     *
     *  var color = hw.color(150, 200, 18);
     *  color.incrRed(12);
     *  color.incrGreen(30);
     *  color.incrBlue(-9);
     *  console.log(color.red(), color.green(), color.blue()); // 162, 230, 9
     */
    color: function (r, g, b) {
        let R = r;
        let G = g;
        let B = b;
        return {
            incrRed: function (amount) {
                R = R + amount;
                if (R > 255) {
                    R = 255;
                }
                if (R < 0) {
                    R = 0;
                };
            },
            incrBlue: function (amount) {
                B = B + amount;
                if (B > 255) {
                    B = 255;
                }
                if (B < 0) {
                    B = 0;
                };
            },
            incrGreen: function (amount) {
                G = G + amount;
                if (G > 255) {
                    G = 255;
                }
                if (G < 0) {
                    G = 0;
                };
            },
            red: function () {
                return R;
            },
            green: function () {
                return G;
            },
            blue: function () {
                return B;
            },
            
        }
    },

    /**
     * Track the number of lives remaining in a game.
     *
     *  var lives = hw.lives(5);
     *  lives.died();
     *  console.log(lives.left()); // 4
     *  lives.died();
     *  console.log(lives.left()); // 3
     *  lives.restart();
     *  console.log(lives.left()); // 5
     */
    lives: function (start) {
        return {
            died: function () {
                start = start - 1;
            },
            left: function () {
                if (start === 0) {
                    return 'GAME OVER';
                } else return start;
            }
        }
    },

    /**
     * Return a string that contains the 'message id' before the message text.
     * The message ID starts at one and increments with each record.
     *
     *  var logger = hw.messages();
     *  var msg = logger.record('first message');
     *  console.log(msg); // '[1] first message'
     *  msg = logger.record('second message');
     *  console.log(msg); // '[2] second message'
     */
    messages: function () {
        let number = 1;
        return {
            record: function (mess) { 
                let string = '[' + number + '] ' + mess;    
                number++;
                return string;
            }
        }
    },

    /**
     * Create a pocket object that can contain COINS and TRINKETS. The pocket
     * allows users to buy() trinkets for 10 coins, or sell() trinkets for 5
     * coins. You can also return the number of coins() or trinkets().
     *
     * You can't have a negative number of coins or trinkets.
     *
     *  var pocket = hw.pocket(50);
     *  pocket.buy(); // buy for 10 coins
     *  console.log(pocket.coins()); // 40
     *  console.log(pocket.trinkets()); // 1
     *
     *  pocket.buy();
     *  console.log(pocket.coins()); // 30
     *  console.log(pocket.trinkets()); // 2
     *
     *  pocket.sell();
     *  console.log(pocket.coins()); // 35
     *  console.log(pocket.trinkets()); // 1
     */
    pocket: function (start) {
        let wallet = start;
        let toybox = 0;
        return {
            buy: function () {
                if (wallet >= 10) {
                    wallet = wallet - 10;
                    toybox = toybox + 1;
                }
            },
            sell: function () {
                if (toybox >= 1) {
                    wallet = wallet + 5;
                    toybox = toybox - 1;
                }
            },
            coins: function () {
                return wallet;
            },
            trinkets: function () {
                return toybox;
            },

        }
    },

    /**
     * Create an account that keeps track of a balance and records all
     * transactions to and from the account. You shouldn't be able to 
     * change the balance without recording a transaction. Each transaction
     * should be represented as an object like:
     * 
     *      { type: 'withdraw', amount: 15, success: true }
     * 
     * You also shouldn't be able to withdraw money that you don't have. If
     * you try to do that, the transaction should still be recorded but
     * 'success' should be set to false.
     * 
     * let acct = hw.account(200);
     * acct.withdraw(100);  // successful withdraw
     * acct.withdraw(20);   // successful withdraw
     * 
     * acct.deposit(25);    // successful deposit
     * acct.withdraw(200);  // unsuccessful withdraw (not enough funds)
     * 
     * acct.transactions(); // returns array of all transaction objects
     */
    account: function (initial) {
        let amount = initial;
        let tranArray = [];
        function transcribe(dolla, event, completed) {
                tranArray.push({type: event, amount: dolla, success: completed});    
        }
        return {
            withdraw: function (cash) {
                if (amount >= cash) {
                    transcribe(cash, 'withdraw', true);
                    amount = amount - cash;
                } else {
                    transcribe(cash, 'withdraw', false);
                }
            },
            deposit: function (money) {
                transcribe(money, 'deposit', true);
                amount = amount + money;
            },
            transactions: function () {
                return tranArray;
            },
        }
    },
};