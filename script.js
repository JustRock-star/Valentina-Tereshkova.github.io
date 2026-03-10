// Запускаем всё только после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Анимация звездного неба
    const canvas = document.querySelector('.stars');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        function createStars(num) {
            stars = [];
            for (let i = 0; i < num; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 1.5 + 0.5,
                    speed: Math.random() * 0.2 + 0.05,
                    twinkle: Math.random() * Math.PI * 2
                });
            }
        }
        createStars(180);
        
        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                star.twinkle += 0.03;
                let opacity = 0.7 + Math.sin(star.twinkle) * 0.3;
                ctx.globalAlpha = opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        }
        function animateStars() {
            drawStars();
            requestAnimationFrame(animateStars);
        }
        animateStars();
    }
    
    // Навигация по вкладкам
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');
            sections.forEach(sec => sec.classList.remove('active'));
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

        });
    });
    // Анимация взлета ракеты и звук
    const launchBtn = document.getElementById('launchRocket');
    const rocket = document.getElementById('mainRocket');
    const rocketSound = document.getElementById('rocketSound');
    if (launchBtn && rocket) {
        launchBtn.addEventListener('click', () => {
            rocket.classList.add('active');
            if (rocketSound) {
                console.log('Attempting to play sound');
                rocketSound.currentTime = 0;
                rocketSound.play().then(() => console.log('Sound played successfully')).catch(e => console.log('Sound play failed:', e));
            } else {
                console.log('Rocket sound element not found');
            }
            setTimeout(() => {
                rocket.classList.remove('active');
            }, 2500);
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {

// --- первая игра: сбор звёзд ---
const startBtn = document.getElementById("game1StartBtn");
const resetBtn = document.getElementById("game1ResetBtn");
const gameArea = document.getElementById("game1Area");
const timerEl = document.getElementById("game1Timer");
const scoreEl = document.getElementById("game1Score");
const message = document.getElementById("game1Message");

let starsLeft = 30;
let timeLeft = 30;
let timer;
let score = 0;

let existingStars = [];
function spawnStar() {
    // рассчитываем случайное расположение в активной зоне
    const margin = 50; // меньшие отступы чтобы было больше места
    let x, y, tries = 0, minDist = 100; // больше расстояние между звёздами
    do {
        x = margin + Math.random() * (gameArea.clientWidth - margin * 2 - 50);
        y = margin + Math.random() * (gameArea.clientHeight - margin * 2 - 50);
        tries++;
        // проверяем расстояние до предыдущих
    } while (existingStars.some(s => Math.hypot(s.x - x, s.y - y) < minDist) && tries < 200);
    
    if (tries >= 200) return; // если очень много попыток, пропускаем
    
    const star = document.createElement("button");
    star.textContent = "⭐";
    star.classList.add('floating-star');
    star.style.position = "absolute";
    star.style.width = "50px";
    star.style.height = "50px";
    star.style.border = "none";
    star.style.background = "transparent";
    star.style.fontSize = "30px";
    star.style.cursor = "pointer";
    star.style.left = x + "px";
    star.style.top = y + "px";
    existingStars.push({x, y});
    
    star.onclick = () => {
        star.remove();
        starsLeft--;
        score += 10;
        scoreEl.textContent = score;
        if (starsLeft === 0) {
            clearInterval(timer);
            message.textContent = `🎉 Победа! Все звёзды собраны! Баллы: ${score}`;
            resetBtn.style.display = "inline-block";
        }
    };
    
    gameArea.appendChild(star);
}















function startGame() {
    starsLeft = 30;
    timeLeft = 30;
    score = 0;
    timerEl.textContent = timeLeft;
    scoreEl.textContent = score;
    message.textContent = "Собери все звёзды за 30 секунд!";
    gameArea.innerHTML = "";
    existingStars = [];
    
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (starsLeft > 0) {
                message.textContent = `💥 Время вышло! Ты проиграл. Баллы: ${score}`;
                resetBtn.style.display = "inline-block";
            }
        }
    }, 1000);
    
    let starCount = 0;
    const spawnInterval = setInterval(() => {
        spawnStar();
        starCount++;
        if (starCount >= 30) {
            clearInterval(spawnInterval);
        }
    }, 500);
}



startBtn.onclick = () => {
    clearInterval(timer);
    startBtn.style.display = "none";
    resetBtn.style.display = "none";
    startGame();
};

resetBtn.onclick = () => {
    clearInterval(timer);
    resetBtn.style.display = "none";
    startGame();
};

// переключение между играми
const tabButtons = document.querySelectorAll('.game-tab-btn');
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const gameId = btn.getAttribute('data-game');
        document.querySelectorAll('.game-panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(gameId === 'stars' ? 'game1' : 'game2').classList.add('active');
    });
});

// --- вторая игра: ракета собирает кристаллы ---
const startBtn2 = document.getElementById("game2StartBtn");
const resetBtn2 = document.getElementById("game2ResetBtn");
const gameArea2 = document.getElementById("game2Area");
const timerEl2 = document.getElementById("game2Timer");
const scoreEl2 = document.getElementById("game2Score");
const message2 = document.getElementById("game2Message");
let timeLeft2 = 30;
let score2 = 0;
let timer2;
let rocketX = 0;

function createRocket() {
    const r = document.createElement('img');
    r.id = 'rocketPlayer';
    r.src = 'images/rocket.png';
    gameArea2.appendChild(r);
    rocketX = gameArea2.clientWidth / 2 - r.clientWidth / 2;
    r.style.left = rocketX + 'px';
    return r;
}

