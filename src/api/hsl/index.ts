import { Departure, Station } from './types';

export * from './types';

const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

interface Stop {
  name: string;
  lat: number;
  lon: number;
  gtfsId: string;
  code: string;
  desc: string;
  stoptimesWithoutPatterns: StopTimesWithoutPattern[];
}

interface StopTimesWithoutPattern {
  realtimeArrival: number;
  scheduledArrival: number;
  headsign: string;
  trip: Trip;
}

interface Trip {
  gtfsId: string;
  route: Route;
}

interface Route {
  shortName: string;
  mode: string;
  alerts: Alert[];
}

interface Alert {
  alertSeverityLevel: string;
  alertDescriptionTextTranslations: AlertTranslation[];
}

interface AlertTranslation {
  text: string;
  language: string;
}

const getStopQuery = (minLat: number, minLon: number, maxLat: number, maxLon: number): string => {
  return `{
    stopsByBbox(minLat: ${minLat}, minLon: ${minLon}, maxLat: ${maxLat}, maxLon: ${maxLon}) {
      name
      desc
      vehicleMode
      gtfsId
      lat
      lon
    }
  }
  `;
};

const getTimeTableQuery = (id: string): string => {
  return `{
    stop(id: "${id}") {
      id
      name
      lat
      lon
      gtfsId
      code
      platformCode
      desc
      stoptimesWithoutPatterns(numberOfDepartures: 10, omitNonPickups: true) {
        trip {
          gtfsId
          route {
            shortName
            mode
            alerts {
              alertDescriptionTextTranslations {
                text
                language
              }
              alertSeverityLevel
              alertEffect
              alertCause
            }
          }
        }
        realtimeArrival
        realtimeDeparture
        realtime
        scheduledArrival
        scheduledDeparture
        headsign
        serviceDay
      }
    }
  }
  `;
};

export const getTimeTable = async (id: string): Promise<Station> => {
  const data = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: getTimeTableQuery(id),
  });
  const jsonData = await data.json();
  if ('errors' in jsonData) {
    throw new Error('Error:\n' + JSON.stringify(jsonData.errors, null, 2));
  }

  const response = jsonData.data.stop as Stop;

  const result: Station = {
    name: response.name,
    lat: response.lat,
    lon: response.lon,
    code: response.code,
    desc: response.desc,
    timeTables:
      response.stoptimesWithoutPatterns &&
      response.stoptimesWithoutPatterns.map((item) => ({
        id: item.trip.gtfsId,
        type: item.trip.route.mode,
        shortName: item.trip.route.shortName,
        arrival: item.realtimeArrival,
        scheduledArrival: item.scheduledArrival,
        headSign: item.headsign,
        alerts:
          item.trip.route.alerts &&
          item.trip.route.alerts
            .map((alert) =>
              alert.alertDescriptionTextTranslations
                .filter((alertText) => alertText.language === 'en')
                .map((alertText) => alertText.text),
            )
            .flat(),
      })),
  };

  return result;
};

export const getDepartures = async (
  minLat: number,
  minLon: number,
  maxLat: number,
  maxLon: number,
): Promise<Departure[]> => {
  const data = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: getStopQuery(minLat, minLon, maxLat, maxLon),
  });
  const jsonData = await data.json();
  if ('errors' in jsonData) {
    throw new Error('Error:\n' + JSON.stringify(jsonData.errors, null, 2));
  }

  const response = jsonData.data.stopsByBbox as Departure[];

  return response;
};
