export default async function calculateBearing(lat1, lon1, lat2, lon2) {
    lat1 = lat1 * Math.PI / 180.0;
    lon1 = lon1 * Math.PI / 180.0;
    lat2 = lat2 * Math.PI / 180.0;
    lon2 = lon2 * Math.PI / 180.0;

    let dLon = lon2 - lon1;

    let y = Math.sin(dLon) * Math.cos(lat2);
    let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let bearing = Math.atan2(y, x);

    bearing = bearing * 180.0 / Math.PI;

    bearing = (bearing + 360.0) % 360.0;

    return bearing;
}