/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const arr1=str1.split("");
  arr1.sort();
  const sortedString1=arr1.join("");
  const arr2=str2.split("");
  arr2.sort();
  const sortedString2=arr2.join("");

  
  if(sortedString1==sortedString2){
    return true;
  }
  return false;
}

console.log(isAnagram("spar tn","rasp nt"));

module.exports = isAnagram;
