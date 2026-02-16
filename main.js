const themeToggleButton = document.getElementById('theme-toggle');
const generateButton = document.getElementById('generate');
const resultDiv = document.getElementById('result');

// 테마 기능
themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleButton.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleButton.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// 페이지 로드 시 저장된 테마 적용
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggleButton.textContent = '☀️';
    } else {
        themeToggleButton.textContent = '🌙';
    }
    
    // 로또 생성 버튼 이벤트 리스너 추가
    generateButton.addEventListener('click', generateLottoSet);
});


// 로또 번호 생성 기능
function generateLottoSet() {
    resultDiv.innerHTML = ''; // 초기화
    
    const labels = ['A', 'B', 'C', 'D', 'E'];

    for (let i = 0; i < 5; i++) {
        createRow(i, resultDiv, labels[i]);
    }
}

function createRow(index, container, labelText) {
    // 1. 번호 생성
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = [...numbers].sort((a, b) => a - b);

    // 2. HTML 구조 생성
    const rowDiv = document.createElement('div');
    rowDiv.className = 'lotto-row';
    rowDiv.style.animationDelay = `${index * 0.12}s`;

    const labelSpan = document.createElement('span');
    labelSpan.className = 'row-label';
    labelSpan.textContent = labelText;
    rowDiv.appendChild(labelSpan);
    
    const ballsWrapper = document.createElement('div');
    ballsWrapper.className = 'balls-wrapper';

    sortedNumbers.forEach(num => {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.textContent = num;
        setBallColorStyle(ball, num);
        ballsWrapper.appendChild(ball);
    });

    rowDiv.appendChild(ballsWrapper);
    container.appendChild(rowDiv);
}

function setBallColorStyle(element, num) {
    let color1, color2;
    if (num <= 10) { color1 = '#fbc400'; color2 = '#e0a800'; } // 노랑
    else if (num <= 20) { color1 = '#69c8f2'; color2 = '#4da8d2'; } // 파랑
    else if (num <= 30) { color1 = '#ff7272'; color2 = '#e05252'; } // 빨강
    else if (num <= 40) { color1 = '#aaaaaa'; color2 = '#888888'; } // 회색
    else { color1 = '#b0d840'; color2 = '#90b820'; } // 초록

    element.style.background = `radial-gradient(circle at 30% 30%, ${color1}, ${color2})`;
}