let playerRocket;
let crystals = [];

function spawnCrystal() {
    const c = document.createElement('div');
    c.classList.add('crystal');
    c.textContent = '\u2728'; // ✨ = ✨
    c.style.fontSize = '24px';
    c.style.lineHeight = '1';
    const x = Math.random() * (gameArea2.clientWidth - 30);
    c.style.left = x + 'px';
    c.style.top = '0px';
    gameArea2.appendChild(c);
    crystals.push({el: c, y: 0, speed: 2 + Math.random() * 2});
}

function startGame2() {
    timeLeft2 = 30;
    score2 = 0;
    timerEl2.textContent = timeLeft2;
    scoreEl2.textContent = score2;
    message2.textContent = "Собирай кристаллы!";
    gameArea2.innerHTML = "";
    crystals = [];
    playerRocket = createRocket();

    timer2 = setInterval(() => {
        timeLeft2--;
        timerEl2.textContent = timeLeft2;
        if (timeLeft2 <= 0) {
            clearInterval(timer2);
            message2.textContent = `⏰ Время вышло! Баллы: ${score2}`;
            resetBtn2.style.display = 'inline-block';
        }
    }, 1000);

    let crystalCount = 0;
    const spawnInterval2 = setInterval(() => {
        if (crystalCount < 20) {
            spawnCrystal();
            crystalCount++;
        } else {
            clearInterval(spawnInterval2);
        }
    }, 700);

    requestAnimationFrame(updateCrystals);
}

function moveRocket(dx) {
    if (!playerRocket) return;
    rocketX += dx;
    rocketX = Math.max(0, Math.min(gameArea2.clientWidth - playerRocket.clientWidth, rocketX));
    playerRocket.style.left = rocketX + 'px';
}

// отслеживание нажатых клавиш
const keysPressed = {};
document.addEventListener('keydown', e => {
    keysPressed[e.key] = true;
});
document.addEventListener('keyup', e => {
    keysPressed[e.key] = false;
});

function updateCrystals() {
    // нвижение ракеты в зависимости от нажатых кнопок
    if (keysPressed['ArrowLeft']) moveRocket(-15);
    if (keysPressed['ArrowRight']) moveRocket(15);
    
    // обновление позиций кристаллов
    crystals = crystals.filter(obj => {
        obj.y += obj.speed;
        obj.el.style.top = obj.y + 'px';
        // убрать, если ушла вниз
        if (obj.y > gameArea2.clientHeight) {
            obj.el.remove();
            return false;
        }
        // проверка столкновения
        const rectR = playerRocket.getBoundingClientRect();
        const rectC = obj.el.getBoundingClientRect();
        if (!(rectR.right < rectC.left || rectR.left > rectC.right || rectR.bottom < rectC.top || rectR.top > rectC.bottom)) {
            obj.el.remove();
            score2 += 10;
            scoreEl2.textContent = score2;
            return false;
        }
        return true;
    });
    if (timeLeft2 > 0) requestAnimationFrame(updateCrystals);
}

startBtn2.onclick = () => {
    clearInterval(timer2);
    startBtn2.style.display = 'none';
    resetBtn2.style.display = 'none';
    startGame2();
};
resetBtn2.onclick = () => {
    clearInterval(timer2);
    resetBtn2.style.display = 'none';
    startGame2();
};

// --- инициализация карты ---
const citiesOverlay = document.getElementById('citiesOverlay');
// координаты (x%, y%) приблизительно под выбранную карту
const cities = [
    {name: 'Москва', x: 48, y: 20, color: '#ff0000', isHome: true},
    {name: 'Стокгольм', x: 44, y: 14, color: '#ffaa00'},
    {name: 'Лондон', x: 40, y: 16, color: '#ffaa00'},
    {name: 'Париж', x: 42, y: 18, color: '#ffaa00'},
    {name: 'Рим', x: 45, y: 22, color: '#ffaa00'},
    {name: 'Женева', x: 43, y: 18, color: '#ffaa00'},
    {name: 'Берлин', x: 44, y: 16, color: '#ffaa00'},
    {name: 'Мадрид', x: 36, y: 20, color: '#ffaa00'},
    {name: 'Каиро', x: 47, y: 26, color: '#ffaa00'},
    {name: 'Джакарта', x: 78, y: 48, color: '#ffaa00'},
    {name: 'Токио', x: 85, y: 23, color: '#ffaa00'},
    {name: 'Нью-Йорк', x: 18, y: 20, color: '#ffaa00'},
    {name: 'Монреаль', x: 16, y: 14, color: '#ffaa00'},
    {name: 'Гавана', x: 14, y: 28, color: '#ffaa00'},
    {name: 'Сантьяго', x: 10, y: 65, color: '#ffaa00'},
    {name: 'Лима', x: 12, y: 55, color: '#ffaa00'}
];

cities.forEach(city => {
    const marker = document.createElement('div');
    marker.className = 'city-marker' + (city.isHome ? ' home' : '');
    marker.style.left = city.x + '%';
    marker.style.top = city.y + '%';
    marker.style.backgroundColor = city.color;
    marker.style.borderWidth = city.isHome ? '3px' : '2px';
    marker.style.borderColor = '#fff';
    marker.title = city.name + (city.isHome ? ' (Родина)' : '');
    
    citiesOverlay.appendChild(marker);
});

});
