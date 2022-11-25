
window.addEventListener('DOMContentLoaded', setResult, false);

// get level data from server //////////
let level = 3;
/////////////////////////////////////////////////

function setResult(){
  setResultImage(level);
  setResultMessage(level);
}

function setResultImage(level){
  $img = document.querySelector(".result > img"); 
  let result_image = document.getElementById("result-image").src;
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