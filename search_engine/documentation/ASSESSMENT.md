# Assessment

**things I'm happy with**
- The way I converted and cleaned the xml-files which contained the manuscrips, specifically the way I handled the dates to look exactly like I wanted them.
- I am happy that my disjunctive and conjunctive search methods are working without bugs (to my knowledge). There were quite a lot of corner cases which I did not consider beforehand and which were quite a struggle to fix. Some of those struggles:
    - Avoiding duplicates in disjunctive searchresults when a fragment contains more than one search word.
    - Getting data such as wordcount and graph-related data when working with conjunctive search. Because this data was usually gathered in the more general searchDatabase function, which is only called for the first searchword in conjunctive search, I had to find a different way to gather this data in the conjunctive search function itself. 
    - I also like that my conjunctive search only searches the whole database once, and then starts working with the results of the first search word. 
- One major issue I ran into was that my search engine becoming very slow when a searchword returned 500+ results. Using the List component from react-virtualized allowed my search engine to become fast, no matter how many results a searchword returns. 
 

**Big Decisions**

#### 1: simplifying the database

I simplified the manuscripts by converting the xml files into JSON files which only contained the information I was interested in (the text itself, the date, and the location of the text in the manuscripts) and got rid of the information I was less interested in (information about the type of each word, pictures of the actual manuscript). This was ultimately a trade off between easy data searching and losing a lot of possible features. I think this was a good decision, because my goal was to make a search engine for philosophy students, and the aspects of the database relevant for that group are kept intact. Something I would have still liked to implement is a link in each result to the whole manuscript, so you can keep reading, instead of having to find the rest of the manuscript on a different site. 


#### 2: working with one central searchDatabase function

Most of the work of my searchengine is done in the searchDatabase function. In retrospect, I would have liked for this function to return an object of a class that was specified beforehand, instead of an object-variable. I think this would have made my code a lot tidier and easier to work with. 



