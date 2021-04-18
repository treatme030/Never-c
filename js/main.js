let slideWrap = document.getElementById('slide-wrap');
let slide = document.getElementsByClassName('slide');
let slideWidth = window.outerWidth;
let slideArray = [...slide];
let currentIndex = 0;


// //slide 복사
dupulicateSlide();

function dupulicateSlide(){
    //처음 slide 복사
    let dupulicateFirst = slideWrap.firstElementChild.cloneNode(true);
        dupulicateFirst.classList.add('dupulicate-slide');
    //마지막 slide 복사
    let dupulicateLast = slideWrap.lastElementChild.cloneNode(true);
        dupulicateLast.classList.add('dupulicate-slide');
    //복사한거 연결하기
    slideWrap.prepend(dupulicateLast);
    slideWrap.appendChild(dupulicateFirst);

    updateWidth();
    updatePosition();
    //animated 클래스 추가하기
    setTimeout(function(){
        slideWrap.classList.add('animated');
    },100);
}
    
//slide-wrap 넓이 구하기
function updateWidth(){
    let newSlide = document.getElementsByClassName('slide');
    slideWrap.style.width = slideWidth * newSlide.length + 'px';
}

//slideWrap 위치 정해주기
function updatePosition(){
slideWrap.style.transform = 'translateX(-' + (slideWidth) + 'px)';
}

// //prev/next 버튼 클릭 slide 이동
let prevbtn = document.getElementById('btn-prev');
let nextbtn = document.getElementById('btn-next');

nextbtn.addEventListener('click', function(){
    moveSlide(currentIndex + 1)
});
prevbtn.addEventListener('click', function(){
    moveSlide(currentIndex - 1)
});

let text = document.getElementsByClassName('slide-info');
function moveSlide(num){
    currentIndex = num;
    //slide 처음과 끝으로 갔을 때 순간이동
    if(currentIndex === slideArray.length){
        setTimeout(function(){
            slideWrap.classList.remove('animated');
            slideWrap.style.transform = 'translateX(-' + (slideWidth) + 'px)';
            currentIndex = 0;
        },500);
        setTimeout(function(){
            slideWrap.classList.add('animated');
        },550);
    }
    if(currentIndex < 0){
        setTimeout(function(){
            slideWrap.classList.remove('animated');
            slideWrap.style.transform = 'translateX(-' + (slideArray.length) * (slideWidth) + 'px)';
            currentIndex = slideArray.length - 1;
        },500);
        setTimeout(function(){
            slideWrap.classList.add('animated');
        },550);
    } 
    //slide 이동
    slideWrap.style.transform = 'translateX(-' + (currentIndex + 1) * (slideWidth) + 'px)';
    for( let i = 0;i < text.length;i++){
        if(text[i] !== currentIndex){
            text[i].style.opacity = '0';
        }
        text[currentIndex].style.opacity = '1';
    }
}

//자동슬라이드
setInterval(function(){
    let nextIndex = (currentIndex + 1) % slide.length;
    currentIndex = nextIndex;
    moveSlide(currentIndex);
}, 5000);

moveSlide(0);//초기값