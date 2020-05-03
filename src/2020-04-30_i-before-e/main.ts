import fs = require('fs');

const words = fs.readFileSync('./src/2020-04-30_i-before-e/unixdict.txt', 'utf8').toString().split('\n');

// I before E when not preceded by C
function fulfillsSubPhraseOne(word: string) {
    return word.match(/^.*[^cC][iI][eE].*$/);
}
// E before I when not preceded by C
function fulfillsOppositeOfSubPhraseOne(word: string) {
    return word.match(/^.*[^cC][eE][iI].*$/);
}
// E before I when preceded by C
function fulfillsSubPhraseTwo(word: string) {
    return word.match(/^.*[cC][eE][iI].*$/);
}
// I before E when preceded by C
function fulfillsOppositeOfSubPhraseTwo(word: string) {
    return word.match(/^.*[cC][iI][eE].*$/);
}

const wordsFulfillingSubPhraseOne = words.filter(fulfillsSubPhraseOne);
const wordsFulfillingOppositeSubPhraseOne = words.filter(fulfillsOppositeOfSubPhraseOne);
const wordsFulfillingSubPhraseTwo = words.filter(fulfillsSubPhraseTwo);
const wordsFulfillingOppositeSubPhraseTwo = words.filter(fulfillsOppositeOfSubPhraseTwo);

const isSubPhraseOnePlausible = wordsFulfillingSubPhraseOne.length > wordsFulfillingOppositeSubPhraseOne.length * 2;
const isSubPhraseTwoPlausible = wordsFulfillingSubPhraseTwo.length > wordsFulfillingOppositeSubPhraseTwo.length * 2;

const isPhrasePlausible = isSubPhraseOnePlausible && isSubPhraseTwoPlausible;

console.log({
    wordsFulfillingSubPhraseOne: wordsFulfillingSubPhraseOne.length,
    wordsOppositeSubPhraseOne: wordsFulfillingOppositeSubPhraseOne.length,
    wordsFulfillingSubPhraseTwo: wordsFulfillingSubPhraseTwo.length,
    wordsOppositeSubPhraseTwo: wordsFulfillingOppositeSubPhraseTwo.length,
    isSubPhraseOnePlausible,
    isSubPhraseTwoPlausible,
    isPhrasePlausible
});
