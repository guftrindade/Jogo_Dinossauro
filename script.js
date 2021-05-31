function start(){


const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;


//MÚSICA DE FUNDO
var musica = document.getElementById('musica');
var somSpace = document.getElementById('somSpace');

musica.addEventListener('ended', function(){ musica.currentTime = 0;
musica.play(); }, false);

musica.play();


//FUNÇÃO BOTÃO DE PULAR
function handleKeyUp(event){
    if(event.keyCode === 32){
        
        if (!isJumping){
            somSpace.play()
            jump();
        }
    }
}


//FUNÇÃO DE PULAR COM O DINOSSAURO
function jump(){
    
    isJumping = true;

    let upInterval = setInterval(() => {
        
        if (position >= 150){
            clearInterval(upInterval);
        
            //DESCER
            let downInterval = setInterval(() => {
                if (position<=0){
                    clearInterval(downInterval);
                    isJumping = false;

                    }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                    }
            }, 30);
        }else{

        //SUBIR
        position += 20;
        dino.style.bottom = position + 'px';
        }
    }, 15);
}


//CRIANDO OS OBSTÁCULOS
function createCactus(){
    
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    console.log(randomTime);

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){

            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class = "game-over"> Fim de jogo</h';

        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }  
    },30);

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
}

start();
