// Funktion zur Erkennung des Browsernamens
function getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    } else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") === -1) {
        return "Chrome";
    } else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
        return "Safari";
    } else if (userAgent.indexOf("Edg") > -1) {
        return "Edge";
    } else if (userAgent.indexOf("Trident") > -1) {
        return "Internet Explorer";
    } else {
        return "Unbekannter Browser";
    }
}

// Beispiel für die Verwendung
console.log(getBrowserName());
