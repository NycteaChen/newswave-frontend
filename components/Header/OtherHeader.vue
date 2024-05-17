<template>
  <header class="other-header w-100 d-flex align-items-center bg-body z-header">
    <section class="header-container container-xxl border-bottom py-2 py-md-0">
      <nav class="d-flex justify-content-between align-items-center gap-3">
        <n-logo target-path="/news" />
        <div class="d-flex align-items-center gap-1 gap-md-3">
          <client-only>
            <nuxt-link
              class="header-icon"
              to="/search"
            >
              <img :src="requireImage('icon/search.svg')" />
            </nuxt-link>
            <template v-if="token">
              <nuxt-link
                class="header-icon"
                to="/member/notification/personal"
              >
                <img :src="requireImage('icon/notice.svg')" />
              </nuxt-link>
              <n-avatar
                class="cursor-pointer"
                @click="navigateTo('/member')"
              />
              <n-button
                text="訂閱"
                class="d-none d-md-block"
                color="purchase"
                :size="isMobile ? 'sm' : 'md'"
                @click="navigateTo('/subscription-plan')"
              />
            </template>
            <template v-if="!token">
              <n-button
                text="註冊"
                color="secondary"
                :size="isMobile ? 'sm' : 'md'"
                @click="
                  navigateTo({
                    path: '/login-register',
                    query: {
                      mode: 'register'
                    }
                  })
                "
              />
              <n-button
                text="登入"
                :size="isMobile ? 'sm' : 'md'"
                @click="navigateTo('/login-register')"
              />
            </template>
          </client-only>
        </div>
      </nav>
    </section>
  </header>
</template>
<script lang="ts" setup>
const token: any = useCookie('token');

const isMobile = inject('isMobile');
</script>
<style lang="scss" scoped>
.header-icon {
  padding: 8px 10px;
  width: 40px;
  height: 40px;
}

@include media-breakpoint-up(md) {
  .header-container {
    border-bottom: 0 !important;
  }
}

@include media-breakpoint-down(md) {
  .other-header {
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>
