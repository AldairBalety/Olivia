'use strict'

const galery = document.querySelector('.galery');
const main_img = document.querySelector('.main-img');
const feed = document.querySelector('.main-galery');
const pagination = document.querySelector('#pagination');

const token = 'IGQVJYOTFoT3Njb1RJRjZAwMlJUT0wtanRacG0xRE1xdFBneWJmQ05HMWNBbF9kUnc4MXBNVjRLa0t3dEtIMDhybjdWMXNraFBQaFFxRkZAtQk5lZAlZAHbkNzY0VVVW5ib0pjM0p6TFNWMndKbTN0a19HTQZDZD';
const url =`https://graph.instagram.com/me/media?fields=thumbnail_url,media_url,caption,permalink&access_token=${token}`;

fetch(url)
.then(res => res.json())
.then(data => CreatHtml(data.data))

function CreatHtml(data){
    var x = 0;
    var liPrev = `
    <li id="prev">
        <a class="page-link prev" onclick="directionPage(-1)" aria-label="Previous">
            <img src="assets/left.svg" alt="">
        </a>
    </li>
    `;
    for(var i = 3;i <= data.length; i += 3) {
        var display = x !== 0 ? 'none': 'block'
        feed.innerHTML += `
        <!-- galety -->
        <div class="contenedor-galery-${x++}" style="display: ${display};">
            <div class="galery">
            <!-- 1 -->
                <div class="img-box">
                    <img src="${data[i-3].media_url}" alt="" />
                    <div class="transparent-box">
                        <div class="caption">
                            <p class="opacity-low">${data[i].caption}</p>
                        </div>
                    </div>
                </div>
                <!-- 2 -->
                <div class="img-box">
                    <img src="${data[i-2].media_url}" alt="" />
                    <div class="transparent-box">
                        <div class="caption">
                            <p class="opacity-low">${data[i+1].caption}</p>
                        </div>
                    </div>
                </div>
                <!-- 3 -->
                <div class="img-box">
                    <img src="${data[i-1].media_url}" alt="" />
                    <div class="transparent-box">
                        <div class="caption">
                            <p class="opacity-low">${data[i+2].caption}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end galery -->
        `;
        liPrev += `
        <li class="page-item act"><a class="page-link" id="page${x}" onclick="changePage(this)">${x}</a></li>
        `
    }
    liPrev += `
    <li id="next">
        <a class="page-link next" onclick="directionPage(+1)" aria-label="Next">
            <img src="assets/right.svg" alt="">
        </a>
    </li>
    `;
    pagination.innerHTML = liPrev;
    MaingImg(data);
}
function MaingImg(data){
}
function moveGalery(e){
    if (e.target.id === 'next' || e.target.parentElement.id === 'next' ) {
        feed.scrollLeft += feed.offsetWidth;
    } else {
        feed.scrollLeft -= feed.offsetWidth;
    }
}