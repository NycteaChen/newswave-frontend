<template>
  <ul class="our-team row row-cols-1 g-3 row-cols-sm-2 row-cols-lg-3 g-md-5 justify-content-sm-center mt-0">
    <li
      v-for="member in memberList"
      :key="member.name"
      class="d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      <n-avatar
        :img-src="member.avatar || requireImage('icon/user-photo.svg')"
        shape="circle"
        type="other"
        size="120"
      />
      <h5 class="mb-0">
        {{ member.name }}
      </h5>
      <div>{{ member.role }}</div>
      <p class="mb-0 flex-1">
        {{
          member.desc ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis error, atque adipisci sed pariatur tempore tempora asperiores molestias doloremque mollitia laboriosam repellendus quam incidunt officiis consequatur. Ipsa porro soluta similique.'
        }}
      </p>
      <nuxt-link
        class="link"
        :to="member.github"
        :class="member.github ? 'is-btn' : 'invisible'"
        target="_blank"
      >
        <img :src="requireImage(`about/github.svg`)" />
      </nuxt-link>
    </li>
  </ul>
</template>
<script lang="ts" setup>
const memberList = computed(() => [
  {
    name: '開發人員1',
    avatar: '',
    role: '前端工程師',
    desc: '測試描述描述，試描述描述試描述描述試描述描述，試描述描述試描述描述，試描述描述試描述描述試描述描述試描述描述，試描述。',
    github: 'https://github.com/'
  },
  {
    name: '開發人員2',
    avatar: '',
    role: '前端工程師',
    desc: ''
  },
  {
    name: '開發人員3',
    avatar: '',
    role: '後端工程師',
    desc: ''
  },
  {
    name: '開發人員4',
    avatar: '',
    role: '後端工程師',
    desc: ''
  },
  {
    name: '開發人員5',
    avatar: '',
    role: '後端工程師',
    desc: ''
  }
]);
</script>
<style lang="scss" scoped>
.link {
  width: 24px;
  height: 24px;
}
</style>
