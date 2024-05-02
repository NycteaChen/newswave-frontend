<template>
  <div>會員中心</div>
  <nav class="d-flex col-md-4 w-100">
    <section
      v-for="item in memberSubNav"
      :key="item.title"
      class="col"
    >
      <h3>{{ item.title }}</h3>
      <ul>
        <li
          v-for="subItem in item.childrenRoute"
          :key="subItem.title"
        >
          <nuxt-link :to="{ name: subItem.routeName }">
            {{ subItem.title }}
          </nuxt-link>
        </li>
      </ul>
    </section>
  </nav>
</template>

<script setup lang="ts">
const { memberSubNav } = useNav();
</script>
