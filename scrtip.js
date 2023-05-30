'use strict'

const galery = document.querySelector('.galery');
const main_img = document.querySelector('.main-img');
const feed = document.querySelector('.main-galery');
const pagination = document.querySelector('#pagination');

const token = 'IGQVJWX1NKN0hHSDljOHdnSGJRSG1DSzV0WEJyY1NzTWM5RjhCYW8wVm91TktOTzlTT2dwWUkzeFluU1dHVkhfSHk2VGdWX0lIMzRzQnVyZAmZAabXAzSDM1bVNzOGxqNng1RXBEbFRWWV9kdzRhV2tBRwZDZD';
const url =`https://graph.instagram.com/me/media?fields=thumbnail_url,media_url,caption,permalink&access_token=${token}`;

fetch(url)
.then(res => res.json())
.then(data => CreatHtml(data.data))

function CreatHtml(data){
    var x = 0;
    var liPrev = '';
    for(var i = 3;i <= data.length; i += 3) {
        var display = x !== 0 ? 'none': 'block'
        var Galery = "";
        for(var j = i-2; j <= i; j++){
            Galery +=`
            <!-- ${j} -->
            <div class="img-box">
                <img src="${data[j].media_url}" alt="" />
                <div class="transparent-box">
                    <div class="caption">
                        <p class="opacity-low">${data[j].caption}</p>
                    </div>
                </div>
            </div>
            `;
        }
        var Feed = `
        <!-- galety -->
        <div class="contenedor-galery-${x++}" style="display: ${display};">
            <div class="galery">
            ${Galery}
            </div>
        </div>
        <!-- end galery -->`;
        liPrev += `<li class="page-item act"><a class="page-link" id="page${x}" onclick="changePage(this)">${x}</a></li>`;
        Galery =+ "";
        feed.innerHTML += Feed; 
    }
    if(liPrev !== "undefined"){
        pagination.innerHTML = liPrev;
    }
}
var i;
function changePage(elem) {
    for (i = 0; i <= $(elem).closest('ul').attr('id').length - 6; i++) {
        if (i == $(elem).text()) {
            $(`.contenedor-galery-${$(elem).text()}`).css("display", "block")
        } else {
            $(`.contenedor-galery-${i}`).css("display", "none")
        }
    }
}
function test(t) {
    if (t === undefined) {
      return 'Undefined value!';
    }
    return t;
  }
function moveGalery(e){
    if (e.target.id === 'next' || e.target.parentElement.id === 'next' ) {
        feed.scrollLeft += feed.offsetWidth;
    } else {
        feed.scrollLeft -= feed.offsetWidth;
    }
}