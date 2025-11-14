var currentScore = document.querySelector('#currentScore');
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');
var clickButton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var statusMessage = document.querySelector('#statusMessage');
var resetButton = document.querySelector('#resetButton');
var resetScore = document.querySelector('#resetScore');
var pause = document.querySelector('#pause');
var resume = document.querySelector('#resume');
var username = prompt("Enter Your Name:");
var video1 = document.querySelector('.video1');

var current =0;
var high= 0;
var flag= false;
var timeId= null;
var timer1= 10;
var timer2= 1;

function onWebsite(){
    loadData();
    displayContent();
}

function loadData(){
    var temp =localStorage.getItem ('highScore');
    if(temp != null){
        high = temp;
    }
    else{
        high = 0;
    }
}

function displayContent(){
    currentScore.textContent = current;
    highScore.textContent = high;
    timer.textContent = timer1;
    
}
function startGame(){
    video1.style.display="none";
    pause.disabled=false;
    clickButton.disabled = false;
    startButton.disabled = true;
    resetButton.disabled = true;
    resetScore.disabled = true;
    startButton.style.cursor="not-allowed";
    resetButton.style.cursor="not-allowed";
    resetScore.style.cursor="not-allowed";
    clickButton.style.cursor="pointer";
    flag = true;
    timer1 = 10;
    current=0;

    //3. reset scale to default
    clickButton.style.transform = 'scale(1)';
    currentScale = 1;
    //<=======================>

    // 2. "Click Me!" Message Flashes on Start
    clickButton.textContent="Click ME!";
    setTimeout(function(){
        clickButton.textContent="";
    },1000)
    //<=======================>


    statusMessage.textContent = "The Game is Started";
    timeId = setInterval(function (){
        timer1--;
        
        
        if(timer1<=0){
            endGame();
        }
        displayContent();
          
    },1000)
    clickButton.style.backgroundColor="red";  
}

// Click Counter Turns Red When > 20
let currentScale =1;

function userClick(){

    //3. Button Grows When You Click
    currentScale *= 1.01;
     if (currentScale > 1.2) {
        currentScale = 1.2;
    }
     clickButton.style.transform = `scale(${currentScale})`;
    //<=======================>

    if(flag){
        current++;
        displayContent();
    }
    
    // 1. to make color red when currentscore>20;
    if(current>20){
        currentScore.style.color="red";
    }
    //<=======================>
}

function endGame() {
    clearInterval(timeId);
    flag = true;
    clickButton.disabled = true;
    startButton.disabled = false;
    resetButton.disabled = false;
    resetScore.disabled = false;
    pause.disabled=true;
    currentScore.style.color="white";
    clickButton.textContent="Click Start to Play Game!";
    
    
    // 3. Button Grows When You Click
    //   reset scale to default
    clickButton.style.transform = 'scale(1)';
    //<=======================>

    // 5. Start Button Says "Play Again" After Game
    startButton.innerText = "Play Again"
    //<=======================>

    if(current > high)

    {
        high = current;
        localStorage.setItem('highScore', current);
        // 4. Show Clicks Per Second (CPS)
        statusMessage.textContent = "Congratulations 🎉" +username + " You click button " +current/10+ " times per second & Your New High Score is : " + current;
        //<=======================>
        // video1.style.display="block";

        // 6. Confetti on New High Score
        document.body.style.background = 'gold'
        setTimeout(function(){
        document.body.style.background = 'linear-gradient(90deg, #5672eb 0%, #915dc6 100%)';
        },1500)
        //<=======================>
    }
    else{
        //4. Show Clicks Per Second (CPS)
        statusMessage.textContent = username + " You click button " +current/10+ " times per second & your Current Score is : " + current;
        //<=======================>
    }
    clickButton.style.backgroundColor=" rgb(219, 219, 219)";
    
}

onWebsite();

function highreset(){

    const confirmed = confirm("Are you sure you want to reset High Score!");
    if(confirmed){
    localStorage.removeItem('highScore');
    high=0;
    highScore.textContent = high;
    statusMessage.textContent = "Your High Score is Reseted";
    }
}

function currentReset(){
    video1.style.display="none";
    currentScore.textContent = 0;
    highScore.textContent = high;
    timer.textContent = 10;
    startButton.style.cursor="pointer";
    clickButton.style.cursor="not-allowed";
    resetButton.style.cursor="pointer";
    resetScore.style.cursor="pointer";
    statusMessage.textContent = "Click Start Game to begin!";
}

function pausegame(){
    clickButton.disabled = true;
    resume.style.display="block";
    pause.style.display="none";
    clearInterval(timeId);
    clickButton.style.backgroundColor="rgb(219, 219, 219)";

}
function resumegame(){
    clickButton.disabled = false;
    resume.style.display="none";
    pause.style.display="block";
    timeId = setInterval(function (){
        timer1--;
        
        
        if(timer1<=0){
            endGame();
        }
        displayContent();
       
          
    },1000)
    clickButton.style.backgroundColor="red";
}

startButton.addEventListener('click',startGame);

clickButton.addEventListener('click' , userClick);

resetButton.addEventListener('click',highreset);

resetScore.addEventListener('click',currentReset);

pause.addEventListener('click',pausegame);

resume.addEventListener('click',resumegame);