
interface GeoPoint {
  lat: number;
  lng: number;
}

// Fonction pour convertir une adresse en coordonnées géographiques
export const geocodeAddress = async (address: string): Promise<GeoPoint | null> => {
  try {
    // Utiliser l'API Nominatim d'OpenStreetMap (gratuite et sans clé API)
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error("Erreur lors du géocodage de l'adresse:", error);
    return null;
  }
};

// Fonction pour calculer la distance entre deux points en kilomètres (formule de Haversine)
export const calculateDistanceBetweenPoints = (point1: GeoPoint, point2: GeoPoint): number => {
  const R = 6371; // Rayon de la Terre en km
  
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance en km
  
  return distance;
};

// Fonction principale qui calcule la distance entre le dépôt et l'adresse client
export const calculateDistance = async (
  depotLocation: GeoPoint, 
  clientAddress: string
): Promise<number | null> => {
  try {
    // Géocoder l'adresse du client
    const clientLocation = await geocodeAddress(clientAddress);
    
    if (!clientLocation) {
      throw new Error("Impossible de géocoder l'adresse du client");
    }
    
    // Calculer la distance entre le dépôt et le client
    const distance = calculateDistanceBetweenPoints(depotLocation, clientLocation);
    
    return distance;
  } catch (error) {
    console.error("Erreur lors du calcul de la distance:", error);
    return null;
  }
};
