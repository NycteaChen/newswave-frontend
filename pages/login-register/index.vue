<template>
  <div class="mb-3">{{ mode === 'login' ? '登入' : '註冊' }}</div>
  <div v-if="mode === 'login'">
    沒有帳號？前往<button @click="switchMode">註冊</button>
  </div>
  <div v-else>已有帳號？前往<button @click="switchMode">登入</button></div>
  <form class="mt-3">
    <div class="mb-3">
      <template v-if="mode === 'register'">
        <label
          for="exampleInputName"
          class="form-label"
          >Name
        </label>
        <input
          id="exampleInputName"
          v-model="formState.name"
          type="text"
          class="form-control"
        />
      </template>
      <label
        for="exampleInputEmail1"
        class="form-label"
        >Email address
      </label>
      <input
        id="exampleInputEmail1"
        v-model="formState.email"
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
      />
      <div
        id="emailHelp"
        class="form-text"
      >
        We'll never share your email with anyone else.
      </div>
    </div>
    <div class="mb-3">
      <label
        for="exampleInputPassword1"
        class="form-label"
        >Password
      </label>
      <input
        id="exampleInputPassword1"
        v-model="formState.password"
        type="password"
        class="form-control"
      />
    </div>
    <button
      :disabled="btnDisabled"
      type="button"
      class="btn btn-primary"
      @click="submit"
    >
      Submit
    </button>
    <template v-if="token">
      <div>3秒後跳轉至新聞....</div>
    </template>
    <p
      v-else
      class="text-warning"
    >
      {{ warnMessage }}
    </p>
  </form>
</template>
<script setup lang="ts">
const router = useRouter();

const userStore = useUserStore();

const cookieOption = {
  maxAge: 60 * 60
};

const token: any = useCookie('token', cookieOption);

const mode = ref('login');

const initialState = {
  name: '',
  email: '',
  password: ''
};

const formState = reactive({ ...initialState });

const btnDisabled = computed(
  () =>
    !formState.email?.trim() ||
    !formState.password?.trim() ||
    (mode.value === 'register' && !formState.name?.trim())
);

const warnMessage = ref<string>('');

const switchMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login';
  Object.assign(formState, initialState);
};

const login = async () => {
  try {
    const res = await useApi('/member/login', {
      method: 'post',
      body: {
        email: formState.email,
        password: formState.password
      },
      credentials: 'include'
    });
    return res;
  } catch (error) {
    return error;
  }
};

const register = async () => {
  try {
    const res = await useApi('/member/register', {
      method: 'post',
      body: {
        name: formState.name,
        email: formState.email,
        password: formState.password
      },
      credentials: 'include'
    });
    return res;
  } catch (error) {
    return error;
  }
};

const submit = async () => {
  const res: any = mode.value === 'login' ? await login() : await register();

  if (res?.data?.value?.status && res?.data?.value?.data?.id) {
    userStore.SET_USER_INFO(res?.data?.value?.data);
    token.value = res?.data?.value?.data?.token;
    setTimeout(() => {
      router.replace('/news');
    }, 3000);
  } else {
    warnMessage.value = res?.error?.value?.data?.message;
  }
};
</script>