const searchword = 'dar'
// let regex = /\bmy\b/;
let regex = new RegExp('\\b' + searchword + '(?!ü)'+  '\\b', 'g')
console.log(regex)
const sentence = " o i cannotbelieve my heart dar über"
console.log(sentence.search(regex))