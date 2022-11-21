
// target division 설정, drop-area
let dropArea = document.getElementById('drop-area');

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

  // one file
  let file = dt.file 
  handleFile(file); // onchange handler

  // multiple file, FileList
  //let files = dt.files 
  //handleFiles(files) // onchange handler
}
// function to handle a file
function handleFile(file) { 
  initializeProgress(1);
  uploadFile(file);
  previewFile(file);
}
/*
// function for handling multiple files
function handleFiles(files) {
  files = [...files] // convert FileList files to array
  initializeProgress(files.length); // progress bar
  files.forEach(uploadFile) // upload multiple files 
  files.forEach(previewFile) // show preview of uploaded files 
}
*/
/////////////////////////////////////////////////////////////////

/* sending data to server */
function uploadFile(file) {
  let url = 'YOUR URL HERE' // to be assigned later
  
  // FormData()
  // built-in browser api
  // creating form data to be sended to server
  let formData = new FormData()

  formData.append('file', file)

  /*
  // window.fetch( url, option object )
  // HTTP communication, browser api
  // send data to server
  // return promise object

  // example
  fetch(url, options)
  .then((response) => console.log("response:", response))
  .catch((error) => console.log("error:", error));
  */
  fetch(url, { 
    method: 'POST',
    body: formData
  }) 
  //.then(() => { /* Done. Inform the user */ })
  .then(progressDone) // show progress through progress bar
  .catch(() => { /* Error. Inform the user */ })
}

///////////////////////////////////////////////////////////////

// Additional Features

// show preview of the uploaded file 
function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file) // get uploaded data from url
  reader.onloadend = function() {
    let img = document.createElement('img')
    img.src = reader.result
    document.getElementById('gallery').appendChild(img)
  }
}

// Progress bar, show progress of uploading
let filesDone = 0
let filesToDo = 0 
let progressBar = document.getElementById('progress-bar')
// start uploading, call initializeProgress
function initializeProgress(numfiles) {
  progressBar.value = 0
  filesDone = 0
  filesToDo = numfiles
}
// called after one file's uploading is finished
function progressDone() {
  filesDone++
  progressBar.value = filesDone / filesToDo * 100
}