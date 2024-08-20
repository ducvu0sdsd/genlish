export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Hoán đổi các phần tử
    }
    return array;
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export const getPosition = (width, index) => {
    const end = width / 3
    const a = index % 5
    const b = Math.floor(index / 5) % 2
    if (index === 21) {
        return 0
    }
    if (b === 0) {
        if (index < 10) {
            switch (a) {
                case 1:
                    return 0
                case 2:
                    return end / 2
                case 3:
                    return end - (end / 4)
                case 4:
                    return end / 2
                case 5:
                    return 0
            }
        } else {
            switch (a) {
                case 0:
                    return end / 2
                case 1:
                    return end - (end / 4)
                case 2:
                    return end / 2
                case 3:
                    return 0
                case 4:
                    return -end / 2
                case 5:
                    return (end - (end / 4)) * -1
            }
        }
    } else {
        if (index < 10) {
            switch (a) {
                case 1:
                    return -end / 2
                case 2:
                    return (end - (end / 4)) * -1
                case 3:
                    return -end / 2
                case 4:
                    return 0
            }
        } else {
            switch (a) {
                case 0:
                    return (end - (end / 4)) * -1
                case 1:
                    return -end / 2
                case 2:
                    return 0
                case 3:
                    return end / 2
                case 4:
                    return (end - (end / 4))
            }
        }
    }
}

// Mảng cho các câu phản hồi đúng
export const correctResponses = [
    "Correct!",
    "Very good!",
    "Well done!",
    "Excellent!",
    "Outstanding!",
    "Perfect!",
    "Spot on!",
    "Great job!",
    "Not bad at all!",
    "Top-notch!"
];

// Mảng cho các câu phản hồi sai
export const incorrectResponses = [
    "That's okay, try again!",
    "Keep trying, you can do it!",
    "You can do better!",
    "Not quite, but don't give up!",
    "Take another look!",
    "Close, but not quite right!",
    "Not correct, but keep going!",
    "Give it another try!",
    "Don't worry, you'll get it next time!",
    "Try once more!"
];