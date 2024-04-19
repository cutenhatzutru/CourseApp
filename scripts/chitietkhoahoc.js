var urlParams = new URLSearchParams(window.location.search);
   var data = urlParams.get('data');

function getChapter() {
   
   fetch('http://localhost:8081/course/getbyid?id='+data)
       .then(response => response.json())
       .then(data => {
           let courseinfo = document.getElementById("courseinfo");
           let course = `<a href="#" class="img-pop-up">
               <div class="single-gallery-image" style="background: url('${data.imageUrl}');"></div>
           </a>
           <div class="right-content2">
               <!-- img -->
               <div class="section-tittle section-tittle2 mb-20">
                   <div class="front-text">
                       <h2 class="">${data.title}</h2>
                       <p>${data.description}</p>
                       <a href="#" class="btn">Join now for Free</a>
                   </div>
               </div>
       </div>`;

           courseinfo.innerHTML = course;

           let lstchapter = '';
           let listchapter = document.getElementById('listchapter');
           data.chapters.forEach(element => {
               lstchapter += `<div class="properties__card">
               <div class="properties__caption">         
                   <h3><a href="#" tabindex="-1">${element.title}</a></h3>
                   <p>${element.description}</p>
                   <div class="properties__footer d-flex justify-content-between align-items-center">
                       <div class="restaurant-name">
                           <div class="rating">
                               <i class="fas fa-star"></i>
                               <i class="fas fa-star"></i>
                               <i class="fas fa-star"></i>
                               <i class="fas fa-star"></i>
                               <i class="fas fa-star-half"></i>
                           </div>
                           <p><span>(4.5)</span> based on 120</p>
                       </div>
                       
                   </div>
                   <a href="chitietchuong.html?data=${element.id}" class="border-btn border-btn2" tabindex="-1">Find out more</a>
               </div>
           </div>`;
           });

           listchapter.innerHTML = lstchapter;
       })
       .catch(error => {
           console.error('Có lỗi xảy ra:', error);
       });
}


function getID(){
    window.location.href="themchuong.html?data="+data;
}


document.addEventListener('DOMContentLoaded', getChapter);