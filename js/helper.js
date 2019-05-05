function scale(self,scaleFactor) {

    var x = self.getAttribute('x');
    var y = self.getAttribute('y');
    
    var a = scaleFactor;
    var b = 0;
    var c = 0;
    var d = scaleFactor;
    var e = x-scaleFactor*x;
    var f = y-scaleFactor*y;
    
    return 'matrix('+a+','+b+','+c+','+d+','+e+','+f+')';

} // end of scale()



function createUniqueID() {
    return (Math.random()).toString(36).slice(-4) + new Date().getTime();
} // end of createUniqueID



// Mercator
// http://wiki.openstreetmap.org/wiki/Mercator
function getMercX(lon) {
    var r_major = 6378137.000;
    return Math.round(r_major * ( lon * (Math.PI/180.0) ));
}
function getMercY(lat) {
	if (lat > 89.5) {
        lat = 89.5;
    }
    if (lat < -89.5) {
		lat = -89.5;
	}
    var r_major = 6378137.000;
    var r_minor = 6356752.3142;
    var temp = r_minor / r_major;
    var es = 1.0 - (temp * temp);
    var eccent = Math.sqrt(es);
    var phi = lat * (Math.PI/180.0);
    var sinphi = Math.sin(phi);
    var con = eccent * sinphi;
    var com = 0.5 * eccent;
    con = Math.pow((1.0-con)/(1.0+con), com);
    var ts = Math.tan(0.5 * (Math.PI*0.5 - phi))/con;
    var y = 0 - r_major * Math.log(ts);
    return Math.round(y);	
}



// Distance
// http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
function deg2rad(deg) {
	return deg * (Math.PI/180);
}
function getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1); // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c * 1000; // Distance in m
	return d;
}



// http://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
function lineIntersect(x1,y1,x2,y2, x3,y3,x4,y4) {

    var x1 = x1;
    var y1 = y1;
    var x2 = x2;
    var y2 = y2;
    var x3 = x3;
    var y3 = y3;
    var x4 = x4;
    var y4 = y4;
    
    var x = ((x1*y2-y1*x2)*(x3-x4)-(x1-x2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));
    var y = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));

    if (isNaN(x)||isNaN(y)) {
        console.error('lineIntersect: not a number')
        return false;
    } else {
        if (x1>=x2) {
            if (!(x2<=x&&x<=x1)) {return false;}
        } else {
            if (!(x1<=x&&x<=x2)) {return false;}
        }
        if (y1>=y2) {
            if (!(y2<=y&&y<=y1)) {return false;}
        } else {
            if (!(y1<=y&&y<=y2)) {return false;}
        }
        if (x3>=x4) {
            if (!(x4<=x&&x<=x3)) {return false;}
        } else {
            if (!(x3<=x&&x<=x4)) {return false;}
        }
        if (y3>=y4) {
            if (!(y4<=y&&y<=y3)) {return false;}
        } else {
            if (!(y3<=y&&y<=y4)) {return false;}
        }
    }
    var numerator = (((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3)));
    var denominator = (((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1)));
    var u1 = numerator / denominator;
    
    return {
        x: x1 + u1 * (x2 - x1),
        y: y1 + u1 * (y2 - y1)
    };

}


/* Phillips Variante */
function lineIntersectPhillip(xa1,ya1,xa2,ya2, xb1,yb1,xb2,yb2) {

    var ma = (ya2-ya1) / (xa2-xa1);
    var mb = (yb2-yb1) / (xb2-xb1);
    
    var na = ya1 - ( ma * xa1 );
    var nb = yb1 - ( mb * xb1 );
    
    var x = (nb - na) / (ma - mb);
    var y = (ma * x) + na;
        
    return {
        x: x,
        y: y
    };
}




function touchstart() {
    this.style.opacity = .2;
}
function touchend() {
    this.style.opacity = 1;
}
