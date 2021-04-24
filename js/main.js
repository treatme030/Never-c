//header 스크롤 이벤트
let beforescroll = 0 //이전 스크롤 양
window.addEventListener('scroll', function () {
    if (window.scrollY > 80 && beforescroll < window.scrollY) {
        //스크롤 아래방향
        document.getElementById('header').classList.add('up')
    } else {
        //스크롤 위방향
        document.getElementById('header').classList.remove('up')
    }
    beforescroll = window.scrollY //이전 스크롤 양에 현재 스크롤 양 업데이트
})

//drop-menu 이벤트
let menuItem = document.getElementsByClassName('gnb-menu-item')
let dropMenuWrap = document.getElementsByClassName('gnb-dropmenu-wrap')
let menuItemArray = [...menuItem]

//drop-menu 열림
menuItemArray.forEach((item, idx) => {
    item.addEventListener('mouseenter', function () {
        for (let dropItem of dropMenuWrap) {
            dropItem.classList.remove('open')
        }
        dropMenuWrap[idx].classList.add('open')
    })
})

//drop-menu 닫힘
for (let item of dropMenuWrap) {
    item.addEventListener('mouseleave', function () {
        item.classList.remove('open')
    })
}

//hero 슬라이드 만들기
let slideWrap = document.getElementById('slide-wrap')
let slide = document.getElementsByClassName('slide')
let slideCount = slide.length
let slideWidth = slide[0].clientWidth
let currentIndex = 0

//slide 복사
dupulicateSlide()

function dupulicateSlide() {
    //처음 slide 복사
    let dupulicateFirst = slideWrap.firstElementChild.cloneNode(true)
    dupulicateFirst.classList.add('dupulicate-slide')
    //마지막 slide 복사
    let dupulicateLast = slideWrap.lastElementChild.cloneNode(true)
    dupulicateLast.classList.add('dupulicate-slide')
    //복사한거 연결하기
    slideWrap.prepend(dupulicateLast)
    slideWrap.appendChild(dupulicateFirst)

    updateWidth()
    updatePosition()
    //slideWrap의 기본 위치를 정하고, 0.1s 뒤에 animated 클래스 추가하기
    //그렇지 않으면 배치하는 모습이 그대로 보여짐
    setTimeout(function () {
        slideWrap.classList.add('animated')
    }, 100)
}

//slide-wrap 넓이 구하기
function updateWidth() {
    //복사된 슬라이드 연결된 새로운 슬라이드 불러오기
    let newSlide = document.getElementsByClassName('slide')
    //slide-wrap 넓이
    slideWrap.style.width = slideWidth * newSlide.length + 'px'
    //각 슬라이드 넓이
    for (let item of newSlide) {
        item.style.width = slideWidth + 'px'
    }
}

//slideWrap 위치 정해주기
function updatePosition() {
    slideWrap.style.transform = 'translateX(-' + slideWidth + 'px)'
}

//prev/next 버튼 클릭 slide 이동
let prevbtn = document.getElementById('btn-prev')
let nextbtn = document.getElementById('btn-next')

nextbtn.addEventListener('click', function () {
    moveSlide(currentIndex + 1)
})
prevbtn.addEventListener('click', function () {
    moveSlide(currentIndex - 1)
})

let text = document.getElementsByClassName('slide-info')
let currentPage = document.getElementById('current')
let progressBar = document.getElementById('fill')

function moveSlide(num) {
    currentIndex = num

    //slide 처음과 끝으로 이동한 뒤 순간이동
    if (currentIndex === slideCount) {
        setTimeout(function () {
            slideWrap.classList.remove('animated')
            slideWrap.style.transform = 'translateX(-' + slideWidth + 'px)'
            currentIndex = 0
        }, 500)
        setTimeout(function () {
            slideWrap.classList.add('animated')
        }, 550)
    }
    if (currentIndex < 0) {
        setTimeout(function () {
            slideWrap.classList.remove('animated')
            slideWrap.style.transform = 'translateX(-' + slideCount * slideWidth + 'px)'
            currentIndex = slideCount - 1
        }, 500)
        setTimeout(function () {
            slideWrap.classList.add('animated')
        }, 550)
    }
    //slide 이동
    slideWrap.style.transform = 'translateX(-' + (currentIndex + 1) * slideWidth + 'px)'

    pageChange()
    textprogressBarChange()
}

//페이지 표시 나타내기
function pageChange() {
    currentPage.innerHTML = `${(currentIndex + 1) % slideCount}`
    if (currentIndex + 1 === slideCount || currentIndex + 1 === 0) {
        currentPage.innerHTML = slideCount
    }
}

//텍스트와 진행바 나타내기
function textprogressBarChange() {
    for (let i = 0; i < text.length; i++) {
        text[i].style.opacity = '0'
    }
    if (currentIndex === slideCount) {
        currentIndex = 0
        text[currentIndex].style.opacity = '1'
        progressBar.style.width = 100 / 6 + '%'
    } else if (currentIndex < 0) {
        text[slideCount - 1].style.opacity = '1'
        progressBar.style.width = (slideCount - 1) * (100 / 6) + '%'
    }
    text[currentIndex].style.opacity = '1'
    progressBar.style.width = (currentIndex + 1) * (100 / 6) + '%'
}

//자동슬라이드
setInterval(function () {
    moveSlide(currentIndex + 1)
}, 5000)

moveSlide(0) //초기값
