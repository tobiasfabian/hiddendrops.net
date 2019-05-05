function buttonCreateOpen() {


var button;
var circle;
var text;
var id = null;
var disabled = false;
var disableId = null;
var clicked = null;


function convertToCreate() {
    button.attr('data-id','')
          .on('click',createDrop);
    circle.transition()
          .duration(400)
          .attr('fill',colorWhite)
          .attr('r',32);
    text.transition()
        .duration(200)
        .attr('fill-opacity',0);
    text.transition()
        .duration(200)
        .delay(210)
        .text(dictionary.create)
        .attr('fill',colorBlue)
        .attr('fill-opacity',1);
} // end of convertToCreate()



function convertToOpen() {
    button.attr('data-id',id)
          .on('click',openDrop);
    circle.transition()
          .duration(400)
          .attr('fill',colorBlue)
          .attr('r',32);
    text.transition()
        .duration(200)
        .attr('fill-opacity',0);
    text.transition()
        .duration(200)
        .delay(200)
        .text(dictionary.open)
        .attr('fill',colorWhite)
        .attr('fill-opacity',1);
} // end of convertToOpen()



function changeDisable() {
    if (disabled === true) {
        circle.transition()
              .duration(500)
              .attr('fill-opacity',.8)
              .attr('stroke',colorGray);
        text.transition()
            .duration(500)
            .attr('fill-opacity',0);
        button.on('click',showDisabledError);
        
    } else {
        circle.transition()
              .duration(500)
              .attr('fill-opacity',1)
              .attr('stroke',colorBlue);
        text.transition()
            .duration(500)
            .attr('fill-opacity',1);
        if(id !== null) {
            button.on('click',openDrop);
        } else {
            button.on('click',createDrop);
        }
    }
} // changeDisable()



function openDrop(){
    if (clicked !== true) {
    
        clicked = true;
        var loadingIndicator = '.';
        loadDropDataFromServer(id);
        var waitForDropData = setInterval(function(){
            text.text(loadingIndicator);
            if(loadingIndicator.length === 3) {
                loadingIndicator = '.';
            }
            else {
                loadingIndicator += '.';
            }
            if (dropData) {
                new DropSection(dropData);
                id = null;
                clicked = null;
                clearInterval(waitForDropData);
                setTimeout(function(){
                    convertToCreate()
                }, 500);
            } // end if(dropData)
        }, 400);
    }
    else {
        console.error('couldn’t open drop.');
    } 
} // end of openDrop()


function createDrop() {
    new CreateSection();
}



function showDisabledError() {
    alert('A Drop you created is too close. Just go for a walk and create another Drop somewhere else.');
}


function init() {

    button = svg.append('g')
                .attr('id','createOpenButton')
                .on('click',createDrop);
    circle = button.append('circle');
    text = button.append('text');
    
    circle.attr('cx',canvasCenterX)
          .attr('cy',canvasCenterY)
          .attr('r',0)
          .attr('fill',colorWhite)
          .attr('fill-opacity',.98)
          .attr('stroke',colorBlue)
          .attr('stroke-width',1.5)
          .attr('fill-opacity',0)
          .transition()
          .duration(1000)
          .ease('elastic')
          .attr('r',32)
          .attr('fill-opacity',1);
              
    text.text(dictionary.create)
        .attr('x',canvasCenterX)
        .attr('y',canvasCenterY+6)
        .attr('fill',colorBlue)
        .attr('fill-opacity',0);
        
    text.transition()
        .duration(300)
        .delay(1100)
        .attr('fill-opacity',1);
    
    button.on('touchstart',function(){
        if(id !== null) {
            circle.transition()
                  .attr('fill','#C9E1FC')
                  .attr('stroke','#C9E1FC');
            text.transition()
                .attr('fill-opacity',.2);
        }
        else if (disabled !== true) {
            circle.transition()
                  .attr('fill',colorWhite)
                  .attr('stroke-opacity',touchstartOpacity);
            text.transition()
                .attr('fill-opacity',.2);
        }
    });
    
    button.on('touchend',function(){
        if(id !== null && disabled !== true) {
            circle.transition()
                  .attr('fill',colorBlue)
                  .attr('stroke',colorBlue)
                  .attr('stroke-opacity',1);
        } else if (disabled !== true) {
            circle.transition()
                  .attr('fill',colorWhite)
                  .attr('stroke',colorBlue)
                  .attr('stroke-opacity',1);
            text.transition()
                .attr('fill-opacity',1);
        }
    });
    
} // end of init()


init();


/* properties */

Object.defineProperty(this, 'open', {
	set: function(data) {
	    if(data.open === true && id === null) {
	        id = data.id;
            convertToOpen();
	    }
	    else if(data.open === false && id === data.id) {
    	    id = null;
    	    convertToCreate();
	    }
    }
});
Object.defineProperty(this, 'disabled', {
	set: function(data) {
	    if(data.disable === true && disableId === null) {
	        disabled = true;
	        disableId = data.id;
            changeDisable();
	    } else if(data.disable === false && disableId === data.id) {
            disabled = false;
    	    disableId = null;
    	    changeDisable();
	    }
    }
});


    
} // end of 