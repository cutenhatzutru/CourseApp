var urlParams = new URLSearchParams(window.location.search);
var lesson_id = urlParams.get('data');
let preview_btn = 1;

var url;
var token;

function getURLandToken() {
  fetch('http://localhost:8081/lesson/getlessonurl?id=' + lesson_id)
    .then(response => response.json())
    .then(data => {
      url = data.url;
      token = data.token;
      // Gọi hàm getLesson sau khi lấy được URL và token
      console.log(url);
      console.log(token);
      getLesson(); // Gọi hàm getLesson sau khi lấy được URL và token
    })
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}

function getLesson() {
  fetch(url, {
    headers: {
      'token': token
    }
  })
    .then(response => response.json())
    .then(data => {
        if (data.videoUrl != null) {
            document.getElementById("videoContainer").innerHTML = `
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="${data.videoUrl}" allowfullscreen=""></iframe>
              </div>
            `;
        }
      let lessoninfo = document.getElementById("lessoninfo");
      let lesson = `<h2 style="color: #2d2d2d;">${data.title}</h2>
   <ul class="blog-info-link mt-3 mb-4">
      <li><a href="#"><i class="fa fa-comments"></i> 03 Comments</a></li>
   </ul>
  
   <p>${data.description}</p>
   <div class="quote-wrapper">
      <div class="quotes">
      ${data.content}
      </div>
   </div>
  `;
      lessoninfo.innerHTML = lesson; // Gán nội dung vào phần tử HTML







    })
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}

document.addEventListener('DOMContentLoaded', getURLandToken);