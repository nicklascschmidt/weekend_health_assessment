"use strict";
/*
Weekend Health - Coding Assessment

Instructions:

Please write a function that accepts a single string as input,
and that returns a list of English words that can be created
using some combination of the letters in the input string.
 
Example input: "oogd"
Example output: ["good", "god", "dog", "goo", "do", "go"]
 
You can assume you'll be given an array of strings that enumerates
all valid English words. To determine whether a word is a valid
word, you can simply check for its presence in the array
(e.g., `WORDS.includes(word)`)
*/
// Use recursion to build out a tree of char nodes, starting
//  with a node for each char, and following down each branch
//  to form all possible word combinations.
// Words are assembled by traversing down each node until we
//  hit a leaf node.
const buildCharTree = (nodes) => {
    if (nodes.length == 1)
        return nodes;
    const branches = [];
    for (let i = 0; i < nodes.length; i++) {
        const char = nodes[i];
        // Remove the current char from the remainingNodes, which will essentially
        //  traverse us down the tree char by char.
        const remainingNodes = nodes.join("").replace(char, "").split("");
        // Keep building the tree till we reach the leaf nodes.
        // Build out the list of branches for every possible combination of chars.
        [...buildCharTree(remainingNodes), ""].forEach((innerTree) => {
            branches.push(char + innerTree);
        });
    }
    return branches;
};
// Take a string of random letters and return an array of strings
//  that are valid English words.
const getValidWordsFromString = (str, allValidWords) => {
    const charArray = str.split("");
    const allWordCombinations = buildCharTree(charArray);
    const validWords = allWordCombinations.filter((word) => allValidWords.includes(word));
    // Remove duplicate values, which are created from duplicate letters
    //  in the original `str` passed in.
    return [...new Set(validWords)];
};
// ---------- TEST CASE ----------
// USER INPUT
const testCase = "oogd";
// This is a placeholder for all valid words in the English dictionary.
const ALL_VALID_WORDS = ["good", "god", "dog", "goo", "do", "go"];
const result = getValidWordsFromString(testCase, ALL_VALID_WORDS);
console.log(`Test case: "${testCase}"`);
console.log('Result:', result);
