function DropSection(dropData) {



window.dropSection = this;

var id = dropData.id;

var date = new Date(dropData.date);
var day = (date.getDate() < 10) ? '0'+date.getDate() : date.getDate();
var month = ((date.getMonth() + 1) < 10) ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
var year = date.getYear()-100;

var author = (typeof(dropData.author) === 'undefined') ? 'Anonym' : dropData.author;

var textStringsArray = dropData.text.split(' ');
var textSpanElementsArray = [];

var duration = 0;


// elements
var dropSectionElement = document.createElement('section');
dropSectionElement.id = 'drop';
var textElement = document.createElement('div');
textElement.classList.add('text');
for (var i = 0; i < textStringsArray.length; i++) {
    var textSpanElement = document.createElement('span');
    duration = i*120;
    textSpanElement.style.transitionDelay = Math.round(Math.random()*500+duration)+'ms';
    textSpanElement.style.transitionDuration = Math.round(Math.random()*3000)+1000+'ms';
    textSpanElement.innerHTML = textStringsArray[i];
    textSpanElement.style.opacity = 0;
    textSpanElementsArray.push(textSpanElement);
    textElement.appendChild(textSpanElement);
    textElement.appendChild(document.createTextNode(' '))
}
var asideElement = document.createElement('aside');
asideElement.innerHTML = '<time><span>'+day+'</span><span>'+month+'</span><span>'+year+'</span></time><span class="author">by <em>'+author+'</em></span>';

dropSectionElement.appendChild(textElement);
dropSectionElement.appendChild(asideElement);



var circleRadius = Math.sqrt((canvasCenterX*canvasCenterX)+(canvasCenterY*canvasCenterY));
var startAnimation = svg.append('circle');



function init() {

    removeDrop();
    
    startAnimation.attr('cx',canvasCenterX)
                  .attr('cy',canvasCenterY)
                  .attr('r',32)
                  .attr('fill',colorBlue)
                  .attr('stroke',colorBlue)
                  .attr('stroke-width',1.5)
                  .transition()
                  .duration(200)
                  .ease('linear')
                  .attr('fill',colorWhite)
    startAnimation.transition()
                  .duration(400)
                  .delay(200)
                  .attr('r',circleRadius)
                  .attr('fill',colorWhite)
                            
    dropSectionElement.style.opacity = 0;
    dropSectionElement.style.transitionDuration = '400ms';
    document.body.appendChild(dropSectionElement);
    asideElement.style.opacity = 0;
    asideElement.style.webkitTransform = 'scale(.95)';
    asideElement.style.transitionDuration = '400ms';
    asideElement.style.transitionTimingFunction = 'cubic-bezier(.3,0,.5,1.8)'; 
    
    setTimeout(function(){
        dropSectionElement.style.opacity = 1;
        for (var i = 0; i < textSpanElementsArray.length; i++) {
            textSpanElementsArray[i].style.opacity = 1;
        }
    },600);
    setTimeout(function(){
        asideElement.style.opacity = 1;
        asideElement.style.webkitTransform = 'scale(1)';
        startAnimation.remove();
        fadeOutDropSection();
    },duration+2000);

} // end of init();



function removeDrop() {
    // remove drop from array
    var newDropsArray = []
    for (var i = 0; i < drops.length; i++) {
        if(id === drops[i].id) {
            drops[i].remove;
        }
        else {
            newDropsArray.push(drops[i]);
        }
    }
    drops = newDropsArray;
}



function fadeOutDropSection() {
    setTimeout(function(){
        for (var i = 0; i < textSpanElementsArray.length; i++) {
            textSpanElementsArray[i].style.transitionDelay = Math.round(Math.random()*2000)+'ms';
            textSpanElementsArray[i].style.transitionDuration = Math.round(Math.random()*3000)+5000+'ms';
            textSpanElementsArray[i].style.opacity = 0;
        }
        asideElement.style.transitionDelay = '2000ms';
        asideElement.style.transitionDuration = '5000ms';
        asideElement.style.webkitTransform = 'scale(.98)';
        asideElement.style.opacity = 0;
        dropSectionElement.style.transitionDelay = '4000ms';
        dropSectionElement.style.transitionDuration = '3000ms';
        dropSectionElement.style.opacity = 0;
    	dropSectionElement.addEventListener('transitionend',function(e){
            if (e.target === dropSectionElement) {
                dropSectionElement.remove();
                delete window.dropSection;
                dropSectionElement.removeEventListener(this);
            }
    	});
    }, duration*0.2+1000);
}



init();


    
} // end of openDrop()


