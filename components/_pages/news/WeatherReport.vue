<template>
  <section class="weather-report bg-body-light rounded-2">
    <div class="pt-3 px-4 text-center">
      <h6 class="text-muted mb-2">{{ dateTimeFormat }}</h6>
      <div class="weather-area rounded-pill d-inline-flex py-1 px-3 align-items-center gap-2 text-body-white mb-3">
        <svg-icon
          name="location"
          class="fill-body-white location-icon"
        />
        <span class="fw-bold">{{ `臺灣, ${countryName}` }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div class="weather-status flex-1 pe-2">
          <template v-if="currentWeather.weatherCode && currentWeather.description">
            <weather-icon
              :weather-code="currentWeather.weatherCode"
              :moment="getMoment"
            />
            <div>{{ currentWeather.description }}</div>
          </template>
          <span v-else> - </span>
        </div>
        <div class="temperature-area flex-1">
          <div>
            <span class="temperature fw-bold">{{ currentWeather.temperature || '-' }}</span
            >°C
          </div>
          <div
            v-if="+currentWeather.temperature > 30"
            class="fs-sm text-danger"
          >
            高溫警報
          </div>
        </div>
      </div>
      <ul
        v-show="warningList.length"
        class="d-flex flex-column gap-2 mt-4"
      >
        <li
          v-for="(item, index) in warningList"
          :key="index"
          class="warning-item text-danger fs-sm d-flex align-items-center gap-2 justify-content-center rounded-2"
        >
          <svg-icon
            name="warning"
            class="warning-item-icon"
          />
          <div class="truncate fw-bold">{{ item }}</div>
        </li>
      </ul>
    </div>
    <img :src="requireImage('home/wave-2.svg')" />
  </section>
</template>
<script setup lang="ts">
import X2js from 'x2js';

const config = useRuntimeConfig();
const sunriseAndSunsetData = ref([]);
const now = ref(new Date());
const countryName = ref('臺北市');

const currentWeather = ref({
  description: '', // 天氣描述
  weatherCode: '', // 天氣代碼
  rainPossibility: '0', // 降雨機率
  comfort: '0', // 舒適度
  temperature: '' // 溫度
});

const dateTimeFormat = computed(() => {
  const date = new Date(now.value);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? '下午' : '上午';
  const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${ampm} ${hours}:${strMinutes}`;
  return `${date.getMonth() + 1}月${date.getDate()}日 | ${strTime}`;
});

const getMomentHandler = async () => {
  const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${config.public.weatherKey}`;
  const res = await fetch(url);
  const data = await res.json();
  sunriseAndSunsetData.value = data?.records?.locations?.location || [];
};

const getMoment = computed(() => {
  const location: any = sunriseAndSunsetData.value?.find((data: any) => data?.CountyName === countryName.value) || {};

  const nowDate = Intl.DateTimeFormat('zh-TW', {
    month: '2-digit',
    day: '2-digit'
  })
    .format(new Date())
    .replace(/\//g, '-');

  const todayData = location?.time?.find((data: any) => data.Date.includes(nowDate));
  const sunriseTimestamp = new Date(`${todayData?.Date} ${todayData?.SunRiseTime}`).getTime(); // 日出時間
  const sunsetTimestamp = new Date(`${todayData?.Date} ${todayData?.SunSetTime}`).getTime(); // 日落時間
  const nowTimeStamp = new Date().getTime();
  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp ? 'day' : 'night';
});

const fetchWeatherData = async () => {
  const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${config.public.weatherKey}&locationName=${countryName.value}`;
  const res = await fetch(url);
  const data = await res.json();
  const locationData = data.records.location[0];
  const weatherElements: { [key: string]: any } = {};
  locationData.weatherElement.forEach((item: any) => {
    if (['Wx', 'PoP', 'CI', 'MinT'].includes(item.elementName)) {
      weatherElements[item.elementName] = item.time[0].parameter;
    }
  });

  currentWeather.value = {
    description: weatherElements.Wx.parameterName,
    weatherCode: weatherElements.Wx.parameterValue,
    rainPossibility: weatherElements.PoP.parameterName,
    comfort: weatherElements.CI.parameterName,
    temperature: weatherElements.MinT.parameterName
  };
};

const getPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        const api = `https://api.nlsc.gov.tw/other/TownVillagePointQuery1/${coords[1]}/${coords[0]}`;
        const res = await fetch(api);
        const data = await res.text();
        const document = new X2js().xml2js(data) as any;
        countryName.value = document.townVillageItem.ctyName;
        fetchWeatherData();
      },
      (error) => {
        console.log('無法取得位置資訊:', error.message);
        fetchWeatherData();
      }
    );
  } else {
    console.log('Geolocation 無法使用');
    fetchWeatherData();
  }
};

let intervalTime: NodeJS.Timeout;
onMounted(() => {
  intervalTime = setInterval(() => {
    now.value = new Date();
  }, 1000);
  getMomentHandler();
  getPosition();
});
onUnmounted(() => {
  clearInterval(intervalTime);
});

const warningList = ['花蓮外海4級地震警報', '東北部1級海嘯警報'];
</script>
<style lang="scss" scoped>
.weather-area {
  background: $blue-300;

  .location-icon {
    width: 11px;
    height: 24px;
  }
}

.warning-item {
  padding: 2px 10px;
  background: $yellow;

  &-icon {
    width: 16px;
    height: 24px;
    fill: currentcolor;
  }
}

.weather-status {
  border-right: 1px solid #fff;
  color: $blue-300;

  img {
    width: 60px;
    height: 72px;
  }
}

.temperature-area {
  color: $blue-300;

  .temperature {
    font-size: 48px;
  }
}
</style>
