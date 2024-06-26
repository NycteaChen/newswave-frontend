<template>
  <div class="row g-4">
    <div class="col-md-5 col-xl-3 order-2">
      <div class="d-flex flex-column justify-content-between bg-light h-100 rounded-2">
        <section class="p-3">
          <div class="avatar-area position-relative">
            <n-loading :loading="uploadLoading">
              <n-avatar
                class="mw-100"
                size="200"
              />
            </n-loading>
            <div class="position-absolute custom-file">
              <input
                id="customFile"
                type="file"
                class="d-none"
                accept=".jpg, .png, .gif"
                @change="handleFileUpload"
              />
              <label
                class="d-inline-block"
                :class="uploadLoading ? 'cursor-not-allowed opacity-50' : 'is-btn'"
                for="customFile"
              >
                <img
                  :src="requireImage('icon/input-camera.svg')"
                  alt="input-camera"
                />
              </label>
            </div>
          </div>
          <h3 class="my-4">{{ `嗨， ${name}` }}</h3>
          <div
            v-for="field in userInfoList"
            :key="field.label"
            class="user-info mb-3 fw-bold p-3 rounded-2"
          >
            <div class="text-muted fs-sm">{{ field.label }}</div>
            <div
              v-if="field.note"
              class="mb-2 mt-2 text-end fw-normal"
            >
              {{ field.note }}
            </div>
            <div class="mt-2 text-end text-break">
              {{ field.value }}
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <nuxt-link
              :to="`/subscription-plan`"
              class="text-decoration-underline text-accent"
              >了解訂閱方案</nuxt-link
            >
          </div>
        </section>
        <img
          :src="requireImage('member/wave-1.svg')"
          alt="wave-1"
          class="pt-2 rounded-bottom-2"
        />
      </div>
    </div>
    <div class="col-md-7 col-xl-5 order-3">
      <div class="d-flex flex-column justify-content-between bg-light rounded-2">
        <div class="p-3 d-flex flex-column gap-3">
          <section
            v-for="(item, index) in memberSubNav"
            :key="item.label"
            class="bg-white d-flex flex-column flex-md-row p-4 gap-2 gap-md-3"
          >
            <div class="px-4 menu-title">
              <h5 class="mb-0">{{ item.label }}</h5>
            </div>
            <div class="menu-body fw-bold flex-fill">
              <ul class="d-flex flex-column gap-md-3">
                <li
                  v-for="subItem in item.childrenRoute"
                  :key="subItem.label"
                  class="rounded-2"
                >
                  <nuxt-link
                    :to="{ name: subItem.value }"
                    class="d-flex align-items-center menu-link ps-4 gap-2"
                    @click="nTabsBus.emit({ ...item, children: subItem.value }, index)"
                  >
                    <img
                      :src="requireImage(`member/${subItem.value?.split('-')?.[2]}.svg`)"
                      :alt="subItem.label"
                      class="menu-link-icon"
                    />
                    <div>{{ subItem.label }}</div>
                    <notice-badge
                      v-if="subItem?.badge === 'notice'"
                      type="number"
                    />
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <img
          :src="requireImage('member/wave-2.svg')"
          alt="wave-2"
          class="pt-2 rounded-bottom-2"
        />
      </div>
    </div>
    <section class="d-flex flex-column gap-3 flex-md-row col-xl-4 order-1 order-xl-4 flex-xl-column">
      <nuxt-link
        v-for="field in numberInfoList"
        :key="field.label"
        :to="`/member/article/${field.value}`"
        class="number d-flex rounded-2 justify-content-between py-3 px-4 text-body-white flex-1 flex-xl-unset"
      >
        <div class="d-flex align-items-center fw-bold">
          <img
            :src="requireImage(field.img ?? '')"
            :alt="field.label"
            class="pe-3 w-auto"
          />
          <div class="number-title">{{ field.label }}</div>
        </div>
        <h2 class="number-text pe-4 mb-0 align-items-center">{{ field.length }}</h2>
      </nuxt-link>
    </section>
  </div>
</template>

<script setup lang="ts">
const { memberSubNav } = useNav();
const userStore = useUserStore();
const { id, name, isVip, subscribeExpiredAt, collects, follows } = storeToRefs(userStore);
const { uploadImage, updateUserInfo } = useUserApi();
const nTabsBus = useEventBus('nTabsBus');

definePageMeta({
  title: '會員中心'
});

await useAsyncData('user-data', () => userStore.getUserData());

interface FieldType {
  label: string;
  value: string;
  note?: string;
  img?: string;
  length?: number;
}

const uploadLoading = ref<boolean>(false);

const userInfoList = computed(() => {
  const list = [
    {
      label: 'ID',
      value: id.value
    },
    {
      label: '會員狀態',
      value: isVip.value ? '訂閱會員' : '免費會員'
    },
    {
      label: '訂閱狀態',
      value: isVip.value ? useDateFormat(subscribeExpiredAt.value, 'YYYY/MM/DD HH:mm:ss').value : '目前無訂閱',
      note: isVip.value ? '訂閱效期至' : ''
    }
  ];
  return list as FieldType[];
});

const numberInfoList = computed(() => {
  const list = [
    {
      label: '我的收藏',
      value: 'collect',
      img: 'icon/number-collects.svg',
      length: collects.value.length
    },
    {
      label: '追蹤主題',
      value: 'follow',
      img: 'icon/number-follows.svg',
      length: follows.value.length
    }
  ];
  return list as FieldType[];
});

const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const maxSizeInMB = 5;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  if (file.size > maxSizeInBytes) {
    showToast({
      id: 'file-too-large',
      message: `文件大小不可超過 ${maxSizeInMB}MB`,
      icon: 'icon/warning.svg'
    });
    return;
  }

  uploadLoading.value = true;

  try {
    const { status, data, message } = await uploadImage(file);
    if (status && data && data?.imgUrl) {
      const { imgUrl } = data;
      await updateUserInfo({ avatar: imgUrl });
      await userStore.getUserData();

      showToast({
        id: 'upload-success',
        message
      });
    } else {
      showToast({
        id: 'upload-fail',
        message,
        icon: 'icon/warning.svg'
      });
    }
  } catch (error: any) {
    showToast({
      id: 'upload-fail',
      message: error.response?.data?.message || '上傳失敗，請重試',
      icon: 'icon/warning.svg'
    });
  }

  uploadLoading.value = false;
};
</script>
<style lang="scss" scoped>
.custom-file {
  bottom: 8px;
  left: 184px;
  width: 40px;
  height: 40px;
}

.avatar-area {
  ::v-deep(.n-loading-container) {
    width: 200px;
    height: 200px;

    &.show {
      min-height: unset;
    }
  }
}

.menu-title {
  padding-top: 12px;
}

.menu-link {
  padding-top: 12px;
  padding-bottom: 12px;

  &-icon {
    width: 16px;
    height: 16px;
  }
}

.user-info {
  background-color: $body-bg;
  font-size: 20px;
}

.number {
  background-color: $blue-300;
}

.number-title {
  font-size: 22px;
}

.number-text {
  font-size: 48px;
  line-height: 72px;
}

::v-deep(.notice-dot) {
  transform: translateY(0);
}

@include media-breakpoint-up(md) {
  .menu-body {
    li {
      transition: background 0.3s ease-in-out;

      &:hover {
        background: $light;
      }
    }
  }
}
</style>
