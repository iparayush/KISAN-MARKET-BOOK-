/**
 * Recommendation Service for KisanProcure
 * Calculates intelligent 4-factor score and human-explainable rationale.
 */

// Haversine distance in kilometers
const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

/**
 * Computes recommendation score and human-readable explanation
 * Formula:
 * score = distance * 0.30 + queueScore * 0.30 + capacityScore * 0.20 + workloadScore * 0.20
 */
const scoreCentre = (centre, farmerLat, farmerLon) => {
  const centreCoords = centre.location && centre.location.coordinates
    ? centre.location.coordinates
    : [74.0, 20.0];
  const centreLon = centreCoords[0];
  const centreLat = centreCoords[1];

  const distance = calculateDistanceKm(farmerLat, farmerLon, centreLat, centreLon);
  const queueScore = centre.currentQueue || 0;

  const capacityScore =
    centre.dailyCapacity && centre.dailyCapacity > 0
      ? ((centre.currentQueue || 0) / centre.dailyCapacity) * 100
      : 50;

  const workloadScore =
    centre.processingRate && centre.processingRate > 0
      ? (centre.currentQueue || 0) / centre.processingRate
      : (centre.currentQueue || 0);

  const compositeScore =
    distance * 0.3 +
    queueScore * 0.3 +
    capacityScore * 0.2 +
    workloadScore * 0.2;

  // Generate explainable reason
  let reason = 'Balanced travel distance and steady processing speed.';
  if (queueScore <= 5 && capacityScore < 30) {
    reason = 'Minimal queue length (< 5 farmers) with open slot capacity.';
  } else if (distance <= 5) {
    reason = 'Nearest procurement centre to your village with active counters.';
  } else if (workloadScore < 2) {
    reason = 'High counter efficiency with fast turnaround rate.';
  }

  return {
    centreId: centre._id || centre.id,
    name: centre.name,
    district: centre.district,
    distanceKm: distance,
    currentQueue: queueScore,
    activeCounters: centre.activeCounters || 1,
    dailyCapacity: centre.dailyCapacity || 500,
    status: centre.status || 'ACTIVE',
    score: Math.round(compositeScore * 100) / 100,
    recommendationReason: reason,
  };
};

const rankCentres = (centres, farmerLat = 19.9975, farmerLon = 73.7898) => {
  const scored = centres.map((c) => scoreCentre(c, farmerLat, farmerLon));
  scored.sort((a, b) => a.score - b.score);
  return scored;
};

module.exports = {
  calculateDistanceKm,
  scoreCentre,
  rankCentres,
};
