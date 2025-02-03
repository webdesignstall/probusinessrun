var diff = require('deep-diff');

let DifferenceCalculator = (original, updated) => {
    let differences = diff(original, updated);
    return differences;
};

export default DifferenceCalculator;
