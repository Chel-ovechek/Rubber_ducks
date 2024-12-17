{//First_Game
const items = document.querySelectorAll('.list-item'); // Все утята
const right = document.getElementById('right');
// Добавляем обработчики событий
items.forEach(item => {
    item.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
});

right.addEventListener('dragover', event => {
    event.preventDefault();
    
});

right.addEventListener('drop', event => {
    event.preventDefault();
    const draggable = document.getElementById("duck");

    // Перемещаем утёнка в зону `#right`
    right.appendChild(draggable);

    // Проверяем количество утят (без учёта мамы)
    const ducklings = right.querySelectorAll('#duck').length;

    if (ducklings === 5) { // Условие для 5 утят
        alert('Урааа. Все утята дома с мамой!');
    }
});
}

{//Second_Game
    document.addEventListener("DOMContentLoaded", () => {
        const duck = document.getElementById("Duck_from_up_img");
        const ship = document.getElementById("Ship_img");
        const container = document.getElementById("sea");

        const step = 10; // Шаг перемещения
        let duck_posX = 150, duck_posY = 200;
        let ship_posX = 200, ship_posY = 200;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        let game_over = false;
        // Функция перемещения
        function moveDuck() {
            // Ограничение для утки
            if (duck_posX < 0) {
                duck_posX = 0;
                ship_posX = 50;
            }
            if (duck_posY < 0) duck_posY = 0;
            if (duck_posX > containerWidth - duck.offsetWidth) 
                duck_posX = containerWidth - duck.offsetWidth;
            if (duck_posY > containerHeight - duck.offsetHeight) 
                duck_posY = containerHeight - duck.offsetHeight;

            // Ограничение для корабля
            if (ship_posY < 0) ship_posY = 0;
            if (ship_posX > containerWidth - ship.offsetWidth){
                duck_posX = 600, duck_posY = 120;
                ship_posX = 650, ship_posY = 120;
                alert('Ура. Ты добрался');
                game_over = true;
            }
            if (ship_posY > containerHeight - ship.offsetHeight) 
                ship_posY = containerHeight - ship.offsetHeight;

            // Применение позиций
            duck.style.left = `${duck_posX}px`;
            duck.style.top = `${duck_posY}px`;
            ship.style.left = `${ship_posX}px`;
            ship.style.top = `${ship_posY}px`;
        }

        
        // Обработчик нажатия клавиш
        document.addEventListener("keydown", (event) => {
            if (game_over) return;
            switch (event.key) {
                case "w": // Вверх
                    duck_posY -= step;
                    ship_posY -= step;
                    break;
                case "s": // Вниз
                    duck_posY += step;
                    ship_posY += step;
                    break;
                case "a": // Влево
                    duck_posX -= step;
                    ship_posX -= step;
                    break;
                case "d": // Вправо
                    duck_posX += step;
                    ship_posX += step;
                    break;
            }
            moveDuck();
        });
        moveDuck(); // Установка начальной позиции
    });
}

{//Third_Game
    document.addEventListener("DOMContentLoaded", () => {
        const ducks = document.querySelectorAll(".duck");
        const yellowDuck = document.getElementById("duck_hero");
        const enemies = Array.from(ducks).filter(duck => duck.id.startsWith("enemy"));
        const container = document.getElementById("Temza");
    
        const enemySpeeds = [1, 2, 1.5, 2.5, 1.2, 1.8]; // Разные скорости для синих уток
        const yellowDuckBaseSpeed = 1.8; // Базовая скорость желтой утки
        let yellowDuckSpeed = yellowDuckBaseSpeed;
    
        let yellowDuckX = 0; // Позиция желтой утки
        const enemyPositions = enemies.map(() => 0); // Начальная позиция синих уток
    
        let raceStarted = false; // Игра начинается после фокусировки
        let moveEnemiesInterval;
        let gameEnded = false; // Флаг окончания игры
    
        // Функция сброса позиций
        function resetPositions() {
            ducks.forEach(duck => {
                duck.style.left = "0px";
            });
            yellowDuckX = 0; // Сбрасываем позицию желтой утки
            yellowDuck.style.left = "0px"; // Сбрасываем позицию желтой утки
        }
    
        // Функция движения синих уток
        function moveEnemies() {
            enemies.forEach((duck, index) => {
                enemyPositions[index] += enemySpeeds[index];
                duck.style.left = `${enemyPositions[index]}px`;
    
                if (enemyPositions[index] + duck.offsetWidth >= container.clientWidth) {
                    endGame(false); // Синяя утка победила
                }
            });
        }
    
        // Управление желтой уткой
        document.addEventListener("keydown", (event) => {
            if (!raceStarted || gameEnded) return;
    
            switch (event.key) {
                case " ": // Пробел - движение вправо
                    yellowDuckX += yellowDuckSpeed;
                    yellowDuck.style.left = `${yellowDuckX}px`;
                    if (yellowDuckX + yellowDuck.offsetWidth >= container.clientWidth) {
                        endGame(true); // Желтая утка победила
                    }
                    break;
            }
        });
    
        // Проверка и окончание игры
        function endGame(yellowWins) {
            if (gameEnded) return; // Если игра уже закончена, выходим
    
            clearInterval(moveEnemiesInterval);
            raceStarted = false;
            gameEnded = true; // Устанавливаем флаг окончания игры
    
            if (yellowWins) {
                alert("Поздравляем! Желтая утка победила!");
            } else {
                alert("Упс! Синяя утка победила!");
            }
    
            resetPositions();
            container.blur(); // Убираем фокус с контейнера
            
            // Устанавливаем новый таймаут для перезапуска игры
            setTimeout(() => {
                gameEnded = false; // Сбрасываем флаг окончания игры
                yellowDuckSpeed = yellowDuckBaseSpeed; // Сбрасываем скорость желтой утки
                enemyPositions.fill(0); // Сбрасываем позиции синих уток
                ducks.forEach(duck => duck.style.left = "0px"); // Сбрасываем позиции синих уток
                yellowDuck.style.left = "0px"; // Сбрасываем позицию желтой утки
                container.focus(); // Устанавливаем фокус обратно на контейнер
            }, 2000); // Ждем 2 секунды перед перезапуском
        }
    
        // Начало игры после фокусировки
        container.addEventListener("focus", () => {
            if (!raceStarted && !gameEnded) {
                raceStarted = true;
                resetPositions();
                setTimeout(() => {
                    moveEnemiesInterval = setInterval(moveEnemies, 50);
                }, 1500); // Старт через 1.5 секунды
            }
        });
    
        // Добавляем tabindex для возможности фокуса
        container.setAttribute("tabindex", "0");
        container.style.outline = "none";
    });
}