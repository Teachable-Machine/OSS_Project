
// target division 설정, drop-area
let dropArea = document.getElementById('drop-area');
let startButton = document.getElementById('init_teachable_machine');
startButton.classList.add('disable');

// add event listerner to each event
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
}) 
// add indicator to show you can drop the item
// this code interact with css
// highlight the area if the item enter or over the area
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
}); 
// unhighlight the area if the item dropped or left the area
;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
});

// handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

// prevent default behaviors
function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation() // ???
}

// enable highlight
function highlight(e) {
  dropArea.classList.add('highlight')
}
// disable highlight
function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

function handleDrop(e) {
  let dt = e.dataTransfer // get dropped data from event?
  let files = dt.files 
  const fileInput = document.querySelector('input[id="fileElem"]');
  fileInput.files = files;

  handleFiles(files);
}
// function to handle a file
function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length)
  files.forEach(previewFile)
}

// Additional Features
let filesDone = 0
let filesToDo = 0
let progressBar = document.getElementById('progress-bar')

// show preview of the uploaded file 
function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file) // get uploaded data from url
  reader.onloadend = function() {
    let img = document.createElement('img')
    img.src = reader.result
    img.id = 'face'
    document.getElementById('gallery').appendChild(img)
  }
  progressDone();
}

function initializeProgress(numfiles) {
  progressBar.value = 0
  filesDone = 0
  filesToDo = numfiles
}
// called after one file's uploading is finished
function progressDone() {
  filesDone++
  progressBar.value = filesDone / filesToDo * 100
  btnActive(); // 예측 시작 button 활성화
}

// 버튼 활성화
function btnActive()  {
  startButton.classList.remove('disable');
}