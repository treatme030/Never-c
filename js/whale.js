//scroll event
window.addEventListener('scroll', function(){
    let windowScroll = document.documentElement.scrollTop;

    //header 색상 변경
    if(windowScroll > 0){
        document.getElementById('whale-header').classList.add('visible');
    } else {
        document.getElementById('whale-header').classList.remove('visible');
    }

    //tab 이미지 나타내기
    let tabImgs =  document.querySelectorAll('.security span');

    if(windowScroll > document.querySelector('.security').offsetTop -200){
        for(let tabImg of tabImgs){
        tabImg.style.transform = 'scale(1)';
        }
    }

    //custom center 이미지 변경
    if (windowScroll > document.querySelector('.custom').offsetTop -200){
        let customImg = document.querySelectorAll('.clock-box span');
        for(let img of customImg){
            img.style.animation = 'moveLeft .2s ease-in-out 1.2s both';
        }
    }
});

//browser 이미지 변경
let browserImgArray = ['img/whale-img/browser/fast.png', 'img/whale-img/browser/secure.png', 'img/whale-img/browser/smart.png'];
let imgNum = 0;

setInterval(changeImg, 5000);

function changeImg(){
    imgNum++;
    if(imgNum === browserImgArray.length){
        imgNum = 0;
    }
    document.getElementById('browser-img').src = browserImgArray[imgNum];
}

//hidden-menu 아이콘 클릭하면 숨긴메뉴 열리고, 
//sidebar 메뉴외의 공간인 sidebar-bg 클릭하면 숨긴 메뉴 닫힘
let sidebar = document.querySelector('#sidebar');

document.querySelector('.hidden-menu').addEventListener('click', function(){
    sidebar.classList.add('opened');
});

document.querySelector('#sidebar .sidebar-bg').addEventListener('click', function(){
    sidebar.classList.remove('opened');
});

