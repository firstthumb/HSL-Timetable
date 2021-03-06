export interface Departure {
  gtfsId: string;
  name: string;
  vehicleMode: string;
  lat: number;
  lon: number;
}

export interface Station {
  name: string;
  lat: number;
  lon: number;
  code: string;
  desc: string;
  timeTables: TimeTable[];
}

export interface TimeTable {
  id: string;
  type: string; // BUS
  shortName: string; // 533
  arrival: number;
  scheduledArrival: number;
  headSign: string; // Matinkylä
  alerts: string[];
}
