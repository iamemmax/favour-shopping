// var carousel = document.getElementById('carousel');
// var slides = 3;
// var speed = 7000; // 5 seconds

// function carouselHide(num) {
//     indicators[num].setAttribute('data-state', '');
//     slides[num].setAttribute('data-state', '');

//     slides[num].style.opacity=0;
// }

// function carouselShow(num) {
//     indicators[num].checked = true;
//     indicators[num].setAttribute('data-state', 'active');
//     slides[num].setAttribute('data-state', 'active');

//     slides[num].style.opacity=1;
// }

// function setSlide(slide) {
//     return function() {
//         // Reset all slides
//         for (var i = 0; i < indicators.length; i++) {
//             indicators[i].setAttribute('data-state', '');
//             slides[i].setAttribute('data-state', '');
            
//             carouselHide(i);
//         }

//         // Set defined slide as active
//         indicators[slide].setAttribute('data-state', 'active');
//         slides[slide].setAttribute('data-state', 'active');
//         carouselShow(slide);

//         // Stop the auto-switcher
//         clearInterval(switcher);
//     };
// }

// function switchSlide() {
//     var nextSlide = 0;

//     // Reset all slides
//     for (var i = 0; i < indicators.length; i++) {
//         // If current slide is active & NOT equal to last slide then increment nextSlide
//         if ((indicators[i].getAttribute('data-state') == 'active') && (i !== (indicators.length-1))) {
//             nextSlide = i + 1;
//         }

//         // Remove all active states & hide
//         carouselHide(i);
//     }

//     // Set next slide as active & show the next slide
//     carouselShow(nextSlide);
// }

// if (carousel) {
//     var slides = carousel.querySelectorAll('.slide');
//     var indicators = carousel.querySelectorAll('.indicator');

//     var switcher = setInterval(function() {
//         switchSlide();
//     }, speed);

//     for (var i = 0; i < indicators.length; i++) {
//         indicators[i].addEventListener("click", setSlide(i));
//     }
// }





window.onload = function() {

    let slider = document.querySelector('#slider');
    let move = document.querySelector('#move');
    let moveLi = Array.from(document.querySelectorAll('#slider #move li'));
    let forword = document.querySelector('#slider #forword');
    let back = document.querySelector('#slider #back');
    let counter = 1;
    let time = 3000;
    let line = document.querySelector('#slider #line');
    let dots = document.querySelector('#slider #dots');
    let dot;

    for (i = 0; i < moveLi.length; i++) {

        dot = document.createElement('li');
        dots.appendChild(dot);
        dot.value = i;
    }

    dot = dots.getElementsByTagName('li');

    line.style.animation = 'line ' + (time / 1000) + 's linear infinite';
    dot[0].classList.add('active');

    function moveUP() {

        if (counter == moveLi.length) {

            moveLi[0].style.marginLeft = '0%';
            counter = 1;

        } else if (counter >= 1) {

            moveLi[0].style.marginLeft = '-' + counter * 100 + '%';
            counter++;
        } 

        if (counter == 1) {

            dot[moveLi.length - 1].classList.remove('active');
            dot[0].classList.add('active');

        } else if (counter > 1) {

            dot[counter - 2].classList.remove('active');
            dot[counter - 1].classList.add('active');

        }

    }

    function moveDOWN() {

        if (counter == 1) {

            moveLi[0].style.marginLeft = '-' + (moveLi.length - 1) * 100 + '%';
            counter = moveLi.length;
            dot[0].classList.remove('active');
            dot[moveLi.length - 1].classList.add('active');

        } else if (counter <= moveLi.length) {

            counter = counter - 2;
            moveLi[0].style.marginLeft = '-' + counter * 100 + '%';   
            counter++;

            dot[counter].classList.remove('active');
            dot[counter - 1].classList.add('active');

        }  

    }

    for (i = 0; i < dot.length; i++) {

        dot[i].addEventListener('click', function(e) {

            dot[counter - 1].classList.remove('active');
            counter = e.target.value + 1;
            dot[e.target.value].classList.add('active');
            moveLi[0].style.marginLeft = '-' + (counter - 1) * 100 + '%';

        });

    }

    forword.onclick = moveUP;
    back.onclick = moveDOWN;

    let autoPlay = setInterval(moveUP, time);

    slider.onmouseover = function() {

        autoPlay = clearInterval(autoPlay);
        line.style.animation = '';

    }

    slider.onmouseout = function() {

        autoPlay = setInterval(moveUP, time);
        line.style.animation = 'line ' + (time / 1000) + 's linear infinite';

    }
  
}


