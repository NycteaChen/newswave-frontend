<template>
  <div>會員中心</div>
  <div class="mt-3">
    {{ `會員id: ${id}` }}
  </div>
  <div class="mt-3">
    {{ `會員name: ${name}` }}
  </div>
  <div class="mt-3">
    {{ `會員email: ${email}` }}
  </div>
  <nav class="d-flex col-md-4 w-100 mt-5">
    <section
      v-for="(item, index) in memberSubNav"
      :key="item.label"
      class="col"
    >
      <h3>{{ item.label }}</h3>
      <ul>
        <li
          v-for="subItem in item.childrenRoute"
          :key="subItem.label"
        >
          <nuxt-link
            :to="{ name: subItem.value }"
            @click="nTabsBus.emit({ ...item, children: subItem.value }, index)"
          >
            {{ subItem.label }}
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

const nTabsBus = useEventBus('nTabsBus');
</script>
