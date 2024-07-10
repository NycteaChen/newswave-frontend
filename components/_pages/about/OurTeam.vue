<template>
  <ul class="our-team row row-cols-1 g-3 row-cols-lg-2 g-xl-4 row-cols-xxl-3 g-xxl-5 mt-0">
    <li
      v-for="(member, index) in teamMemberList"
      :key="member.name"
    >
      <n-transition
        class="card h-100 bg-primary"
        :delay="isMobile ? 0 : (index * 1) / 10"
      >
        <div class="card-header border-0 p-0 position-relative">
          <n-avatar
            class="mx-auto"
            :img-src="
              member.avatar ? requireImage(`about/team/${member.avatar}.jpg`) : requireImage('icon/user-photo.svg')
            "
            shape="circle"
            type="other"
            size="160"
          />
          <div class="header-deco d-flex align-items-center gap-2 position-absolute">
            <div class="pill rounded-pill bg-body-light" />
            <div class="circle circle-small bg-body-light rounded-circle" />
            <div class="circle bg-body-light rounded-circle" />
          </div>
        </div>
        <div
          class="card-body bg-body flex-1 d-flex flex-column gap-3 justify-content-center align-items-center py-5 px-4"
        >
          <h4 class="mb-0 text-primary d-flex gap-2 align-items-center">
            <span>{{ member.name }}</span>
            <nuxt-link
              v-if="member.github"
              class="is-btn"
              :to="member.github"
              target="_blank"
            >
              <svg-icon
                name="link-github"
                class="github-icon fill-body"
              />
            </nuxt-link>
          </h4>
          <h5 class="mb-0">{{ member.role }}</h5>
          <img
            class="divider"
            :src="requireImage('about/divider.svg')"
          />
          <ul class="ps-3 flex-1 member-desc d-flex flex-column gap-2 text-muted">
            <li
              v-for="(item, idx) in member.desc"
              :key="`${member.name}-desc-${idx}`"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </n-transition>
    </li>
  </ul>
</template>
<script lang="ts" setup>
const isMobile = inject('isMobile');
</script>
<style lang="scss" scoped>
.card {
  box-shadow: 0 2px 2px 0 rgba($dark, 0.122);

  .card-header {
    ::v-deep(.n-avatar) {
      transform: translateY(36px);
    }

    .header-deco {
      top: 12px;
      right: 16px;

      .pill {
        width: 32px;
        height: 16px;
      }

      .circle {
        width: 20px;
        height: 20px;

        &-small {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .card-body {
    border-radius: 5rem 5rem $border-radius $border-radius;
  }
}

.github-icon,
.divider {
  width: 24px;
  height: 24px;
}

.member-desc {
  li {
    list-style-type: disc;
  }
}
</style>
