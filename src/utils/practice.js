import { getRandomInt, shuffleArray } from "./other"

export const questionType = [
    'Xin chào là gì trong tiếng Anh loại 1',
    'Xin chào là gì trong tiếng Anh loại 2',
    'Đọc Tiếng Anh chọn 1 trong 3 tiếng Anh và có kết quả hiện tiếng việt',
    'Nối các câu'
]

//Xin chào là gì trong tiếng Anh loại 1
export const question1 = (vocabularies) => {
    const arr = []
    while (arr.length < 3) {
        const r = getRandomInt(0, Math.floor(vocabularies.length / 2))
        if (!arr.includes(r))
            arr.push(r)
    }
    const vocabulary = {
        english: vocabularies[arr[0]].split(':')[0],
        vietnamese: vocabularies[arr[0]].split(':')[1]
    }
    const false1 = vocabularies[arr[1]].split(':')[0]
    const false2 = vocabularies[arr[2]].split(':')[0]
    return {
        question: `'${vocabulary.vietnamese}' là gì trong tiếng Anh?`,
        options: shuffleArray([vocabulary.english, false1, false2]),
        answer: vocabulary.english,
        type: 0
    }
}

//Xin chào là gì trong tiếng Anh loại 2
export const question4 = (vocabularies) => {
    const arr = []
    while (arr.length < 3) {
        const r = getRandomInt(Math.floor(vocabularies.length / 2) + 1, vocabularies.length - 1)
        if (!arr.includes(r))
            arr.push(r)
    }
    const vocabulary = {
        english: vocabularies[arr[0]].split(':')[0],
        vietnamese: vocabularies[arr[0]].split(':')[1]
    }
    const false1 = vocabularies[arr[1]].split(':')[0]
    const false2 = vocabularies[arr[2]].split(':')[0]
    return {
        question: `'${vocabulary.vietnamese}' là gì trong tiếng Anh?`,
        options: shuffleArray([vocabulary.english, false1, false2]),
        answer: vocabulary.english,
        type: 1
    }
}


// Đọc Tiếng Anh chọn 1 trong 3 tiếng Anh và có kết quả hiện tiếng việt
export const question2 = (vocabularies) => {
    const arr = []
    while (arr.length < 3) {
        const r = getRandomInt(0, vocabularies.length - 1)
        if (!arr.includes(r))
            arr.push(r)
    }
    const vocabulary = {
        english: vocabularies[arr[0]].split(':')[0],
        vietnamese: vocabularies[arr[0]].split(':')[1]
    }
    const false1 = vocabularies[arr[1]].split(':')[0]
    const false2 = vocabularies[arr[2]].split(':')[0]
    return {
        question: `'${vocabulary.vietnamese}' là gì trong tiếng Anh?`,
        options: shuffleArray([vocabulary.english, false1, false2]),
        answer: vocabulary.english,
        type: 2
    }
}


// Nối các câu
export const question3 = (vocabularies) => {
    let arr = []
    while (arr.length < 4) {
        const r = getRandomInt(0, vocabularies.length - 1)
        if (!arr.includes(r))
            arr.push(r)
    }
    arr = arr.map(item => {
        return {
            english: vocabularies[item].split(':')[0],
            vietnamese: vocabularies[item].split(':')[1]
        }
    })
    return {
        question: `Nối các câu khớp nghĩa với nhau`,
        vocabularies: arr,
        type: 3
    }
}



const pronounces = [
    {
        name: 'David US',
        voiceName: 'Microsoft David - English (United States)',
        image: '/EN.png'
    },
    {
        name: 'Mark US',
        voiceName: 'Microsoft Mark - English (United States)',
        image: '/EN.png'
    },
    {
        name: 'Zira US',
        voiceName: 'Microsoft Zira - English (United States)',
        image: '/EN.png'
    },
    {
        name: 'Google US',
        voiceName: 'Google US English',
        image: '/EN.png'
    },
    {
        name: 'Google UK Male',
        voiceName: 'Google UK English Male',
        image: '/EN.png'
    },
    {
        name: 'Google UK Female',
        voiceName: 'Google UK English Female',
        image: '/EN.png'
    }
]