function alphabetize(a) {
    return a.toLowerCase().split("").sort().join("").trim()
 }

function getAllAnagrams(arr) {
    let start = new Date()
    let palavrasSortedObject = {}
    for (let word in arr) {
        let alphabetizedWord = alphabetize(arr[word])
        if (palavrasSortedObject[alphabetizedWord] === undefined) {
            palavrasSortedObject[alphabetizedWord] = []
            palavrasSortedObject[alphabetizedWord].push(arr[word])
        } else {
            palavrasSortedObject[alphabetizedWord].push(arr[word])
        }

    }
    let end = new Date()
    console.log(end - start)

    return palavrasSortedObject
}

function getSetsOfFiveAnagrams() {

    let palavrasSortedObject = palavrasObject
    let result = {}

    for (let sortedword in palavrasSortedObject) {
        if (palavrasSortedObject[sortedword].length >= 5){
            result[sortedword] = palavrasSortedObject[sortedword]
        }
    }

    console.log(result)

}

function possibleCombinations(str='fraseteste', amountOfSlices) {

    let result = new Set()
    let splittedWord = alphabetize(str.split(' ').join(''))
    let splitLength = Math.floor(splittedWord.length/amountOfSlices)

    function eachCombination(start, combLength, strPrefix){
        for(let i = start; i < str.length; i++) {
            let next = strPrefix + str[i]
            if (combLength > 0) {
                eachCombination(i+1, combLength -1, next)
            } else {
                result.add(next)
            }
        }
    }

    for(let i = 1; i < splitLength; i++) {
        eachCombination(0, i, '')
    }
    return result
}

function filterPhraseFromCombination (strToSubstract, phrase) {
    phrase = phrase.split('')
    let splittedToSubstract = strToSubstract.split('')
    let result = []
    for (let letter in phrase) {
        if (splittedToSubstract.includes(phrase[letter])) {
            splittedToSubstract = splittedToSubstract.slice(1)
        } else {
            result.push(phrase[letter])
        }
        
    }
    result = result.join('')
    return result
}

function removeDuplicates (combinations) {
    let result = {}
    for (let key in combinations) {
        if (palavrasObject[key] != undefined && palavrasObject[combinations[key]] != undefined) {
            let testDuplicate = palavrasObject[combinations[key]].join(',')
            if (result[testDuplicate] === undefined) {
                result[palavrasObject[key]] = palavrasObject[combinations[key]]
            }
        }
    }
    return result
}


function getAnagramFromPhrase() {
    let phrase= 'cachorro'
    let splittedWord = alphabetize(phrase.split(' ').join(''))
    let firstWords = possibleCombinations(splittedWord, 2)
    let combinations = {}
    firstWords.forEach(word => combinations[word] = filterPhraseFromCombination(word, splittedWord))

    let result = removeDuplicates(combinations)

    console.log(result)
}


function getAnagramFromPhrase3() {
    let phrase= 'cachorro'
    let splittedWord = alphabetize(phrase.split(' ').join(''))
    let firstWords = possibleCombinations(splittedWord, 3)
    let combinations = {}
    firstWords.forEach(word => combinations[word] = filterPhraseFromCombination(word, splittedWord))
    let result = {}

    for (let key in combinations) {
        let tempLastWord = combinations[key]
        combinations[key] = possibleCombinations(tempLastWord, 2)
        combinations[key].forEach(wordSecond => combinations[key][wordSecond] = filterPhraseFromCombination(wordSecond, tempLastWord))
        combinations[key] = removeDuplicates(combinations[key])
        if (palavrasObject[key] === undefined) {
            delete combinations[key]
        } else {
            result[palavrasObject[key]] = combinations[key]
        }
         
    }

    for (let key in result) {
        for (let secondkey in result[key]) {
            console.log(secondkey)
            if (result[secondkey] != undefined) {
                delete result[key]
                break
            }
        }
    }


    console.log(result)

    return combinations
}


let palavrasObject = getAllAnagrams(palavras)