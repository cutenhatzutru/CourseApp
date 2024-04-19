var urlParams = new URLSearchParams(window.location.search);
var chapter_id = urlParams.get('data');

let preview_btn = 1;

function getLesson() {
   var urlParams = new URLSearchParams(window.location.search);
   var data = urlParams.get('data');
   console.log(data);
 
   fetch('http://localhost:8081/chapter/getbyid?id='+ data)
     .then(response => response.json())
     .then(data => {
       let chapterinfo = document.getElementById("chapterinfo");
       let chapter = `<h3 class="mb-30">${data.title}</h3>
       <div class="row">
           <div class="col-lg-12">
               <blockquote class="generic-blockquote">
                   “${data.description}”
               </blockquote>
           </div>
       </div>`;
       chapterinfo.innerHTML = chapter;
 
       let lstlesson = '';
       let listlesson = document.getElementById('listlesson');
       data.lessons.forEach(element => {
         lstlesson += ` <div class="table-row">
         <div class="serial">${element.id}</div>
         <div class="country">${element.title}</div>
         <div class="visit">${element.description}</div>
         <div class="country">
                 <a href="chitietbaihoc.html?data=${element.id}" class="genric-btn warning">Find out more</a>   
         </div>
         <div class="percentage">
            
             <a href="#" class="genric-btn warning">Preview</a>
         
     </div>
     </div>`;
       });
 
       listlesson.innerHTML = lstlesson;
     })
     .catch(error => {
       console.error('Có lỗi xảy ra:', error);
     });
 }
 
 function removelesson(data){
  const url = 'http://localhost:8080/upload/lesson/delete' + data;
  
  fetch(url, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      getLesson();
  } else {
      console.error('Đã xảy ra lỗi khi xoá dữ liệu!');
    }
  })
  .catch(error => {
    console.error('Đã xảy ra lỗi:', error);
  });

 }


let addnewlesson = ()=>{
  window.location.href = "thembaihoc.html?data="+chapter_id;
}

function previewLesson(id){
  let frame = document.getElementById("previewframe")
  if(preview_btn === 1){
    fetch("http://localhost:8080/download/lesson/getlessonbyid?id="+id)
    .then(response => response.json())
    .then(data =>{
      frame.style.display = "block"
      
      document.getElementById("lessonName").innerText = data.title;
      if(data.videoUrl!=null){
        document.getElementById("videoContainer").innerHTML = `<iframe class="embed-responsive-item" src="${data.videoUrl}" allowfullscreen=""></iframe>`
      }
      document.getElementById("lessonContent").innerText = data.content
    })
    preview_btn = 0 ;
  }
  else{
    frame.style.setProperty('display', 'none', 'important');
    document.getElementById("videoContainer").innerHTML = "";
    preview_btn = 1;
  }

  console.log(preview_btn)

}

 document.addEventListener('DOMContentLoaded', getLesson);