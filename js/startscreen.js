
// positions
var posCreate = {};
posCreate.x = '34%';
posCreate.y = '38%';
var posOpen = {};
posOpen.x = '13%';
posOpen.y = '55%';
var posReply = {};
posReply.x = '28%';
posReply.y = '78%';



// create elements

var title = null;
var titleLine = null;
var subtitle = null;
var lineFromCreateToOpen = null;
var circleCreate = null;
var textCreate = null;
var lineFromOpenToReply = null;
var circleOpen = null;
var textOpen = null;
var circleReply = null;
var textReply = null;
var buttonGo = null;


function showStartscreen() {

title = svg.append('text')
           .text(dictionary.title)
           .attr('x',canvasCenterX)
           .attr('y',50)
           .attr('text-anchor','middle')
           .style('font-size','37.5')
           .style('opacity',0)
               
titleLine = svg.append('line') 
               .attr('x1',canvasCenterX)
               .attr('y1',70)
               .attr('x2',canvasCenterX)
               .attr('y2',70) 
               .attr('stroke',colorBlack)
               .attr('stroke-width',1.5);
                   
subtitle = svg.append('text')
              .attr('text-anchor','middle')
              .attr('x',canvasCenterX)
              .attr('y',80)
              .style('font-size',13.5)
              .style('font-style','italic')
              .style('font-weight',500);

lineFromCreateToOpen = svg.append('line')
                          .attr('stroke',colorBlue)
                          .attr('stroke-width',1.5)
                          .attr('x1',posCreate.x)
                          .attr('y1',posCreate.y)
                          .attr('x2',posCreate.x)
                          .attr('y2',posCreate.y)

circleCreate = svg.append('circle')
                  .attr('stroke',colorBlue)
                  .attr('stroke-width',1.5)
                  .attr('fill',colorWhite)
                  .attr('cx',posCreate.x)
                  .attr('cy',posCreate.y)
                  .attr('r',0)

textCreate = svg.append('text')
                .text(dictionary.create)
                .attr('x',posCreate.x)
                .attr('y',posCreate.y)
                .attr('transform','translate(0,4)')
                .attr('text-anchor','middle')
                .style('fill',colorBlue)
                .style('font-size',11)
                .style('font-weight',500)
                .style('text-transform','uppercase')
                .style('opacity','0')

lineFromOpenToReply = svg.append('line')
                         .attr('x1',posOpen.x)
                         .attr('y1',posOpen.y)
                         .attr('x2',posOpen.x)
                         .attr('y2',posOpen.y)
                         .attr('stroke',colorBlue)
                         .attr('stroke-width',1.5)

circleOpen = svg.append('circle')
                .attr('fill',colorBlue)
                .attr('cx',posOpen.x)
                .attr('cy',posOpen.y)
                .attr('r',0)

textOpen = svg.append('text')
              .text(dictionary.open)
              .attr('x',posOpen.x)
              .attr('y',posOpen.y)
              .attr('transform','translate(0,4)')
              .attr('text-anchor','middle')
              .style('fill',colorWhite)
              .style('font-size',11)
              .style('font-weight',500)
              .style('text-transform','uppercase')
              .style('opacity','0')


circleReply = svg.append('circle')
                 .attr('stroke',colorBlue)
                 .attr('stroke-width',1.5)
                 .attr('fill',colorWhite)
                 .attr('cx',posReply.x)
                 .attr('cy',posReply.y)
                 .attr('r',0)

textReply = svg.append('text')
               .text(dictionary.reply)
               .attr('x',posReply.x)
               .attr('y',posReply.y)
               .attr('transform','translate(0,4)')
               .attr('text-anchor','middle')
               .style('fill',colorBlue)
               .style('font-size',11)
               .style('font-weight',500)
               .style('text-transform','uppercase')
               .style('opacity','0')
                   
buttonGo = svg.append('g')
              .style('opacity',0)
buttonGo.append('rect')
        .attr('x',8)
        .attr('y',canvasHeight-8-44)
        .attr('width',canvasWidth-16)
        .attr('height',44)
        .attr('rx',4)
        .attr('ry',4)
        .attr('fill',colorBlue)
buttonGo.append('text')
        .text(dictionary.startscreenButton)
        .attr('fill',colorWhite)
        .attr('x',canvasCenterX)
        .attr('y',canvasHeight-23)
        .attr('text-anchor','middle')
        .style('font-size',21)
buttonGo.on('touchstart',function(){ d3.select(this).style('opacity',.2) })
        .on('touchend',function(){ d3.select(this).style('opacity',1) })
        .on('touchmove',function(){ d3.select(this).style('opacity',1) })
        .on('click',function(){ hideStartscreen(); d3.select(this).style('opacity',.2); })


var delay = 0;

// !title
title.transition()
     .duration(500)
     .delay(delay)
     .style('opacity','1');
   
delay += 600;
titleLine.transition()
         .duration(500)
         .delay(delay)
         .attr('x1',canvasCenterX-30)
         .attr('x2',canvasCenterX+30);
   
delay += 500;
subtitle.append('tspan')
        .text(dictionary.subtitle)
        .attr('dy',20)
        .attr('x',canvasCenterX)
        .style('opacity',0)
        .transition()
        .duration(1000)
        .delay(delay)
        .style('opacity',1);
delay += 100;
subtitle.append('tspan')
        .text(dictionary.subtitle2)
        .attr('dy',20)
        .attr('x',canvasCenterX)
        .style('opacity',0)
        .transition()
        .duration(1000)
        .delay(delay)
        .style('opacity',1);
    
// !create
delay += 800;
circleCreate.transition()
            .ease('elastic')
            .duration(1000)
            .delay(delay)
            .attr('r',24);

delay += 300;
textCreate.transition()
          .duration(500)
          .delay(delay)
          .style('opacity','1');

delay += 200;
lineFromCreateToOpen.transition()
                    .ease('linear')
                    .duration(500)
                    .delay(delay)
                    .attr('x2',posOpen.x)
                    .attr('y2',posOpen.y)

// !open
delay += 500;
circleOpen.transition()
          .ease('elastic')
          .duration(1000)
          .delay(delay)
          .attr('r',24);

delay += 300;
textOpen.transition()
        .duration(500)
        .delay(delay)
        .style('opacity','1');

delay += 200;
lineFromOpenToReply.transition()
                   .duration(800)
                   .delay(delay)
                   .attr('x2',posReply.x)
                   .attr('y2',posReply.y)

// !reply

delay += 500;
circleReply.transition()
           .ease('elastic')
           .duration(1000)
           .delay(delay)
           .attr('r',24);

delay += 300;
textReply.transition()
         .duration(500)
         .delay(delay)
         .style('opacity','1');

// !buttonGo

delay += 400;
buttonGo.transition()
        .duration(500)
        .delay(delay)
        .style('opacity','1');

} // end of loadStartscreen()



function hideStartscreen() {
    
title.transition()
     .duration(600)
     .style('opacity',0)
     .remove()
titleLine.transition()
         .duration(600)
         .attr('x1',canvasCenterX)
         .attr('x2',canvasCenterX)
         .remove()
subtitle.transition()
        .duration(600)
        .style('opacity',0)
        .remove()
textCreate.transition()
          .duration(400)
          .style('opacity',0)
          .remove()
circleCreate.transition()
            .duration(400)
            .delay(200)
            .attr('r',0)
            .remove()
lineFromCreateToOpen.transition()
                    .duration(600)
                    .style('opacity',0)
                    .remove()        
textOpen.transition()
        .duration(400)
        .style('opacity',0)
circleOpen.transition()
          .duration(400)
          .delay(200)
          .attr('r',0)
          .remove()
lineFromOpenToReply.transition()
                   .duration(600)
                   .style('opacity',0)
                   .remove()   
textReply.transition()
         .duration(400)
         .style('opacity',0)
circleReply.transition()
           .duration(400)
           .delay(200)
           .attr('r',0)
           .remove()
buttonGo.transition()
        .duration(600)
        .style('opacity',0)
        
setTimeout(function(){
    showMap()
}, 400);

}
