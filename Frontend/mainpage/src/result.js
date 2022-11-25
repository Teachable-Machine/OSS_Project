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
/*
// 분류를 종료한 후, 다음과 같이 이벤트를 정의할것
export let ClassifyDone = new CustomEvent("FinishClassificaion",
  {
    'detail': {level: 분류결과값} // 여기에 local repository에 저장된 분류 결과값(1,2,3,4)을 할당.
                                  // 이벤트 호출 전 반드시 값을 변경해줄것.
  });

// 다음과 같이 이벤트를 호출할것 
// window.dispatchEvent(ClassifyDone);
*/
// 테스트
let mytest;
setTimeout(function () {
  mytest = new CustomEvent("FinishClassificaion",
  {
    'detail': {level: 3}
  });
  window.dispatchEvent(mytest); // 비동기적 실행에 주의할것
}, 3000);
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
    default:
      $img.src = 'loading_image.jfif';
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

