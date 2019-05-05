function Drop(dropData) {

console.log(dropData);

var init = false;
var id = dropData.id;
var latitude = dropData.coords.latitude;
var longitude = dropData.coords.longitude;
var mercX = getMercX(longitude);
var mercY = getMercY(latitude);
var relativeX = null;
var relativeY = null;
var x = null;
var y = null;
var rorate;
var canvasX = null;
var canvasY = null;
var centerOfLineX = null;
var centerOfLineY = null;
var angle = null;
var drop;
var textAngle = null
var distance = null;
var dropCircle = undefined;
var lineToCenter = undefined;
var textDistance = undefined;
var intervalUpdateXY;
var ownDrop = (dropData.author === uniqueID) ? true : false;
var color = (ownDrop === true) ? colorGray : colorBlue;


function setXY() {

    relativeX = (mercX-currentMerc.mercX)/zoom;
    relativeY = (mercY-currentMerc.mercY)/zoom;
    rotateRadian = (deviceOrientationCompassHeading)*(Math.PI/180);
    relativeXWithRotation = Math.cos(rotateRadian) * relativeX - Math.sin(rotateRadian) * relativeY;
    relativeYWithRotation = Math.sin(rotateRadian) * relativeX + Math.cos(rotateRadian) * relativeY;
    x = canvasCenterX+relativeXWithRotation;
    y = canvasCenterY-relativeYWithRotation;

    var intersectionTop = lineIntersect(canvasCenterX,canvasCenterY,x,y, 0,0,canvasWidth,0);
    if (intersectionTop === false) {
        var intersectionRight = lineIntersect(canvasCenterX,canvasCenterY,x,y, canvasWidth,0,canvasWidth,canvasHeight);
        if (intersectionRight === false) {
            var intersectionBottom = lineIntersect(canvasCenterX,canvasCenterY,x,y, 0,canvasHeight,canvasWidth,canvasHeight);
            if (intersectionBottom === false) {
                var intersectionLeft = lineIntersect(canvasCenterX,canvasCenterY,x,y, 0,0,0,canvasHeight);
                if (intersectionLeft !== false) {
                    x = intersectionLeft.x;
                    y = intersectionLeft.y;
                }
            }
            else {
                x = intersectionBottom.x;
                y = intersectionBottom.y;
            }
        }
        else {
            x = intersectionRight.x;
            y = intersectionRight.y;
        }
    }
    else {
        x = intersectionTop.x;
        y = intersectionTop.y;
    }

        
} // end of setXY()

function setCenterOfLineXY() {
    centerOfLineX = (canvasCenterX-x)/2.3+x;
    centerOfLineY = (canvasCenterY-y)/2.3+y;
} // end of setCenterOfLineXY
function setAngle() {
    textAngle = Math.atan2(canvasCenterY-y,canvasCenterX-x)*57.2957795;
    textAngle = (textAngle > 90 || textAngle < -90) ? textAngle + 180 : textAngle;
x} // end of setAngle()
function setDistance() {
    distance = Math.round(getDistanceFromLatLonInM(latitude,longitude,currentCoords.latitude,currentCoords.longitude));
}


function checkDistanceAndOwnDrop() {
    if (distance > 150) {
        buttonCreateOpen.disabled = {
            disable: false,
            id: id
        };
        textDistance.transition()
                    .duration(500)
                    .delay(1000)
                    .attr('fill-opacity',1)
    }
    else if (distance <= 50 && ownDrop === false) {
        buttonCreateOpen.disabled = {
            disable: false,
            id: id
        };
        buttonCreateOpen.open = {
            open: true,
            id: id
        };
    } else if (distance <= 50 && ownDrop === true) {
        buttonCreateOpen.disabled = {
            disable: true,
            id: id
        };
    } else {
        buttonCreateOpen.disabled = {
            disable: false,
            id: id
        };
        buttonCreateOpen.open = {
            open: false,
            id: id
        };
    } // end of if(distance > 150)
}


function _init() {

    setXY();
    setCenterOfLineXY();
    setAngle();
    setDistance();

    // create drop
    drop = groupDrops.append('g')
                         .attr('class','drop')
                         .attr('id',id);
    lineToCenter = drop.append('line')
                       .attr('x1',canvasCenterX)
                       .attr('y1',canvasCenterY)
                       .attr('x2',canvasCenterX)
                       .attr('y2',canvasCenterY) 
                       .attr('stroke',color)
                       .attr('stroke-width',1.5)
    dropCircle = drop.append('circle')
                     .attr('fill',color)
                     .attr('cx',x)
                     .attr('cy',y)
                     .attr('r',0)
    textDistance = drop.append('text')
                       .text(distance+' m')
                       .attr('class','textDistance')
                       .attr('x',centerOfLineX)
                       .attr('y',centerOfLineY)
                       .attr('text-anchor','middle')
                       .attr('fill',color)
                       .attr('transform','rotate('+textAngle+' '+centerOfLineX+','+centerOfLineY+') translate(0 -6)')
                       .attr('fill-opacity',0)
                         
    // animate drop
    lineToCenter.transition()
                .duration(500)
                .ease('linear')
                .attr('x1',x)
                .attr('y1',y);
    dropCircle.transition()
              .duration(500)
              .delay(500)
              .ease('elastic')
              .attr('r',7);

    checkDistanceAndOwnDrop();
                
    setTimeout(function(){
        init = true;
    }, 1500)
    
    intervalUpdateXY = setInterval(updateXY,20);

} // end of init()
_init();

                  
function updateXY() {
if(init === true) {

    setXY();
    setCenterOfLineXY();
    setAngle();
    setDistance();
  
    dropCircle.attr('cx',x)
              .attr('cy',y)
              .attr('r',7); // ???
    lineToCenter.attr('x1',x)
                .attr('y1',y);
    textDistance.text(distance+' m')
    if (distance < 150) {
        textDistance.attr('x',centerOfLineX)
                    .attr('y',centerOfLineY)
                    .attr('transform','rotate('+textAngle+' '+centerOfLineX+','+centerOfLineY+') translate(0 -6)')
                    .attr('fill-opacity',0);
    } else {
        textDistance.attr('x',centerOfLineX)
                    .attr('y',centerOfLineY)
                    .attr('transform','rotate('+textAngle+' '+centerOfLineX+','+centerOfLineY+') translate(0 -6)')
                    .attr('fill-opacity',1);
    }
    
    checkDistanceAndOwnDrop();
                
}
} // end of updateXY()



function removeDrop() {
    clearInterval(intervalUpdateXY);
    buttonCreateOpen.open = {
        open: false,
        id: id
    };
    buttonCreateOpen.disabled = {
        disable: false,
        id: id
    };
    drop.remove();
}



Object.defineProperty(this, 'remove', {
    get: function() {
        removeDrop();
    }
});
Object.defineProperty(this, 'id', {
    get: function() {
        return id;
    }
});


} // end of Drop()
