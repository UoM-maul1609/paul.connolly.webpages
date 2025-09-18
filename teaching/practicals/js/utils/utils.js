// JavaScript Document

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function isInternetExplorer() {
	var browser = getBrowser();
	return browser == "msie" || browser == "Trident";
}

function getBrowser()
 {
     var N=navigator.appName, ua=navigator.userAgent, tem;
     var M=ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*(\.?\d+(\.\d+)*)/i);

     if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
     M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

     return M[0];
 }
 //Optional to get browser version, not needed in this case
 function getBrowserVersion()
 {
     var N=navigator.appName, ua=navigator.userAgent, tem;
     var M=ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*(\.?\d+(\.\d+)*)/i);

     if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
     M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

     return M[1];
 }