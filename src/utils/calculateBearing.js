export default async function calculateBearing(lat1, lon1, lat2, lon2) {
    // Convertir de grados a radianes
    lat1 = lat1 * Math.PI / 180.0;
    lon1 = lon1 * Math.PI / 180.0;
    lat2 = lat2 * Math.PI / 180.0;
    lon2 = lon2 * Math.PI / 180.0;

    // Calcular diferencia de longitud
    let dLon = lon2 - lon1;

    // Calcular rumbo
    let y = Math.sin(dLon) * Math.cos(lat2);
    let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let bearing = Math.atan2(y, x);

    // Convertir de radianes a grados
    bearing = bearing * 180.0 / Math.PI;

    // Normalizar a un valor entre 0 y 360
    bearing = (bearing + 360.0) % 360.0;

    return bearing;
}