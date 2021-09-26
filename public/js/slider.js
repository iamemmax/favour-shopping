


// full page slider
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



// product slider
"use strict";

productScroll();

function productScroll() {
  let slider = document.getElementById("slider");
  let next = document.getElementsByClassName("pro-next");
  let prev = document.getElementsByClassName("pro-prev");
  let slide = document.getElementById("slide");
  let item = document.getElementById("slide");

  for (let i = 0; i < next.length; i++) {
    //refer elements by class name

    let position = 0; //slider postion

    prev[i].addEventListener("click", function() {
      //click previos button
      if (position > 0) {
        //avoid slide left beyond the first item
        position -= 1;
        translateX(position); //translate items
      }
    });

    next[i].addEventListener("click", function() {
      if (position >= 0 && position < hiddenItems()) {
        //avoid slide right beyond the last item
        position += 1;
        translateX(position); //translate items
      }
    });
  }

  function hiddenItems() {
    //get hidden items
    let items = getCount(item, false);
    let visibleItems = slider.offsetWidth / 210;
    return items - Math.ceil(visibleItems);
  }
}

function translateX(position) {
  //translate items
  slide.style.left = position * -210 + "px";
}

function getCount(parent, getChildrensChildren) {
  //count no of items
  let relevantChildren = 0;
  let children = parent.childNodes.length;
  for (let i = 0; i < children; i++) {
    if (parent.childNodes[i].nodeType != 3) {
      if (getChildrensChildren)
        relevantChildren += getCount(parent.childNodes[i], true);
      relevantChildren++;
    }
  }
  return relevantChildren;
}

