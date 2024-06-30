<template>
  <div class="follow-container gap-3 d-flex">
    <button
      v-for="followBtn in followNewsStatus"
      :key="followBtn.id"
      type="button"
      class="d-flex align-items-center justify-content-center"
      :class="'follow-btn-' + followBtn.class"
      @click="toggleFollowBtn(followBtn.id)"
    >
      <svg-icon
        class="flex-shrink-0 icon"
        :name="`follow-${followBtn.class}`"
      />
      <span class="fs-6 fw-bold">{{ followBtn.name }}</span>
      <svg-icon
        :name="followBtn.subscribe ? 'minus' : 'plus'"
        class="flex-shrink-0 icon"
      />
    </button>
  </div>
  <n-toast />
</template>
<script lang="ts" setup>
definePageMeta({
  title: '文章管理 - 我的追蹤'
});

interface FollowNewsStatus {
  id: number;
  name: string;
  class: string;
  subscribe: boolean;
}

const followNewsStatus = ref<FollowNewsStatus[]>(categoryTopic);
const userStore = useUserStore();
const { follows } = storeToRefs(userStore);

const { getFollowNewsTopic, followNewsTopic, deleteFollowNewsTopic } = useUserApi();

const getFollowNewsTopicHandler = async (isOnMounted: boolean) => {
  const { status, data } = await getFollowNewsTopic();
  const userFollowNewsTopic = data as string[];
  if (status) {
    if (isOnMounted) {
      userFollowNewsTopic.forEach((topic: string) => {
        followNewsStatus.value = followNewsStatus.value.map((topicItem: FollowNewsStatus) => {
          if (topicItem.name === topic) {
            return { ...topicItem, subscribe: true };
          }
          return topicItem;
        });
      });
    } else {
      follows.value = userFollowNewsTopic;
    }
  }
};

const followNewsTopicHandler = async (topic: string) => {
  const { status, message } = await followNewsTopic(topic);
  if (status) {
    followNewsStatus.value = followNewsStatus.value.map((topicItem: FollowNewsStatus) => {
      if (topicItem.name === topic) {
        return { ...topicItem, subscribe: true };
      }
      return topicItem;
    });
    follows.value = followNewsStatus.value.filter((e) => e.subscribe).map((e) => e.name);

    showToast({
      id: 'follow-success',
      message
    });
  }
};
const deleteFollowNewsTopicHandler = async (topic: string) => {
  const { status, message } = await deleteFollowNewsTopic(topic);
  if (status) {
    followNewsStatus.value = followNewsStatus.value.map((topicItem: FollowNewsStatus) => {
      if (topicItem.name === topic) {
        return { ...topicItem, subscribe: false };
      }
      return topicItem;
    });
    follows.value = followNewsStatus.value.filter((e) => e.subscribe).map((e) => e.name);

    showToast({
      id: 'delete-follow-success',
      message
    });
  }
};

function toggleFollowBtn(id: number) {
  const followNewsTopicStatus = followNewsStatus.value.find(
    (topic: FollowNewsStatus) => id === topic.id
  ) as FollowNewsStatus;
  if (!followNewsTopicStatus.subscribe) {
    followNewsTopicHandler(followNewsTopicStatus.name);
  } else {
    deleteFollowNewsTopicHandler(followNewsTopicStatus.name);
  }
  getFollowNewsTopicHandler(false);
}

onMounted(async () => {
  await nextTick(() => {
    getFollowNewsTopicHandler(true);
  });
});
</script>

<style lang="scss" scope>
.follow-container {
  flex-wrap: wrap;
  max-width: 550px;
  width: 100%;

  @media (width <= 576px) {
    justify-content: center;
    max-width: auto;
  }
}

@mixin follow-btn($backgroundColor, $fontColor, $borderColor) {
  padding: 8px;
  width: 120px;
  border: 1px solid $borderColor;
  border-radius: 6px;
  background-color: $backgroundColor;
  color: $fontColor;
  gap: 10px;

  .icon {
    width: 20px;
    height: 20px;
    fill: currentcolor;
  }
}

.follow-btn-finance {
  @include follow-btn($red, $white, $red);
}

.follow-btn-tech {
  @include follow-btn($blue, $white, $blue);
}

.follow-btn-sport {
  @include follow-btn($orange, $white, $orange);
}

.follow-btn-society {
  @include follow-btn($yellow, $white, $yellow);
}

.follow-btn-entertainment {
  @include follow-btn($green, $white, $green);
}

.follow-btn-internationality {
  @include follow-btn($cyan, $white, $cyan);
}
</style>
