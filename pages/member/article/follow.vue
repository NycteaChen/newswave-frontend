<template>
  <div class="member-follow mx-auto mx-md-0">
    <p class="text-muted fs-sm">
      您可以追蹤有興趣的新聞主題，NewsWave 將通知您最新相關主題文章，讓您掌握第一時間資訊！
    </p>
    <p class="text-muted fs-sm">{{ `目前追蹤主題數：${follows.length}` }}</p>
    <div class="follow-container row row-cols-2 g-2 row-cols-sm-3">
      <div
        v-for="item in topicList"
        :key="item.value"
        class="p-2"
      >
        <button
          type="button"
          class="follow-btn w-100 rounded-2 is-btn gap-2 d-flex align-items-center justify-content-between"
          :class="{ active: follows.includes(item.name), 'cursor-not-allowed opacity-50': item.loading }"
          :style="{ '--color': item.color }"
          :disabled="item.loading"
          @click="followTopicHandler(item)"
        >
          <n-spin
            v-if="item.loading"
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

interface TopicItemType {
  name: string;
  value: string;
  color: string;
  loading: boolean;
}

const topicList = ref<TopicItemType[]>(categoryTopic.map((e) => ({ ...e, loading: false })));

const { followNewsTopic, deleteFollowNewsTopic } = useUserApi();

const followTopicHandler = async (item: TopicItemType) => {
  const topic = item.name;
  // eslint-disable-next-line no-param-reassign
  item.loading = true;

  const type = follows.value?.includes(topic) ? 'delete' : 'add';

  const { status, message } = type === 'delete' ? await deleteFollowNewsTopic(topic) : await followNewsTopic(topic);

  if (status) {
    follows.value = type === 'delete' ? follows.value.filter((e) => e !== topic) : follows.value.concat(topic);

    showToast({
      id: `${topic}-${type}-follow-success`,
      message: `${message}：${topic}`
    });
  } else {
    showToast({
      id: `${topic}-follow-fail`,
      message
    });
  }
  // eslint-disable-next-line no-param-reassign
  item.loading = false;
};
</script>

<style lang="scss" scope>
.member-follow {
  max-width: 540px;
}

.follow-btn {
  padding: 8px;
  height: 42px;
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
