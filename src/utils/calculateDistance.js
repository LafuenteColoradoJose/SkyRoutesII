export default function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // radio medio de la Tierra en metros
    const φ1 = lat1 * Math.PI/180; // convertir latitud de grados a radianes
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // en metros
    return distance / 1852; // convertir a millas náuticas
}