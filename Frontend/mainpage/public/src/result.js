
// disable all buttons
let retryButton = document.getElementById('retry');
let detailButton = document.getElementById('more-detail');
let snsButton = document.getElementById('sharing-sns');
retryButton.classList.add('rdisable');
detailButton.classList.add('ddisable');
snsButton.classList.add('sdisable');
setResultImage(0);
setResultMessage(0);

// 이벤트 리스너에 이벤트 핸들러를 등록
window.addEventListener('FinishClassificaion', setResult, false);

/////////////////////// teachable machine 종료 후 호출될 사용자 정의 이벤트 /////////////////////////

// 분류를 종료한 후, 다음과 같이 이벤트를 정의할것
let mytest;
setTimeout(function () {
  mytest = new CustomEvent("FinishClassificaion",
  {
    'detail': {level: JSON.parse(localStorage.getItem('maxKey'))}
  });
  window.dispatchEvent(mytest); // 비동기적 실행에 주의할것
}, 3000);

// 다음과 같이 이벤트를 호출할것 

// 테스트
/////////////////////////////////////////////////////////////////////////////////////////////////////

// 결과 출력 이벤트 핸들러
// 분류 결과 획득한 level값(탈모 단계)를 이벤트(e)의 속성으로 받기
function setResult(e){
  setResultImage(e.detail.level);
  setResultMessage(e.detail.level);
  enableAllButtons();
}

function setResultImage(level){
  $img = document.querySelector(".result > img"); 
  switch (level){
    case 1:
      $img.src = '/static/test.jpg'; 
      break;
    case 2:
      $img.src = '/static/test2.jpg';
      break;
    case 3:
      $img.src = '/static/test3.jpg';
      break;
    case 4:
      $img.src = '/static/test4.jpg';
      break;
    default:
      $img.src = '/static/loading_image.jfif';
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
    default:
      text = "로딩 중입니다.";
      break;
  }
  document.getElementById("result-message").innerHTML = text;
}

function enableAllButtons(){
  retryButton.classList.remove('rdisable');
  detailButton.classList.remove('ddisable');
  snsButton.classList.remove('sdisable');
}



function returnPercentage(num1){ //단계별 %값 가져오기
  return localStorage.getItem(JSON.stringify(num1));
}
function returnMaxValue(){ //단계별 %중 max값 가져오기
  return localStorage.getItem('maxKey')
}