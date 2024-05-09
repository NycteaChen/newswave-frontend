import type { UseFetchOptions } from 'nuxt/app';

export default async function useApi<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  const { data, error }: any = await useFetch(url, {
    ...options,
    credentials: 'include',
    $fetch: useNuxtApp().$api
  });

  const res = data?.value?.status
    ? data.value
    : {
        ...error.value?.data,
        status: false
      };

  return res;
}
