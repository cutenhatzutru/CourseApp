var urlParams = new URLSearchParams(window.location.search);
var data = urlParams.get('data');
function getCourse(){
   
    fetch('http://localhost:8081/course')
        .then(response => response.json()) // Chuyển đổi response thành JSON
        .then(data => {
            let html = "";
            let course_conn=document.getElementById('course_con');
            data.forEach(element => {
                html += ` <div class="col-lg-4">
                <div class="properties properties2 mb-30">
                    <div class="properties__card">
                        <div class="properties__img overlay1">
                            <a href="#"><img src="${element.imageUrl}" alt=""></a>
                        </div>
                        <div class="properties__caption">
                            <p>${element.title}</p>
                            <p>${element.description}</p>
                            <div class="properties__footer d-flex justify-content-between align-items-center">
                            </div>
                            <a href="chitietkhoahoc.html?data=${element.id}" class="border-btn border-btn2">Find out more</a>
                        </div>
                    </div>
                </div>
            </div>`;
            });
            course_conn.innerHTML=html;
        })
        .catch(error => {
        console.error('Có lỗi xảy ra:', error);
    });
      
}


document.addEventListener('DOMContentLoaded',getCourse);

