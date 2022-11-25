// get level data from server //////////
let level = 0;
/////////////////////////////////////////////////

// custom event that called after classification.

// add event listener
window.addEventListener('custom_event', setResult, false);

// disable all buttons
let retryButton = document.getElementById('retry');
let detailButton = document.getElementById('more-detail');
let snsButton = document.getElementById('sharing-sns');
retryButton.classList.add('rdisable');
detailButton.classList.add('ddisable');
snsButton.classList.add('sdisable');

// 결과 출력 이벤트 핸들러
// 분류 결과 획득한 level값(탈모 단계)를 인자로 받음
function setResult(){
  setResultImage(level);
  setResultMessage(level);
  enableAllButtons();
}

function setResultImage(level){
  $img = document.querySelector(".result > img"); 
  switch (level){
    case 1:
      $img.src = 'test.jpg'; 
      break;
    case 2:
      $img.src = 'test2.jpg';
      break;
    case 3:
      $img.src = 'test3.jpg';
      break;
    case 4:
      $img.src = 'test4.jpg';
      break;
  }

}

function setResultMessage(level){
  var text = "";
  switch (level){
    case 1:
      text = "가망이 없습니다… 파이팅!";
      break;
    case 2:
      text = "함락 직전입니다. 자라나라 머리머리!";
      break;
    case 3:
      text = "탈모가 시작되었습니다. 전투를 준비하세요!";
      break;
    case 4:
      text = "풍성합니다!!!";
      break; 
  }
  document.getElementById("result-message").innerHTML = text;

}

function enableAllButtons(){
  retryButton.classList.remove('rdisable');
  detailButton.classList.remove('ddisable');
  snsButton.classList.remove('sdisable');
}