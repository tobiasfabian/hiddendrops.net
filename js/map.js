var zoom = 2;
var groupDrops = undefined;



function showLoadingIndicator() {

    var loadingIndicator = svg.append('circle')
                              .attr('cx',canvasCenterX)
                              .attr('cy',canvasCenterY)
                              .attr('stroke-width',1.5)
                              .attr('stroke',colorBlue)
                              .attr('fill',colorWhite)
                              .attr('r',0)
                              .transition()
                              .duration(800)
                              .attr('r',32)
                              .style('opacity',0)
                              .remove();

} // end of showLoadingIndicator()



function createDrops() {

    drops = [];
    
    for (var i = 0; i < dropsData.length; i++) {
        var dropData= dropsData[i];
        drops.push(new Drop(dropData));
    }
    
} // end of createDrops()



function showMap() {

groupDrops = svg.append('g');

// wait for current position    
var i = 0;
var waitForCurrentPosition = setInterval(function(e){
    i++;
    if(typeof(currentMerc) === 'undefined') {
        showLoadingIndicator();
    } else {
        buttonCreateOpen = new buttonCreateOpen();
        loadDropsDataFromServer();
        clearInterval(waitForCurrentPosition);
    }
}, 1000);

// wait for drops
var j = 0;
var waitForDropsData = setInterval(function(e){
    j++;
    if(dropsData.length > 0) {
        createDrops();
        clearInterval(waitForDropsData);
    }
},500);




} // end of showMap




