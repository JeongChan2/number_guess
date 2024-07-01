//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니ㅏㄷ!
// 랜덤번호가 < 유저번호 Down!!!
// 랜덤번호가 > 유저번호 Up!!
//Reset버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disabled)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회 깎지 안흔다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다.

let computerNum = 0;
let remain_num = 3;
let history = [];
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let remainText = document.getElementById("remain-text");
let resetButton = document.getElementById("reset-button");
let inputList = document.getElementById("input-list");
let resultNum = document.getElementById("result-num");

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);

function reset() {
  remain_num = 3
  userInput.value = '';
  remainText.textContent = `남은 횟수: ${remain_num}`;
  resultArea.textContent = "결과가 나옴";
  playButton.disabled = false;
  pickRandomNum();
  history = []
  inputList.textContent = '입력한 숫자: '
}

userInput.addEventListener("focus", function() {
  userInput.value = '';
})

function pickRandomNum(){
  computerNum = Math.floor(Math.random() * 50) + 1;
  console.log("정답",computerNum);
  resultNum.textContent = `정답: ${computerNum}`
}

function play() {
  let userValue = userInput.value;

  if(userValue < 0 || userValue > 50 || userValue.trim() == ''){
    resultArea.textContent = "0부터 50사이의 숫자를 입력해주세요.";
    return;
  }

  if(history.includes(userValue)){
    resultArea.textContent = "이미 입력한 숫자입니다.";
    return;
  }
  remain_num--;
  remainText.textContent = `남은횟수: ${remain_num}`;

  history.push(userValue);
  inputList.textContent = `입력한 숫자: ${history}`

  if(remain_num < 1) {
    playButton.disabled = true;
    resultArea.textContent = "기회 소진!"
    return;
  }

  if(userValue < computerNum){
    resultArea.textContent = "Up!!!"
  }else if(userValue > computerNum){
    resultArea.textContent = "Down!!!"
  } else {
    resultArea.textContent = `정답!!! ${userValue}`
    playButton.disabled = true;
  }
}

pickRandomNum();