# Evidencia 15 Oct — Servicios de Geolocalización y Clima (Sesión 3)

**Nombre:** Fernando Daniel Tolentino Uribe  
**NUA:** 395108  
**Materia:** Aplicaciones de Internet  
**Fecha:** 15 de Octubre de 2026  

---

## 📁 `js/services/location.service.js`

```javascript
export async function getCurrentCoordinates() {
  if (!navigator.geolocation) {
    throw new Error('Tu navegador no soporta geolocalizacion')
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      () => reject(new Error('No fue posible encontrar la ubicacion')),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    )
  })
}

export async function reverseGeocode(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    localityLanguage: 'es',
  })
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`)

  if (!response.ok) {
    throw new Error('No fue posible ubicar tu ciudad')
  }

  const data = await response.json()

  return {
    city: data.city || data.locality || data.principalSubdivision || 'Ubicacion Actual',
    region: data.principalSubdivision || '',
    country: data.countryName || '',
    countryCode: (data.countryCode || 'MX').toUpperCase(),
    latitude,
    longitude,
  }
}

export async function detectLocation() {
  try {
    const coordinates = await getCurrentCoordinates()
    return await reverseGeocode(coordinates.latitude, coordinates.longitude)
  } catch {
    const response = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=es')
    if (!response.ok) {
      throw new Error('No fue posible ubicar tu ciudad')
    }
    const data = await response.json()
    return {
      city: data.city || data.locality || data.principalSubdivision || 'Ubicacion Actual',
      region: data.principalSubdivision || '',
      country: data.countryName || '',
      countryCode: (data.countryCode || 'MX').toUpperCase(),
      latitude: data.latitude,
      longitude: data.longitude,
    }
  }
}
```

---

## 📁 `js/services/weather.service.js`

```javascript
export async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "5",
  })
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!response.ok) {
    throw new Error('No fue posible consultar el clima')
  }
  return response.json()
}

export function weatherDescription(code) {
  return weatherCodes[code] || ["🌡️", "Condicion Actual"]
}
```
