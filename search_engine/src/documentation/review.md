# Review
reviewed by: Niels Schröder
date: 20-12-21

**Point 1: reduce states**
I have the suspicion that not all my states are neccesary. For example, result_counts simply keeps track of the amount of results. Also, I use two states to enlarge a result when it is clicked on. I think this might be state-overkill! 

**Point 2: use more comments to describe what is happening in your code**
Niels pointed out that my code has very few comments, and the ones that do exist contain only very sparse descriptions of what is going on. 

**Point 3: ridding the code of repetition**
At various places, my code is repetitive. For example, I set the states in a similar manner after each type of search (normal, disjunctive, or conjunctive). Also, when using strict search, I repeat code that is almost identical to a regular search. I could make this part of the searchDatabase function into a different function, which maybe takes an optional argument for strict search. 

**Point 4: import alphabetically**
Be more systematic about imports! For example, put them in alphabetical order.

**Point 5: space evenly**
Either use 4 spaces, or 2 spaces, but do not switch between them in different components (note: I switched all spaces to 2 spaces, except for my Python code in the folder scripts).