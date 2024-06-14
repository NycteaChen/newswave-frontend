<template>
  <section class="comment-area">
    <h5 class="mb-3">公開留言</h5>
    <div class="pt-3">
      <ul>
        <!-- <li
          v-for="comment in commentList"
          :key="comment.id"
        >
          <p>{{ comment.content }}</p>
        </li> -->
        <li
          v-if="!commentList.length"
          class="empty-box text-muted text-sm text-center rounded-2 mb-3 mb-md-4"
        >
          <div class="d-flex align-items-center justify-content-center">
            目前沒有留言，趕快發表這篇文章的第一則評論吧！
          </div>
        </li>
      </ul>
      <section :class="{ 'd-sm-flex align-items-center gap-2': token }">
        <div
          v-if="token"
          class="py-2 d-flex align-items-center gap-2 flex-fill"
        >
          <n-avatar />
          <n-input
            v-model:value="comment"
            class="w-100"
            placeholder="發表留言"
          />
        </div>
        <div class="text-center">
          <n-button
            :text="buttonInfo.text"
            :icon-src="requireImage(`icon/${buttonInfo.icon}.svg`)"
            @click="buttonInfo.clickFn()"
          />
        </div>
      </section>
    </div>
  </section>
</template>
<script lang="ts" setup>
const token: any = useCookie('token');
const commentList = ref([]);

const comment = ref<string>('');

const submitComment = () => {
  console.log('留言 :>> ', comment);
};

const buttonInfo = computed(() =>
  token.value
    ? {
        text: '留言',
        icon: 'comment',
        clickFn: () => {
          submitComment();
        }
      }
    : {
        text: '登入帳號',
        icon: 'login',
        clickFn: () => {
          navigateTo('/login-register');
        }
      }
);
</script>
<style lang="scss" scoped>
.comment-area {
  padding-top: 24px;

  li {
    background: #fff;

    &.empty-box {
      padding: 40px;
    }
  }
}

::v-deep(.n-avatar) {
  flex-shrink: 0;
}

::v-deep(.n-input) {
  input {
    background: #fff;
  }
}

::v-deep(.n-button) {
  .btn-icon {
    width: 18px;
    height: 18px;
  }
}

@include media-breakpoint-down(md) {
  ::v-deep(.n-button) {
    width: 100%;
  }
}

@include media-breakpoint-up(md) {
  .comment-area {
    padding-top: 40px;
  }
}
</style>
