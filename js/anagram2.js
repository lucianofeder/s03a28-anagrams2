function alphabetize(a) {
    return a.toLowerCase().split("").sort().join("").trim()
 }

function getAllAnagrams() {
    let arr = palavras
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

    let divResultado = document.getElementById('result')
    divResultado.innerHTML = ''
    for (let word in result) {
        let span = document.createElement('span')
        span.innerText = result[word]
        divResultado.appendChild(span)
    }

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
    let phrase = document.getElementById('inputToAnagram').value

    if (phrase === '') {
        window.alert('Digite algum texto para fazer a busca')
    } else {
        let splittedWord = alphabetize(phrase.split(' ').join(''))
        let firstWords = possibleCombinations(splittedWord, 2)
        let combinations = {}
        firstWords.forEach(word => combinations[word] = filterPhraseFromCombination(word, splittedWord))
    
        let result = removeDuplicates(combinations)
        console.log(result)
    
        let divResultado = document.getElementById('result')
        divResultado.innerHTML = ''
    
        for (let word in result) {
            let span = document.createElement('span')
            span.innerText = `(${word}) + (${result[word]})`
            divResultado.appendChild(span)
        }
    
        if (document.querySelector('main div#result span') === null) {
            let span = document.createElement('span')
            span.innerText = 'A string digitada nao possui as combinacoes desejadas'
            divResultado.appendChild(span)
        }
    }

}


function getAnagramFromPhrase3() {
    let phrase= document.getElementById('inputToAnagram').value
    console.log(phrase)
    if (phrase === '') {
        window.alert('Digite algum texto para fazer a busca')
    } else {
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

        //filtering duplicates from result
        for (let key in result) {
            for (let secondkey in result[key]) {
                if (result[secondkey] != undefined) {
                    delete result[key]
                    break
                }
            }
        }

        let divResultado = document.getElementById('result')
        divResultado.innerHTML = ''
        console.log(result)

        for (let word in result) {
            for (let secondWord in result[word]){
                let span = document.createElement('span')
                span.innerText = `(${word}) + (${secondWord}) + (${result[word][secondWord]})`
                divResultado.appendChild(span)
            }

        }
        if (document.querySelector('main div#result span') === null) {
            let span = document.createElement('span')
            span.innerText = 'A string digitada nao possui as combinacoes desejadas'
            divResultado.appendChild(span)
        }

    }
    
}

let palavrasObject = getAllAnagrams(palavras)

let btnGetAllAnagrams = document.getElementById('getAllAnagramsGreater5')
btnGetAllAnagrams.addEventListener('click', getSetsOfFiveAnagrams)

let btnGetTwoAnagrams = document.getElementById('getTwoAnagrams')
btnGetTwoAnagrams.addEventListener('click', getAnagramFromPhrase)

let btnGetThreeAnagrams = document.getElementById('getThreeAnagrams')
btnGetThreeAnagrams.addEventListener('click', getAnagramFromPhrase3)
