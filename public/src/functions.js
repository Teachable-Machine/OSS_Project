
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function returnPercentage(num1){ //단계별 %값 가져오기
    return localStorage.getItem(JSON.stringify(num1));
  }
  function returnMaxValue(){ //단계별 %중 max값 가져오기
    return localStorage.getItem('maxKey')
  }
async function init() {
    const URL = 'https://teachablemachine.withgoogle.com/models/xSlX5fFwo/';
     
    let model, labelContainer, maxPredictions;
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) {
        // and class labels
        labelContainer.appendChild(document.createElement('div'));
    }
    var image = document.getElementById('face-image');
    const prediction = await model.predict(image, false);
    localStorage.setItem('maxvalue','-1') //%값 maxvalue -1로 초기화
    localStorage.setItem('maxKey','0') //단계값 maxKey 0로 초기화
    /*
    localStorage 특성상 key와 value에 string만 사용할 수 있음
    호출과 저장시 string->int, int->string 변환을 해주어야함
        *[ ] JSON.stringfy, JSON.parse 등 참고
    localStorage value 값 수정은 c++ set, map 마찬가지로 그냥 setItem 사용하면 자동 수정되는듯함
    */
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ': ' + prediction[i].probability.toFixed(2)*100 + "%";
            if(prediction[i].probability.toFixed(2)*100>JSON.parse(localStorage.getItem('maxvalue'))){ //저장되어있는 maxvalue값 초과시 maxvalue, maxkey 수정
                localStorage.setItem('maxvalue',JSON.stringify(prediction[i].probability.toFixed(2)*100)) //maxvalue 수정
                localStorage.setItem('maxKey',i+1) //maxKey 수정
            }
            localStorage.setItem(JSON.stringify(i+1),JSON.stringify(prediction[i].probability.toFixed(2)*100)) //이따 호출하기 편하게 i+1값으로 key값 설정해줌
    }
}
export {readURL};