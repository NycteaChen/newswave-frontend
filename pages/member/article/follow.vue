<template>
  <!-- <div>我的追蹤 6-6</div> -->
  <div class="follow-container">
    <button
      v-for="followBtn in followNewsStatus"
      :key="followBtn.id"
      type="button"
      :class="'follow-btn-' + followBtn.class"
      @click="toggleFollowBtn(followBtn.id)"
    >
      <!--icon 判斷暫時這樣處理-->
      <img
        v-if="followBtn.class === 'finance'"
        class="icon"
        src="@/assets/image/icon/follow/finance.svg"
      />
      <img
        v-if="followBtn.class === 'technology'"
        class="icon"
        src="@/assets/image/icon/follow/technology.svg"
      />
      <img
        v-if="followBtn.class === 'physical'"
        class="icon"
        src="@/assets/image/icon/follow/physical.svg"
      />
      <img
        v-if="followBtn.class === 'society'"
        class="icon"
        src="@/assets/image/icon/follow/society.svg"
      />
      <img
        v-if="followBtn.class === 'entertainment'"
        class="icon"
        src="@/assets/image/icon/follow/entertainment.svg"
      />
      <img
        v-if="followBtn.class === 'internationality'"
        class="icon"
        src="@/assets/image/icon/follow/internationality.svg"
      />
      <span class="fs-6">{{ followBtn.name }}</span>
      <template v-if="followBtn.class === 'technology'">
        <img
          v-if="!followBtn.subscribe"
          class="icon"
          src="@/assets/image/icon/follow/plus-blue.svg"
        />
        <img
          v-else
          class="icon"
          src="@/assets/image/icon/follow/minus-blue.svg"
        />
      </template>
      <template v-else-if="followBtn.class === 'society'">
        <img
          v-if="!followBtn.subscribe"
          class="icon"
          src="@/assets/image/icon/follow/plus-yellow.svg"
        />
        <img
          v-else
          class="icon"
          src="@/assets/image/icon/follow/minus-yellow.svg"
        />
      </template>
      <template v-else>
        <img
          v-if="!followBtn.subscribe"
          class="icon"
          src="@/assets/image/icon/follow/plus.svg"
        />
        <img
          v-else
          class="icon"
          src="@/assets/image/icon/follow/minus.svg"
        />
      </template>
    </button>
  </div>
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

const { getFollowNewsTopic, followNewsTopic, deleteFollowNewsTopic } = useUserApi();

const getFollowNewsTopicHandler = async () => {
  const { status, data } = await getFollowNewsTopic();
  const userFollowNewsTopic = data as string[];
  if (status) {
    userFollowNewsTopic.forEach((topic: string) => {
      followNewsStatus.value = followNewsStatus.value.map((topicItem: FollowNewsStatus) => {
        if (topicItem.name === topic) {
          return { ...topicItem, subscribe: true };
        }
        return topicItem;
      });
    });
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
    console.log(status, message);
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
    console.log(status, message);
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
}

onMounted(async () => {
  await nextTick(() => {
    getFollowNewsTopicHandler();
  });
});
</script>

<style lang="scss" scope>
.follow-container {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  max-width: 550px;
  width: 100%;
  font-weight: bold;

  @media (width <= 576px) {
    justify-content: center;
    max-width: auto;
  }
}

@mixin follow-btn($backgroundColor, $fontColor, $borderColor) {
  display: flex;
  align-items: center;
  justify-content: center;
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
  }
}

.follow-btn-finance {
  @include follow-btn($red, $white, $red);
}

.follow-btn-technology {
  @include follow-btn($white, $blue, $blue);
}

.follow-btn-physical {
  @include follow-btn($orange, $white, $orange);
}

.follow-btn-society {
  @include follow-btn($white, $yellow, $yellow);
}

.follow-btn-entertainment {
  @include follow-btn($green, $white, $green);
}

.follow-btn-internationality {
  @include follow-btn($cyan, $white, $cyan);
}
</style>
