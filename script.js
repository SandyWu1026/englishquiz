// 單字庫
const words = [
    {
        word: "abandon",
        options: ["放棄", "接受", "保持", "維護"],
        correctAnswer: 0
    },
    {
        word: "ability",
        options: ["能力", "態度", "性格", "想法"],
        correctAnswer: 0
    },
    {
        word: "abroad",
        options: ["在國外", "在國內", "在家裡", "在學校"],
        correctAnswer: 0
    },
    {
        word: "above",
        options: ["上面的", "下面的", "裡面的", "外面的"],
        correctAnswer: 0
    },
    {
        word: "absent",
        options: ["缺席的", "出席的", "準時的", "遲到的"],
        correctAnswer: 0
    },
    {
        word: "accept",
        options: ["接受", "拒絕", "懷疑", "討厭"],
        correctAnswer: 0
    },
    {
        word: "accident",
        options: ["意外事故", "計劃", "約會", "活動"],
        correctAnswer: 0
    },
    {
        word: "accompany",
        options: ["陪同", "離開", "拒絕", "忽視"],
        correctAnswer: 0
    },
    {
        word: "achieve",
        options: ["達到", "失敗", "放棄", "猶豫"],
        correctAnswer: 0
    },
    {
        word: "across",
        options: ["橫過", "直行", "返回", "停止"],
        correctAnswer: 0
    },
    {
        word: "act",
        options: ["行動", "等待", "猶豫", "放棄"],
        correctAnswer: 0
    },
    {
        word: "able",
        options: ["能夠的", "無能的", "懶惰的", "笨拙的"],
        correctAnswer: 0
    },
    {
        word: "abnormal",
        options: ["不正常的", "正常的", "普通的", "平凡的"],
        correctAnswer: 0
    },
    {
        word: "academic",
        options: ["學術的", "商業的", "娛樂的", "運動的"],
        correctAnswer: 0
    },
    {
        word: "accelerate",
        options: ["加速", "減速", "停止", "倒退"],
        correctAnswer: 0
    },
    {
        word: "apple",
        options: ["蘋果", "香蕉", "橘子", "葡萄"],
        correctAnswer: 0
    },
    {
        word: "book",
        options: ["電腦", "書本", "手機", "鉛筆"],
        correctAnswer: 1
    },
    {
        word: "cat",
        options: ["狗", "兔子", "貓", "老鼠"],
        correctAnswer: 2
    }
];

let currentWord = 0;
let score = 0;
let timer;
let timeLeft;

// DOM 元素
const wordElement = document.getElementById('word');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const speakButton = document.getElementById('speak-btn');
const resultElement = document.getElementById('result');

// 語音合成
const speech = window.speechSynthesis;

// 開始測驗
function startQuiz() {
    currentWord = 0;
    score = 0;
    scoreElement.textContent = score;
    loadWord();
}

// 載入單字
function loadWord() {
    if (currentWord >= words.length) {
        showResult();
        return;
    }

    const word = words[currentWord];
    wordElement.textContent = word.word;
    feedbackElement.textContent = '';
    
    // 清空選項
    optionsElement.innerHTML = '';
    
    // 添加選項按鈕
    word.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-btn';
        button.onclick = () => checkAnswer(index);
        optionsElement.appendChild(button);
    });

    // 重置並開始計時器
    startTimer();
}

// 開始計時
function startTimer() {
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    
    if (timer) {
        clearInterval(timer);
    }

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

// 處理超時
function handleTimeout() {
    feedbackElement.textContent = '時間到！';
    const buttons = optionsElement.getElementsByClassName('option-btn');
    for (let button of buttons) {
        button.disabled = true;
    }
    
    // 顯示正確答案
    const correctOption = buttons[words[currentWord].correctAnswer];
    correctOption.classList.add('correct');
    
    setTimeout(() => {
        currentWord++;
        loadWord();
    }, 2000);
}

// 檢查答案
function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const word = words[currentWord];
    const buttons = optionsElement.getElementsByClassName('option-btn');
    
    // 禁用所有按鈕
    for (let button of buttons) {
        button.disabled = true;
    }
    
    if (selectedIndex === word.correctAnswer) {
        feedbackElement.textContent = '答對了！';
        buttons[selectedIndex].classList.add('correct');
        score++;
        scoreElement.textContent = score;
    } else {
        feedbackElement.textContent = '答錯了！';
        buttons[selectedIndex].classList.add('incorrect');
        buttons[word.correctAnswer].classList.add('correct');
    }
    
    setTimeout(() => {
        currentWord++;
        loadWord();
    }, 2000);
}

// 顯示結果
function showResult() {
    const totalWords = words.length;
    resultElement.innerHTML = `
        測驗結束！<br>
        總題數: ${totalWords}<br>
        答對題數: ${score}<br>
        正確率: ${Math.round((score / totalWords) * 100)}%
    `;
    document.getElementById('quiz-container').style.display = 'none';
}

// 播放單字發音
speakButton.onclick = () => {
    const utterance = new SpeechSynthesisUtterance(words[currentWord].word);
    utterance.lang = 'en-US';
    speech.speak(utterance);
};

// 開始測驗
startQuiz();
