<template>
  <div class="search-page">
    <section class="fs-sm row g-3 mb-4 col-lg-10">
      <div
        v-for="field in fieldList"
        :key="field.value"
        class="col-12"
        :class="{ 'col-sm-6': field.type === 'select' }"
      >
        <label
          :for="field.value"
          class="form-label fs-6"
        >
          {{ field.label }}
        </label>
        <n-input
          v-if="field.type === 'input'"
          :id="field.value"
          v-model:value="searchQuery[field.value]"
          :inputmode="field.inputmode || 'text'"
          :placeholder="`請輸入${field.label}`"
          suffix-icon="icon/search.svg"
          @press-enter="goToSearch"
        />
        <n-select
          v-else
          :id="field.value"
          v-model:selected="searchQuery[field.value]"
          :options="field.options || []"
          :placeholder="`請選擇${field.label}`"
        />
      </div>
      <div class="col-12 d-flex gap-2 gap-sm-3 flex-column flex-sm-row">
        <n-button
          text="搜尋"
          :disabled="loading"
          @click="goToSearch"
        />
        <n-button
          text="重置"
          type="outline"
          :disabled="loading"
          @click="reset"
        />
      </div>
    </section>
    <n-loading :loading="showLoading">
      <h4
        v-if="currentKeyword"
        class="mb-4 text-primary"
      >
        {{ `搜尋標題包含「${currentKeyword}」的文章：` }}
      </h4>
      <ul
        v-if="renderList.length"
        class="d-flex flex-column gap-4"
      >
        <li
          v-for="(item, index) in renderList"
          :key="index"
        >
          <article-row
            :news-data="item"
            :show-content="true"
          />
        </li>
      </ul>
      <n-empty
        v-else-if="!loading"
        text="暫無搜尋結果，請重新輸入關鍵字"
        width="300"
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
import type { NSelectProps } from '@/components/NSelect.vue';
import type { NInputProps } from '@/components/NInput.vue';
import type { PaginationType } from '@/components/NPagination.vue';

interface QueryType {
  keyword: SearchPageRequestType['keyword'];
  type: SearchPageRequestType['type'] | 'all';
  topic: SearchPageRequestType['topic'] | 'all';
}

useHead({
  titleTemplate: (title) => `${title} - 搜尋`
});
const route = useRoute();

const { getSearchPage } = useGuestApi();

const isMobile = inject<any>('isMobile');

const initState: QueryType = {
  keyword: undefined,
  type: 'all',
  topic: 'all'
};

const searchQuery = reactive({ ...initState });
const pagination = reactive<PaginationType>({
  current: 1,
  totalPages: 0
});

const searchList = ref<ArticleType[]>([]);
const searchPhoneList = ref<ArticleType[]>([]);
const loadMoreLoading = ref<boolean>(false);
const loading = ref<boolean>(false);
const currentKeyword = ref<string>('');

interface FieldType {
  label: string;
  type: 'input' | 'select';
  value: keyof QueryType;
  hidden?: boolean;
  inputmode?: NInputProps['inputmode'];
  options?: NSelectProps['options'];
}

const allOption = {
  label: '全部',
  value: 'all'
};

const typeList = ref<NSelectProps['options']>([
  allOption,
  {
    label: '新聞',
    value: 'news'
  },
  {
    label: '雜誌',
    value: 'magazine'
  }
]);

const guestStore = useGuestStore();
const { magazineCategoryList } = storeToRefs(guestStore);

const topicList = computed(() => {
  const newsOptions =
    newsCategory().map((e) => ({
      label: e,
      value: e
    })) || [];

  const magazineOptions =
    magazineCategoryList.value?.map((e) => ({
      label: e.categoryName,
      value: e.categoryId
    })) || [];

  newsOptions.unshift(allOption);
  magazineOptions.unshift(allOption);

  return {
    news: newsOptions,
    magazine: magazineOptions
  };
});

const fieldList = computed(() => {
  const list = [
    {
      label: '文章標題',
      value: 'keyword',
      type: 'input'
    },
    {
      label: '類別',
      value: 'type',
      type: 'select',
      options: typeList.value
    },
    {
      label: searchQuery.type === 'news' ? '新聞主題' : '雜誌種類',
      value: 'topic',
      type: 'select',
      hidden: searchQuery.type === 'all',
      options: searchQuery.type && searchQuery.type !== 'all' ? topicList.value[searchQuery.type] : []
    }
  ].filter((e) => !e.hidden);
  return list as FieldType[];
});

const showLoading = computed(() => {
  if (isMobile.value) {
    return !pagination.totalPages && loading.value;
  }
  return loading.value;
});

const renderList = computed(() => (isMobile.value ? searchPhoneList.value : searchList.value));

const reset = () => {
  searchList.value = [];
  searchPhoneList.value = [];
  pagination.current = 1;
  pagination.totalPages = 0;
  currentKeyword.value = '';
  Object.assign(searchQuery, initState);
};

const getSearchPageHandler = async () => {
  if (!searchQuery.keyword?.trim()) return;

  loading.value = true;
  loadMoreLoading.value = pagination.totalPages > 1;

  const params = {
    pageIndex: pagination.current,
    keyword: searchQuery.keyword?.trim(),
    type: searchQuery.type === 'all' ? undefined : searchQuery.type,
    topic: searchQuery.type === 'all' || searchQuery.topic === 'all' ? undefined : searchQuery.topic
  };

  const { status, data } = await getSearchPage(params);
  if (status) {
    currentKeyword.value = searchQuery.keyword;

    searchList.value = data.articles || [];

    searchPhoneList.value = pagination.current === 1 ? data.articles : [...searchPhoneList.value, ...data.articles];

    pagination.totalPages = data.totalPages || 0;
  } else {
    searchList.value = [];
  }

  loading.value = false;
  loadMoreLoading.value = false;
};

const goToSearch = () => {
  if (searchQuery.keyword?.trim()) {
    navigateTo({
      path: '/search',
      query: searchQuery
    });
  }
};

watchImmediate(
  () => route.query,
  (val) => {
    if (val) {
      searchQuery.keyword = String(val.keyword) || undefined;
      searchQuery.topic = String(val.topic) || 'all';
      searchQuery.type = (String(val.type) as QueryType['type']) || 'all';
      pagination.current = 1;
      getSearchPageHandler();
    }
  }
);

watch(
  () => pagination.current,
  () => {
    getSearchPageHandler();
  }
);

watch(
  () => searchQuery.type,
  (val) => {
    searchQuery.topic = val === 'all' ? undefined : 'all';
  }
);
</script>
<style lang="scss" scoped>
.search-page {
  margin-bottom: 40px;
}
</style>
