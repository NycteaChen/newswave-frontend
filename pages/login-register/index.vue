<template>
  <div
    ref="loginRegisterRef"
    class="login-register d-flex justify-content-center align-items-center p-3 bg-lg-primary-gradient position-relative"
  >
    <section
      ref="formBoxContainerRef"
      class="form-box-container rounded-3 flex-lg-fill px-lg-4 position-relative z-1"
    >
      <div class="field-container">
        <header>
          <n-logo
            class="mx-auto"
            @click.prevent="goBack"
          />
          <h3 class="text-center my-4">{{ modeText.name }}</h3>
        </header>
        <form
          ref="formRef"
          class="row gy-4 needs-validation text-sm"
          novalidate
        >
          <div
            v-for="field in fieldList"
            :key="field.value"
            class="col-12"
          >
            <label
              :for="field.value"
              class="form-label fs-6"
            >
              {{ field.label }}
              <span class="text-accent">*</span>
            </label>
            <client-only>
              <n-password-input
                v-if="field.value === 'password'"
                :id="field.value"
                v-model:value="formState[field.value]"
                :placeholder="`請輸入${field.label}`"
                :has-error="!!errorMessage[field.value]"
              />
              <n-input
                v-else
                :id="field.value"
                v-model:value="formState[field.value]"
                :placeholder="`請輸入${field.label}`"
                :has-error="!!errorMessage[field.value]"
              />
            </client-only>
            <div
              v-if="errorMessage[field.value]"
              class="invalid-feedback"
            >
              {{ errorMessage[field.value] }}
            </div>
          </div>
          <div class="col-12">
            <n-button
              class="w-100 mb-3"
              :text="modeText.name"
              :loading="btnLoading"
              @click="submit"
            />
          </div>
        </form>
        <p class="warn-text text-accent text-sm">
          {{ warnMessage }}
        </p>
        <p class="text-sm text-center">
          {{ modeText.hint }}
          <a
            class="text-primary is-btn"
            @click="switchMode"
          >
            {{ modeText.action }}
          </a>
        </p>
      </div>
      <footer class="image-footer d-none d-lg-block text-body-white">
        <cite class="image-cite"> {{ bgImageObj.desc }} </cite>
      </footer>
    </section>
  </div>
</template>
<script setup lang="ts">
interface FieldType {
  label: string;
  value: keyof RegisterRequestType;
  hidden?: boolean;
}

definePageMeta({
  layout: 'login'
});

const route = useRoute();
const userStore = useUserStore();
const { login, register } = useUserApi();

const cookieOption = {
  maxAge: 60 * 60
};

const token: any = useCookie('token', cookieOption);

const mode = ref<'login' | 'register'>('login');
const modeText = computed(() => {
  const modeObj = {
    login: {
      name: '登入',
      hint: '沒有帳號？前往',
      action: '註冊'
    },
    register: {
      name: '註冊',
      hint: '已有帳號？前往',
      action: '登入'
    }
  };
  return modeObj[mode.value];
});

watchImmediate(
  () => route,
  (val) => {
    mode.value = (val.query.mode as 'register' | 'login') || 'login';
  }
);

const initialState: RegisterRequestType = {
  name: '',
  email: '',
  password: ''
};

const errorMessage = reactive<RegisterRequestType>({
  name: '',
  email: '',
  password: ''
});

const formState = reactive<RegisterRequestType>({ ...initialState });

const btnLoading = ref<boolean>(false);

const fieldList = computed(() => {
  const list = [
    {
      label: '暱稱',
      value: 'name',
      hidden: mode.value === 'login'
    },
    {
      label: 'Email',
      value: 'email'
    },
    {
      label: '密碼',
      value: 'password'
    }
  ].filter((e) => !e.hidden);
  return list as FieldType[];
});

const warnMessage = ref<string>('');

const formRef = ref<any>();

const validators: any = useValidator();

const checkValidityHandler = (): boolean => {
  let passBool: boolean = true;

  Object.entries(formState).forEach(([key, value]) => {
    if (mode.value === 'login' && key === 'name') {
      return;
    }

    const { pass, message } = validators[`${key}Validator`](value);
    if (!pass) {
      passBool = pass;
    }
    errorMessage[key as keyof RegisterRequestType] = pass ? '' : message;
  });

  return passBool;
};

const clearValidator = () => {
  formRef.value?.classList.remove('was-invalidated');
};

