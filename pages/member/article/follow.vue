<template>
  <div class="member-follow mx-auto mx-md-0">
    <p class="text-muted fs-sm">
      您可以追蹤有興趣的新聞主題，NewsWave 將通知您最新相關主題文章，讓您掌握第一時間資訊！
    </p>
    <p class="text-muted fs-sm">{{ `目前追蹤主題數：${follows.length}` }}</p>
    <div class="follow-container row row-cols-2 g-2 row-cols-sm-3">
      <div
        v-for="item in categoryTopic"
        :key="item.value"
        class="p-2"
      >
        <button
          type="button"
          class="follow-btn w-100 h-100 rounded-2 is-btn gap-2 d-flex align-items-center justify-content-between"
          :class="{ active: follows.includes(item.name) }"
          :style="{ '--color': item.color }"
          @click="toggleFollowBtn(item.name)"
        >
          <n-spin
            v-if="loadingItem === item.name"
            is-small
            class="mx-auto"
          />
          <template v-else>
            <svg-icon
              class="btn-icon"
              :name="`follow-${item.value}`"
            />
            <span class="fs-6 fw-bold">{{ item.name }}</span>
            <svg-icon
              :name="follows.includes(item.name) ? 'minus' : 'plus'"
              class="btn-icon"
            />
          </template>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  title: '文章管理 - 我的追蹤'
});

const userStore = useUserStore();
const { follows } = storeToRefs(userStore);

const loadingItem = ref<string>('');

const { followNewsTopic, deleteFollowNewsTopic } = useUserApi();

const followNewsTopicHandler = async (topic: string) => {
  const { status, message } = await followNewsTopic(topic);
  if (status) {
    await userStore.getUserData();

    showToast({
      id: `${topic}-follow-success`,
      message: `${message}：${topic}`
    });
  }
};
const deleteFollowNewsTopicHandler = async (topic: string) => {
  const { status, message } = await deleteFollowNewsTopic(topic);
  if (status) {
    await userStore.getUserData();

    showToast({
      id: `${topic}-delete-follow-success`,
      message: `${message}：${topic}`
    });
  }
};

const toggleFollowBtn = async (name: string) => {
  loadingItem.value = name;
  if (follows.value?.includes(name)) {
    await deleteFollowNewsTopicHandler(name);
  } else {
    await followNewsTopicHandler(name);
  }
  loadingItem.value = '';
};
</script>

<style lang="scss" scope>
.member-follow {
  max-width: 540px;
}

.follow-btn {
  padding: 8px;
  border: 1px solid var(--color);
  background-color: var(--color);
  color: $gray-100;

  &.active {
    background: transparent;
    color: var(--color);
  }

  .btn-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    fill: currentcolor;
  }
}
</style>
