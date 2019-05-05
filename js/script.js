var colorBlue = '#007AFF';
var colorBlack = 'hsl(0,0%,20%)';
var colorWhite = 'hsl(0,0%,99%)';
var colorGray = 'hsl(0,0%,70%)';
var touchstartOpacity = .2;


window.addEventListener('load', function(){

    init();
    initModel();

});


function init() {

    setCanvasSize();
    
    if(standalone === true) {
        document.body.classList.add('standalone');
    } else if (navigator.userAgent.match(/iPhone/i)) {
        document.body.classList.add('iphone');
    }

    // prevent scrolling
    if (canvasWidth <= window.innerWidth && canvasHeight <= window.innerHeight) {
        document.ontouchmove = function(e){
            if (typeof(e.ownerSVGElement) === undefined) {
                e.preventDefault();
            }
        }
        document.body.style.overflow = 'hidden';
    }
    window.onselectstart = function(e){
        e.preventDefault()
    }

    // select main svg and set size
    svg = d3.select('#svg');
    
    setSizeOfSvgElement();

    // define blur filter
    svg.append('defs').append('filter').attr('id','blur').append('feGaussianBlur').attr('stdDeviation',.5); 

    // set language
    dictionary = dictionary_en;
    
    // show startscreen
    if (visits === 0) {
        showMap();
/*         showStartscreen(); */
    }
    else {
        showMap();
    }
    
}


function setSizeOfSvgElement() {
    
    svg.attr('width',canvasWidth)
    svg.attr('height',canvasHeight)
    
}


function setCanvasSize() {
    // get canvas sizes
    canvasWidth = (window.innerWidth < 300) ? 300 : window.innerWidth;
    canvasHeight = (window.innerHeight < 441) ? 441 : window.innerHeight;
    canvasHeight = (standalone) ? window.innerHeight-20 : window.innerHeight;
    canvasCenterX = canvasWidth/2
    canvasCenterY = canvasHeight/2
}





