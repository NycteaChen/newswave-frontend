<template>
  <div>
    <n-loading :loading="showLoading">
      <ul
        v-if="renderList.length"
        class="d-flex flex-column gap-2 gap-md-3"
      >
        <li
          v-for="comment in renderList"
          :key="comment.id"
          class="p-3 rounded-2 bg-body-light"
        >
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center gap-2">
              <article-label
                v-for="item in comment?.article?.topic"
                :key="item"
                :text="item"
              />
              <delete-comment-btn
                :comment-id="comment.id"
                class="ms-auto"
                @success="successDeleteHandler(comment.id)"
              />
            </div>
            <h5 class="mb-0">
              <nuxt-link
                class="is-btn text-primary"
                :to="`/article/${comment?.article?.articleId.startsWith('M-') ? comment?.article?.source?.name : comment?.article?.topic[0]}/${comment?.article?.articleId}`"
              >
                {{ comment?.article?.title }}
              </nuxt-link>
            </h5>
            <div class="fs-sm text-muted">{{ comment.publishedAt }}</div>
            <p class="mb-0 break-word">{{ comment.content }}</p>
          </div>
        </li>
      </ul>
      <n-empty
        v-else-if="!showLoading"
        img="icon/no-data.svg"
      />
    </n-loading>
    <n-pagination
      v-model:current="pagination.current"
      class="mt-4"
      :total-pages="pagination.totalPages"
      :btn-loading="loadMoreLoading"
    />
  </div>
</template>
<script lang="ts" setup>
import type { PaginationType } from '@/components/NPagination.vue';

definePageMeta({
  title: '文章管理 - 我的留言'
});

const { getUserArticleCommentPage } = useUserApi();

const pagination = reactive<PaginationType>({
  current: 1,
  totalPages: 0
});
const loadMoreLoading = ref<boolean>(false);
const loading = ref<boolean>(true);

const isMobile = inject<any>('isMobile');
const commentList = ref<CommentType[]>([]);
const commentPhoneList = ref<CommentType[]>([]);
const renderList = computed(() => (isMobile.value ? commentPhoneList.value : commentList.value));

const showLoading = computed(() => {
  if (isMobile.value) {
    return !pagination.totalPages && loading.value;
  }
  return loading.value;
});

const getUserArticleCommentPageHandler = async () => {
  loading.value = true;
  loadMoreLoading.value = pagination.totalPages > 1;

  const params = {
    pageIndex: pagination.current
  };
  const { status, data } = await getUserArticleCommentPage(params);
  if (status) {
    commentList.value = data.comments || [];

    commentPhoneList.value = pagination.current === 1 ? data.comments : [...commentPhoneList.value, ...data.comments];

    pagination.totalPages = data.totalPages || 0;
  } else {
    commentList.value = [];
  }

  loading.value = false;
  loadMoreLoading.value = false;
};

const successDeleteHandler = (commentId: CommentType['id']) => {
  commentList.value = commentList.value.filter((e) => e.id !== commentId);
  commentPhoneList.value = commentPhoneList.value.filter((e) => e.id !== commentId);
};

onMounted(async () => {
  await nextTick(() => {
    getUserArticleCommentPageHandler();
  });
});

watch(
  () => pagination.current,
  () => {
    getUserArticleCommentPageHandler();
  }
);
</script>
