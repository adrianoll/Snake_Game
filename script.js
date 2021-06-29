//Declaração das variáveis do Jogo
let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;                       //32 pixels cada quadrado.
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";           //Direção inicial da Snake.
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Cria o Canvas - BACKGROUND
function criarBG() {
    context.fillStyle = "lightgreen";
    //desenha o quadrado (x, y, altura, largura)
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Cria a SNAKE
function criarCobrinha(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//FOOD
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Mudando a direção.
document.addEventListener('keydown', update);

//Adicionando direção do movimento de acordo com a tecla:
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

//Iniciar JOGO
function iniciarJogo(){
    //Controle do choque
    for(i=1; i<snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over!! :(');
            alert('Pressione F5 para jogar novamente!');
        }
    }

    //Atualização do outro lado do Canvas
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

    //Chamada das funções
    criarBG();
    criarCobrinha();
    drawFood();

    //Posição Inicial da Snake.
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Direcionamento da SNAKE
    if(direction == "right") snakeX += box; //Direita (+) esquerda (-)
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box; //Cima (-) Baixo (+)
    if(direction =="down") snakeY += box;

    //Alimentação SNAKE
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();         //Retira o último elemento do array.
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    
    //Nova cabeça da SNAKE
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

//Intervalo de atualização a cada 100 ms.
let jogo = setInterval(iniciarJogo, 100);