const router = useRouter();

const backRouter = computed(() => (router.options.history.state.back as string) || '/');

const goBack = async () => {
  await navigateTo(backRouter.value);
};

const submit = async () => {
  if (!checkValidityHandler()) {
    warnMessage.value = '';
    formRef.value?.classList.add('was-invalidated');
    return;
  }

  btnLoading.value = true;

  const { status, data, message } = mode.value === 'login' ? await login(formState) : await register(formState);

  if (status) {
    warnMessage.value = '';
    userStore.SET_USER_INFO(data);
    token.value = data?.token;

    showToast({
      id: 'login-success',
      message
    });

    await goBack();
  } else {
    warnMessage.value = message;
  }

  btnLoading.value = false;

  clearValidator();
};

const switchMode = () => {
  clearValidator();
  warnMessage.value = '';
  mode.value = mode.value === 'login' ? 'register' : 'login';
  Object.assign(formState, initialState);
};

const loginRegisterRef = ref<HTMLElement | null>(null);
const formBoxContainerRef = ref<HTMLElement | null>(null);

const imageList = [
  {
    img: 'https://cdn.pixabay.com/photo/2017/12/14/09/41/new-zealand-3018634_1280.jpg',
    desc: '“Wer lebt, sieht viel. Wer reist, sieht mehr.” Ich hoffe, Euch mit meinen Bildern für das Reisen zu begeistern. - Julius Silver - Reisender'
  },
  {
    img: 'https://cdn.pixabay.com/photo/2017/06/18/18/26/holi-2416686_1280.jpg',
    desc: 'Capturing the World’s Stories, One Frame at a Time - Syed Murtaza Ali'
  }
];

const bgImageObj = ref<any>({});

watch([() => loginRegisterRef.value, () => formBoxContainerRef.value], (val) => {
  if (val[0] && val[1]) {
    bgImageObj.value = imageList[Math.round(Math.random())] || imageList[0];
    const bgImage = `url(${bgImageObj.value.img})`;
    val.forEach((e: HTMLElement | null) => {
      e?.style.setProperty('--bg-image', bgImage);
    });
  }
});
</script>
<style lang="scss" scoped>
.login-register {
  overflow-y: auto;
  min-height: 100vh;
}

.warn-text {
  height: 21px;
}

.invalid-feedback {
  margin-bottom: -15px;
}

.form-box-container {
  overflow: hidden;
  padding: 40px 16px;
  max-width: 450px;
  border: 1px solid $blue-100;
  box-shadow: 0 16px 64px 0 rgba($dark, 0.12);
}

.image-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-bottom: 24px;
  padding-left: 24px;
  width: 40%;
  background: linear-gradient(48deg, rgba($blue-900, 1) 61%, transparent 80%);
  box-shadow: -262px 83px 33px 112px $blue-900;

  .image-cite {
    font-size: 12px;
  }
}

.field-container {
  max-width: 360px;
}

@include media-breakpoint-down(lg) {
  .login-register {
    background-image: linear-gradient(90deg, rgba($blue-800, 0.9) 0%, rgba($primary, 0.9) 100%), var(--bg-image);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .form-box-container {
    background: rgba($blue-100, 0.9);
  }
}

@include media-breakpoint-up(lg) {
  .login-register {
    overflow: hidden;

    &::before,
    &::after {
      position: absolute;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: $blue-700;
      content: '';
    }

    &::before {
      top: -350px;
      left: -240px;
    }

    &::after {
      right: -280px;
      bottom: -240px;
    }
  }

  ::v-deep(.n-logo) {
    max-width: 297px;
    height: 60px;
  }

  .form-box-container {
    display: flex;
    justify-content: flex-end;
    padding: 80px 24px;
    max-width: 950px;
    background-image: linear-gradient(285deg, rgba($blue-100, 0.9) 47%, transparent 47.2%), var(--bg-image);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}

@include media-breakpoint-up(xl) {
  .form-box-container {
    max-width: 1100px;
    background-image: linear-gradient(285deg, rgba($blue-100, 0.9) 42%, transparent 42.2%), var(--bg-image);
  }

  .image-footer {
    width: 45%;
    background: linear-gradient(48deg, rgba($blue-900, 1) 80%, transparent 89%);
    box-shadow: -192px 83px 33px 112px $blue-900;
  }
}
</style>
