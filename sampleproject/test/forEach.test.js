const assert = require('assert');
const { forEach } = require('../index');

// the goal here is to initialize an array called numbers, and make it available for the it statements we're about to run
let numbers;
beforeEach(() => {
    numbers = [1, 2, 3];
});

it('should rum an array', () => {
    let total = 0;
    forEach(numbers, (value) => {
        total += value;
    });

    assert.strictEqual(total, 6);

    // this is us messing up the numbers array on purpose to see if it'll reset to default to prepare for the next it statement to work with a reinitialized numbers array
    numbers.push(3);
    numbers.push(3);
    numbers.push(3);
    numbers.push(3);
});

// we're writing a test about our testing framework right here, so meta
it('beforeEach is ran each time', () => {
    assert.strictEqual(numbers.length, 3);
});
