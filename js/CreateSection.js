function CreateSection() {



var date = new Date();
var day = (date.getDate() < 10) ? '0'+date.getDate() : date.getDate();
var month = ((date.getMonth() + 1) < 10) ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
var year = date.getYear()-100;

var dropDropAllowed = false;



// elements
var createSectionElement = document.createElement('section');
createSectionElement.id = 'create';
var headerElement = document.createElement('header');
var dismissButtonElement = document.createElement('a');
dismissButtonElement.classList.add('back');
dismissButtonElement.innerHTML = dictionary.dismiss;
var dropDropButtonElement = document.createElement('a');
dropDropButtonElement.classList.add('submit')
dropDropButtonElement.innerHTML = dictionary.dropDrop;
dropDropButtonElement.style.opacity = .2;
var textElement = document.createElement('div');
textElement.classList.add('text');
var textareaElement = document.createElement('textarea');
textareaElement.setAttribute('row','3');
textareaElement.addEventListener('keyup',function(){
    dropDropAllowed = (this.value.length > 0) ? true : false;
    changeDropDropButton()
})
var asideElement = document.createElement('aside');
var timeElement = document.createElement('time');
timeElement.innerHTML = '<span>'+day+'</span><span>'+month+'</span><span>'+year+'</span>';
var authorElement = document.createElement('span');
authorElement.classList.add('author');
authorElement.innerHTML = 'by <em>Anonym</em>';
var navElement = document.createElement('nav');
var editNameElement = document.createElement('a');
editNameElement.classList.add('name');
editNameElement.innerHTML = dictionary.editName;
var seperatorElement = document.createElement('div');
seperatorElement.classList.add('seperator');
var addEditPhotoElement = document.createElement('a');
addEditPhotoElement.classList.add('addEditPhoto');
addEditPhotoElement.innerHTML = dictionary.addPhoto;
var overlayElement = document.createElement('div');
overlayElement.classList.add('overlay');

headerElement.appendChild(dismissButtonElement);
headerElement.appendChild(dropDropButtonElement);

textElement.appendChild(asideElement);
textElement.appendChild(textareaElement);

asideElement.appendChild(timeElement);
asideElement.appendChild(authorElement);

navElement.appendChild(editNameElement);
navElement.appendChild(seperatorElement);
navElement.appendChild(addEditPhotoElement);

createSectionElement.appendChild(headerElement);
createSectionElement.appendChild(textElement);
createSectionElement.appendChild(navElement);



// add eventlistener to elements

dismissButtonElement.addEventListener('click',hide)
dismissButtonElement.addEventListener('touchstart',touchstart)
dismissButtonElement.addEventListener('touchend',touchend)

dropDropButtonElement.addEventListener('click',dropDrop)
dropDropButtonElement.addEventListener('touchstart',touchstart)
dropDropButtonElement.addEventListener('touchend',touchend)

editNameElement.addEventListener('click',function(){
    alert('Nope, not yet. You have to stay anonymous');
})
editNameElement.addEventListener('touchstart',touchstart)
editNameElement.addEventListener('touchend',touchend)
addEditPhotoElement.addEventListener('click',function(){
    alert('This feature still needs a few lines of code to be written.');
})
addEditPhotoElement.addEventListener('touchstart',touchstart)
addEditPhotoElement.addEventListener('touchend',touchend)


var circleRadius = Math.sqrt((canvasCenterX*canvasCenterX)+(canvasCenterY*canvasCenterY));
var circleAnimation = svg.append('circle')
                         .attr('cx',canvasCenterX)
                         .attr('cy',canvasCenterY)
                         .attr('r',32)
                         .attr('fill',colorWhite)
                         .attr('stroke',colorBlue)
                         .attr('stroke-width',1.5)
                         .attr('fill-opacity',0);
                    


function show() {

    headerElement.style.webkitTransform = 'translateY(-100%)';
    headerElement.style.transitionDuration = '350ms';
    headerElement.style.transitionTimingFunction = 'cubic-bezier(0,.3,.5,1.2)'; 
    asideElement.style.opacity = 0;
    asideElement.style.webkitTransform = 'scale(.95)';
    asideElement.style.transitionDuration = '400ms';
    asideElement.style.transitionTimingFunction = 'cubic-bezier(.3,0,.5,1.4)'; 
    navElement.style.webkitTransform = 'translateY(100%)';
    navElement.style.transitionDuration = '350ms';
    navElement.style.transitionTimingFunction = 'cubic-bezier(.3,0,.5,1.2)'; 
    document.body.appendChild(createSectionElement);
    
    circleAnimation.transition()
                   .duration(100)
                   .attr('fill-opacity',.98);
    circleAnimation.transition()
                   .duration(500)
                   .delay(200)
                   .attr('r',(circleRadius))
                   .attr('fill',colorWhite)
                   .attr('fill-opacity',.98);
    
    setTimeout(function(){
        headerElement.style.webkitTransform = 'translateY(0)';
        navElement.style.webkitTransform = 'translateY(0)';
    },800)
    setTimeout(function(){
        asideElement.style.opacity = 1;
        asideElement.style.webkitTransform = 'scale(1)';
        textareaElement.focus();
        document.body.scrollTop = 0;
    },1500)
    
} // end of show()



function hide() {

    headerElement.style.transitionTimingFunction = 'cubic-bezier(.5,-.2,1,.7)'; 
    navElement.style.transitionTimingFunction = 'cubic-bezier(.5,-.2,1,.7)'; 
    asideElement.style.transitionTimingFunction = 'cubic-bezier(.5,-.4,1,.7)'; 
    headerElement.style.webkitTransform = 'translateY(-100%)';
    navElement.style.webkitTransform = 'translateY(100%)';
    asideElement.style.webkitTransform = 'scale(.7)';
    asideElement.style.opacity = 0;
    textElement.style.transitionDuration = '400ms';
    textElement.style.opacity = 0;

    circleAnimation.transition()
                   .duration(500)
                   .delay(500)
                   .attr('r',(32));
    circleAnimation.transition()
                   .duration(200)
                   .delay(1000)
                   .attr('fill-opacity',0)
                   .remove();
                        
    setTimeout(function(){
        createSectionElement.remove();
    }, 1200);

} // end of hide()



function changeDropDropButton() {
    
    if (dropDropAllowed === true) {
        dropDropButtonElement.style.opacity = 1;
    } else {
        dropDropButtonElement.style.opacity = .2;
    } 
    
} // end of changeDropDropButton()



function dropDrop() {

    if (dropDropAllowed === true) {
        var now = new Date();
        var text = textareaElement.value;
        var author = 'Anonym';
        var date = now;
        dropDropButtonElement.style.opacity = .2;
        postDropDataToServer(text,author,date);
        var waitForPostDropDataSuccess = setInterval(function(e){
            try {
                if(postDropDataSuccess === true) {
                    clearInterval(waitForPostDropDataSuccess);
                    hide();
                }
                else {
                    console.warn('Drop couldn’t be posted.');
                }
            }
            catch(error) {
                console.log(error)
            }
        }, 500);
    }
    else {
        alert('Please be so kind and type at least one letter.');
    }

} // end of dropDop



show();



} // end of showCreateSection()







function autoSizeTextarea(e) {
    e.style.height = 'auto';
    var height = (e.scrollHeight > 32 ? e.scrollHeight : 32);
    e.style.height = height + 'px';
}
