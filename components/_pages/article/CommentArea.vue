<template>
  <section class="comment-area">
    <h5 class="mb-3">公開留言</h5>
    <div class="pt-3 px-3 d-flex flex-column gap-3 gap-md-4">
      <section :class="{ 'd-sm-flex align-items-center gap-2': token }">
        <div
          v-if="token"
          class="py-2 d-flex align-items-center gap-2 flex-fill"
        >
          <n-avatar class="flex-shrink-0" />
          <n-input
            v-model:value="commentValue"
            class="w-100"
            :placeholder="`以「${name}」身份發表留言`"
          />
        </div>
        <div class="text-center">
          <n-button
            class="operation-btn"
            :loading="buttonInfo.loading"
            :text="buttonInfo.text"
            :icon-src="requireImage(`icon/${buttonInfo.icon}.svg`)"
            @click="buttonInfo.clickFn()"
          />
        </div>
      </section>
      <n-loading :loading="showLoading">
        <ul class="d-flex flex-column gap-1">
          <li
            v-for="comment in renderList"
            :key="comment.id"
            class="p-4 rounded-2"
          >
            <div class="d-flex flex-column gap-3">
              <div class="d-flex align-items-center gap-3">
                <div
                  class="fw-bold"
                  :class="{ 'text-primary': comment.userId?._id === id }"
                >
                  {{ comment.user?.name || '-' }}
                </div>
                <div class="fs-sm text-muted">{{ comment.publishedAt }}</div>
                <delete-comment-btn
                  v-if="comment.userId?._id === id"
                  :comment-id="comment.id"
                  class="ms-auto"
                  @success="successDeleteHandler(comment.id)"
                />
              </div>
              <p class="mb-0 break-word">{{ comment.content }}</p>
            </div>
          </li>
          <li
            v-if="!renderList.length && !showLoading"
            class="empty-box text-muted fs-sm text-center rounded-2"
          >
            <div class="d-flex align-items-center justify-content-center">
              目前沒有留言，趕快發表這篇文章的第一則評論吧！
            </div>
          </li>
        </ul>
      </n-loading>
      <n-pagination
        v-model:current="pagination.current"
        :total-pages="pagination.totalPages"
        :btn-loading="loadMoreLoading"
      />
    </div>
  </section>
</template>
<script lang="ts" setup>
import type { PaginationType } from '@/components/NPagination.vue';

const token: any = useCookie('token');
const route = useRoute();

const { getArticleCommentPage } = useGuestApi();
const { addArticleComment } = useUserApi();

const userStore = useUserStore();
const { id, name } = storeToRefs(userStore);

const isMobile = inject<any>('isMobile');
const commentList = ref<CommentType[]>([]);
const commentPhoneList = ref<CommentType[]>([]);
const renderList = computed(() => (isMobile.value ? commentPhoneList.value : commentList.value));

const commentValue = ref<string>('');

const loadMoreLoading = ref<boolean>(false);
const loading = ref<boolean>(true);
const btnLoading = ref<boolean>(false);

const pagination = reactive<PaginationType>({
  current: 1,
  totalPages: 0
});

const showLoading = computed(() => {
  if (isMobile.value) {
    return !pagination.totalPages && loading.value;
  }
  return loading.value;
});

const articleId = computed<string>(() => `${route.params.articleId}`);

const getArticleCommentPageHandler = async () => {
  loading.value = true;
  loadMoreLoading.value = pagination.totalPages > 1;

  const params = {
    articleId: articleId.value,
    pageIndex: pagination.current
  };

  const { status, data } = await getArticleCommentPage(params);
  if (status) {
    commentList.value = data.comments || [];

    commentPhoneList.value = pagination.current === 1 ? data.comments : [...commentPhoneList.value, ...data.comments];

    pagination.totalPages = data.totalPages || 0;
  }

  loading.value = false;
  loadMoreLoading.value = false;
};

const successDeleteHandler = (commentId: CommentType['id']) => {
  commentList.value = commentList.value.filter((e) => e.id !== commentId);
  commentPhoneList.value = commentPhoneList.value.filter((e) => e.id !== commentId);
};

const addArticleCommentHandler = async () => {
  if (!commentValue.value?.trim()) {
    showToast({
      id: `comment-empty`,
      icon: 'icon/warning.svg',
      message: '請輸入留言內容'
    });
    return;
  }

  btnLoading.value = true;
  const params = {
    articleId: articleId.value,
    content: commentValue.value
  };

  const { status, message } = await addArticleComment(params);
  if (status) {
    pagination.current = 1;
    getArticleCommentPageHandler();
    commentValue.value = '';
  }
  showToast({
    id: `comment-${status}`,
    icon: status ? '' : 'icon/warning.svg',
    message
  });

  btnLoading.value = false;
};

const buttonInfo = computed(() =>
  token.value
    ? {
        text: '留言',
        loading: btnLoading.value,
        icon: 'comment',
        clickFn: () => {
          addArticleCommentHandler();
        }
      }
    : {
        text: '登入留言',
        icon: 'login',
        clickFn: () => {
          navigateTo('/login-register');
        }
      }
);

onMounted(async () => {
  await nextTick(() => {
    getArticleCommentPageHandler();
  });
});

watch(
  () => pagination.current,
  () => {
    getArticleCommentPageHandler();
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

::v-deep(.n-input) {
  input {
    background: #fff;
  }
}

.operation-btn {
  ::v-deep(.btn-icon) {
    width: 18px;
    height: 18px;
  }
}

@include media-breakpoint-down(md) {
  .operation-btn {
    width: 100%;
  }
}

@include media-breakpoint-up(md) {
  .comment-area {
    padding-top: 40px;
  }
}
</style>
