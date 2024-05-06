<template>
  <div>會員中心</div>
  <!-- <client-only> -->
  <div class="mt-3">
    {{ `會員id: ${id}` }}
  </div>
  <div class="mt-3">
    {{ `會員name: ${name}` }}
  </div>
  <div class="mt-3">
    {{ `會員email: ${email}` }}
  </div>
  <!-- </client-only> -->
  <nav class="d-flex col-md-4 w-100 mt-5">
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
const userStore = useUserStore();
const { id, name, email } = storeToRefs(userStore);
</script>
