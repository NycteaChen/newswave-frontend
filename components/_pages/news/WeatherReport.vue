<template>
  <section class="weather-report bg-body-light rounded-2">
    <div class="pt-3 px-4 text-center">
      <h6 class="text-muted mb-2">{{ `${weatherData.month} 月 ${weatherData.day} 日 | ${weatherData.time}` }}</h6>
      <div class="weather-area rounded-pill d-inline-flex py-1 px-3 align-items-center gap-2 text-body-white mb-3">
        <img :src="requireImage('icon/position.svg')" />
        <span class="fw-bold">{{ `${weatherData.country}, ${weatherData.city}` }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div class="weather-status flex-fill">
          <img :src="requireImage('icon/cloud-sun-rain.svg')" />
          <div>{{ weatherData.weatherText }}</div>
        </div>
        <div class="temperature-area flex-fill">
          <div>
            <span class="temperature fw-bold">{{ weatherData.temperature }}</span
            >°C
          </div>
          <div
            v-if="+weatherData.temperature > 30"
            class="high-warning"
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
          class="warning-item d-flex align-items-center gap-2 justify-content-center rounded-2"
        >
          <img :src="requireImage('icon/warning.svg')" />

          <div class="truncate fw-bold">{{ item }}</div>
        </li>
      </ul>
    </div>
    <img :src="requireImage('home/wave-2.svg')" />
  </section>
</template>
<script setup lang="ts">
const weatherData = ref({
  month: '4',
  day: '29',
  time: '下午 6:23',
  country: '臺灣',
  city: '臺北',
  temperature: '35',
  weatherText: '晴時多雲',
  weatherType: 'sunCloud'
});

const warningList = ['花蓮外海4級地震警報', '東北部1級海嘯警報'];
</script>
<style lang="scss" scoped>
.weather-area {
  background: $blue-300;

  img {
    width: 11px;
    height: 24px;
  }
}

.warning-item {
  padding: 2px 10px;
  background: $yellow;
  color: $orange;
  font-size: 14px;

  img {
    width: 16px;
    height: 24px;
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

  .high-warning {
    color: $orange;
    font-size: 14px;
  }
}
</style>
