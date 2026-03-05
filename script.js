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

const startBtn = document.getElementById("gameStartBtn");
const resetBtn = document.getElementById("gameResetBtn");
const gameArea = document.getElementById("gameArea");
const timerEl = document.getElementById("gameTimer");
const scoreEl = document.getElementById("gameScore");
const message = document.getElementById("gameMessage");

let starsLeft = 30;
let timeLeft = 30;
let timer;
let score = 0;

function spawnStar() {
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
    star.style.left = Math.random() * (gameArea.clientWidth - 50) + "px";
    star.style.top = Math.random() * (gameArea.clientHeight - 50) + "px";
    
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



});