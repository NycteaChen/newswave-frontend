<template>
  <img :src="requireImage(`icon/weather/${currentWeather}.svg`)" />
</template>

<script setup lang="ts">
interface WeatherProps {
  weatherCode: string;
  moment: 'day' | 'night';
}

const currentWeather = ref('');

const props = withDefaults(defineProps<WeatherProps>(), {
  moment: 'day',
  weatherCode: '1'
});

const weatherIcons = ref({
  day: {
    isThunderstorm: 'cloud_sun_rain_light',
    isClear: 'sun',
    isCloudyFog: 'cloud_sun_fog',
    isCloudy: 'cloud_sun',
    isFog: 'sun_fog',
    isPartiallyClearWithRain: 'cloud_sun_rain',
    isSnowing: 'cloud_sun_snow'
  },
  night: {
    isThunderstorm: 'cloud_night_rain_light',
    isClear: 'night',
    isCloudyFog: 'cloud_night_fog',
    isCloudy: 'cloud_night',
    isFog: 'night_fog',
    isPartiallyClearWithRain: 'cloud_night_rain',
    isSnowing: 'cloud_night_snow'
  }
});

const weatherTypes = ref({
  isThunderstorm: ['15', '16', '17', '18', '21', '22', '33', '34', '35', '36', '41'],
  isClear: ['1'],
  isCloudyFog: ['25', '26', '27', '28'],
  isCloudy: ['2', '3', '4', '5', '6', '7'],
  isFog: ['24'],
  isPartiallyClearWithRain: ['8', '9', '10', '11', '12', '13', '14', '19', '20', '29', '30', '31', '32', '38', '39'],
  isSnowing: ['23', '37', '42']
});

const setCurrentWeatherIcon = () => {
  const weatherTypesValue = weatherTypes.value as { [key: string]: string[] };
  const theWeather = Object.keys(weatherTypesValue).find((item) => weatherTypesValue[item].includes(props.weatherCode));
  if (theWeather === undefined) {
    throw new Error(`No weather type found for weather code: ${props.weatherCode}`);
  }
  const weatherIconsValue = weatherIcons.value as { [key: string]: { [key: string]: string } };
  return weatherIconsValue[props.moment][theWeather];
};

watch(
  () => props.weatherCode,
  () => {
    currentWeather.value = setCurrentWeatherIcon();
  },
  { immediate: true }
);
</script>
