let isPaused = false;
let isRestared = false;
const colors = ['#ffeb3b', '#f44336', '#4caf50', '#2196f3', '#9c27b0', '#ff9800'];
let originalColor = colors[Math.floor(Math.random() * colors.length)];
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

// Initialize high score display
document.getElementById('currentHighScore').textContent = highScore;
document.getElementById('highScore').textContent = highScore;

function flashOriginalColor() {
    !isRestared && toggleAnimation();
    isRestared = false;
    document.querySelectorAll('.pacman-top, .pacman-bottom').forEach(part => {
        part.style.backgroundColor = originalColor;
    });
    
    setTimeout(() => {
        document.querySelectorAll('.pacman-top, .pacman-bottom').forEach(part => {
            part.style.backgroundColor = 'grey';
        });
        displayColorChoices();
    }, 2000);
}

function displayColorChoices() {
    const colorContainer = document.createElement('div');
    colorContainer.className = 'color-container';
    
    colors.sort(() => Math.random() - 0.5).forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-choice';
        colorDiv.style.backgroundColor = color;
        colorDiv.dataset.color = color;
        colorDiv.setAttribute('data-testid', 'colorOption')
        colorDiv.addEventListener('click', () => checkColor(color));
        colorContainer.appendChild(colorDiv);
    });
    
    document.querySelector('.game').appendChild(colorContainer);
}

function checkColor(selectedColor) {
    const colorChoices = document.querySelectorAll('.color-choice');
    
    if (selectedColor === originalColor) {
        toggleAnimation();
        document.querySelector('.guess').style.display = 'block'
        document.querySelector('.guess').innerHTML = 'Correct guess!'
        setTimeout(() => {
            document.querySelector('.guess').style.display = 'none';
        }, 2000);
        score += 2;
        document.getElementById('score').textContent = score;
        colorChoices.forEach(choice => {
            choice.classList.add('correct');
            setTimeout(() => choice.remove(), 1000);
        });
        
        setTimeout(() => {
            document.querySelector('.color-container')?.remove();
            originalColor = colors[Math.floor(Math.random() * colors.length)];
            flashOriginalColor();
        }, 4000);
    } else {
        document.querySelector('.guess').style.display = 'block'
        document.querySelector('.guess').innerHTML = 'Wrong guess!'
        setTimeout(() => {
            document.querySelector('.guess').style.display = 'none';
        }, 2000);
        gameOver();
    }
}

function gameOver() {
    // Update high score
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById('currentHighScore').textContent = highScore;
        document.getElementById('highScore').textContent = highScore;
    }
    
    // Show game over screen
    const gameOverScreen = document.getElementById('gameOver');
    document.getElementById('finalScore').textContent = score;
    gameOverScreen.style.display = 'flex';
    
    // Pause animations and remove color choices
    document.querySelector('.color-container')?.remove();
}

function restartGame() {
    // Reset game state
    score = 0;
    isRestared = true;
    window.location.reload()
    /* document.querySelectorAll('.food').forEach((food, index) => {
        console.log(food.offsetWidth)
        const l = food.getBoundingClientRect()
        console.log(l.left)
        food.style.left = 0
    });
    
    document.getElementById('score').textContent = '0';
    document.getElementById('gameOver').style.display = 'none';
    originalColor = colors[Math.floor(Math.random() * colors.length)];
    flashOriginalColor();*/
}

function toggleAnimation() {
    isPaused = !isPaused;
    if (isPaused) {
       document.querySelectorAll('.food').forEach(food => {
            food.classList.toggle('paused');
        });
        isPaused = !isPaused;
    }
    
}

// Start the game
flashOriginalColor();
