const test_text = 'hello my friend. Is this what I want or what you want?'
const searchwords = ['friend']
console.log(test_text.includes(searchwords));

const case_zero_results = ['fries', 'tries']
const case_casualties = ['ice', 'flies', 'tries']

const final_case_zero = case_zero_results.filter(n => (case_casualties.includes(n)==false))

console.log(final_case_zero)