var dictionary_en = {
    title: 'Hidden Drops',
    subtitle: 'The countermovement to the',
    subtitle2: 'ubiquitous information network.',
    create: 'create',
    createStartDescription: 'Somewhere. Sometime.',
    open: 'open',
    openStartDescription: 'Be the first.',
    openStartDescription2: 'After you’ve opened a Drop, it will disappear…',
    reply: 'reply',
    replyStartDescription: 'Keep the the Drop alive.',
    replyStartDescription2: '…unless you reply.',
    startscreenButton: 'Okay, got it.', 
    dismiss: 'Dismiss', 
    dropDrop: 'Drop Drop',
    editName: 'Edit Name',
    addPhoto: 'Add Photo' 
} // end of dictionary_en
var dropsData = [];
var modelError = [];
var dropData;
var uniqueID;
var deviceOrientationCompassHeading = 360;
var standalone = window.navigator.standalone;


function initModel() {


window.addEventListener('deviceorientation',function(e){
	deviceOrientationCompassHeading = Math.round( (e.webkitCompassHeading !== undefined) ? e.webkitCompassHeading : 360 )
}); // device orientation


navigator.geolocation.getCurrentPosition(function(e){
	currentCoords = e.coords;
	currentMerc = {
    	mercX: getMercX(currentCoords.longitude),
    	mercY: getMercY(currentCoords.latitude)
	};
	setTimeout(function(){ // wait for animation end of createOpenButton
    	watchGeolocationPosition();
	}, 2000)
}, function(e){
    if (e.code === e.PERMISSION_DENIED) {
        modelError.push('geolocation permission denied');
    }
    if (e.code === e.POSITION_UNAVAILABLE) {
        modelError.push('geolocation position unavailable');
    }
    console.warn(e.code,': ',e.message);
}); // end of geolocation get current position



function watchGeolocationPosition() {
    navigator.geolocation.watchPosition(function(e){
    	console.log(e.coords.accuracy);
    	currentCoords = e.coords;
    	currentMerc = {
        	mercX: getMercX(currentCoords.longitude),
        	mercY: getMercY(currentCoords.latitude)
    	};
    }, function(e){
        if (e.code === e.PERMISSION_DENIED) {
            modelError.push('geolocation permission denied');
        }
        if (e.code === e.POSITION_UNAVAILABLE) {
            modelError.push('geolocation position unavailable');
        }
        console.warn(e.code,': ',e.message);
    }); // end of geolocation watch position
} // end of watchGeolocationPosition()


} // end of initModel()



if(localStorage.getItem('uniqueID') === null) {
    uniqueID = createUniqueID();
    localStorage.setItem('uniqueID',uniqueID);
    var visits = 0;
    localStorage.setItem('visits',visits);
    console.log('your first visit: '+uniqueID);
}
else {
    uniqueID = localStorage.getItem('uniqueID');
    var visits = parseFloat(localStorage.getItem('visits'))+1;
    localStorage.setItem('visits',visits);
    console.log('welcome back: '+uniqueID+' visits:'+visits);
} // end of if(localStorage.getItem('uniqueID'))



function loadDropsDataFromServer() {
    var url = 'api/drops/';
    var request = new XMLHttpRequest();
    request.open('GET',url,true);
    request.addEventListener('readystatechange',function(){
        if(request.readyState === XMLHttpRequest.DONE) {
            var responseData = JSON.parse(request.responseText);
            if(typeof(responseData.error) === 'undefined') {
                for (var i = 0; i < responseData.length; i++) {
                    dropsData.push(responseData[i]);
                }
            } else {
                console.error(JSON.stringify(responseData));
            } // end of if()
        }
    });
    request.send();
} // end of loadDropDataFromServer()



function loadDropDataFromServer(id) {
    var url = 'api/drops/'+id+'/';
    var request = new XMLHttpRequest();
    request.open('GET',url,true);
    request.addEventListener('readystatechange',function(){
        if(request.readyState === XMLHttpRequest.DONE) {
            var responseData = JSON.parse(request.responseText);
            if(typeof(responseData.error) === 'undefined') {
                dropData = responseData;
            } else {
                console.error(JSON.stringify(responseData));
            } // end of if()
        }
    });
    request.send();
} // end of loadDropDataFromServer()



function postDropDataToServer(text,author,date) {

    var author = author;
    var text = text;

    var dataToSend = {
        text: text,
        author: {
            name: author,
            id: uniqueID
        },
        date: new Date(),
        coords: {
            longitude: currentCoords.longitude,
            latitude: currentCoords.latitude            
        }
    };
    var stringToSend = JSON.stringify(dataToSend);
    
    var dropData = {
        id: undefined,
        author: uniqueID,
        coords: {
            longitude: currentCoords.longitude,
            latitude: currentCoords.latitude            
        }
    };
    
    console.log(stringToSend);
    
    var url = 'api/drop/';
    var request = new XMLHttpRequest();
    request.open('POST',url,true);
    request.setRequestHeader("Content-type", "application/json");
    request.addEventListener('readystatechange',function(){
        if(request.readyState === XMLHttpRequest.DONE) {
            try {
                var responseData = JSON.parse(request.responseText);
                if(responseData.ok === true) {
                    postDropDataSuccess = true;
                    dropData.id = responseData.id;
                    drops.push(new Drop(dropData));
                } else {
                    postDropDataSuccess = false;
                    console.error(request.responseText);
                } // end of if()
            } catch(e) {
                console.error(e);
            }
        }
    });
    request.send(stringToSend);

} // end of postDropDataToServer()
