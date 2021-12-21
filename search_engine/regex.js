const searchword = 'Hund'
// let regex = /\bmy\b/;
let regex = new RegExp('\\b' + searchword + '(?![üïöëä])'+  '\\b', 'g')
console.log(regex)
const sentence = " o i cannotbelieve my Hund. heart dar über"
console.log(regex.test(sentence))