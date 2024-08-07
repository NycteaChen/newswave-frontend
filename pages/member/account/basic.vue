<template>
  <n-loading
    :loading="loading"
    class="account-basic"
  >
    <form
      class="form pt-3 needs-validation fs-sm bg-body-light rounded-2 my-0 mx-auto mx-md-0 overflow-hidden"
      :class="{ 'was-invalidated': isInvalidated }"
      novalidate
    >
      <div class="bg-body d-flex gap-4 flex-column p-3 mx-3">
        <div
          v-for="field in fieldList"
          :key="field.value"
          class="col-12"
          :class="{ 'col-sm-6': field.type === 'radio' }"
        >
          <div class="d-flex flex-column">
            <label class="form-label fs-6">
              {{ field.label }}
              <span
                v-if="field.require"
                class="text-accent"
                >*</span
              >
            </label>
            <n-radio-group
              v-if="field.type === 'radio'"
              v-model:checked="formState[field.value]"
              :options="field.options"
            />
            <n-input
              v-else
              :id="field.value"
              v-model:value="formState[field.value]"
              :placeholder="`請輸入${field.label}`"
              :has-error="field.value === 'name' && !!errorMessage"
              :type="field.type"
              :disabled="field.disabled"
              @press-enter="submit"
            />
          </div>
          <div
            v-if="field.value === 'name' && errorMessage"
            class="text-danger"
          >
            {{ errorMessage }}
          </div>
        </div>
        <n-button
          class="w-100"
          text="確認"
          :loading="btnLoading"
          @click="submit"
        />
      </div>
      <img
        class="mt-2"
        :src="requireImage('member/wave-2.svg')"
      />
    </form>
  </n-loading>
</template>
<script lang="ts" setup>
const { updateUserInfo } = useUserApi();
const userStore = useUserStore();
const { email, name, birthday, gender } = storeToRefs(userStore);

definePageMeta({
  title: '帳戶管理 - 修改個人資料'
});

interface UserInfoFieldType {
  email: UserInfoType['email'];
  name: UserInfoType['name'];
  birthday: UserInfoType['birthday'];
  gender: UserInfoType['gender'];
}

interface FieldType {
  label: string;
  value: keyof UserInfoFieldType;
  type: string;
  options?: { label: string; value: string }[];
  require?: boolean;
  disabled?: boolean;
}

const errorMessage = ref<string>('');
const loading = ref<boolean>(true);

const formState = reactive<UserInfoFieldType>({
  email: '',
  name: '',
  birthday: '',
  gender: ''
});

const isInvalidated = ref<boolean>(false);
const btnLoading = ref<boolean>(false);

const fieldList = computed(() => {
  const list = [
    {
      label: 'Email',
      value: 'email',
      type: 'text',
      disabled: true
    },
    {
      label: '暱稱',
      value: 'name',
      type: 'text',
      require: true
    },
    {
      label: '生日',
      value: 'birthday',
      type: 'date'
    },
    {
      label: '性別',
      value: 'gender',
      type: 'radio',
      options: [
        { label: '男', value: '0' },
        { label: '女', value: '1' }
      ]
    }
  ];
  return list as FieldType[];
});

const { nameValidator } = useValidator();

const clearValidator = () => {
  isInvalidated.value = false;
};

const checkNameValidityHandler = (): boolean => {
  const { pass, message } = nameValidator(formState.name);
  errorMessage.value = pass ? '' : message || '';
  return pass;
};

const submit = async () => {
  if (!checkNameValidityHandler()) {
    isInvalidated.value = true;
    return;
  }

  clearValidator();

  btnLoading.value = true;

  const { status, message, data } = await updateUserInfo(formState);

  if (status) {
    userStore.SET_USER_INFO(data);

    Object.assign(formState, data);

    showToast({
      id: 'update-info-success',
      message
    });
  } else {
    showToast({
      id: 'update-info-fail',
      type: 'warning',
      delay: 2500,
      message
    });
  }

  btnLoading.value = false;
};

onMounted(() => {
  nextTick(async () => {
    if (!gender.value) {
      await userStore.getUserInfo();
      formState.gender = gender.value;
      formState.birthday = birthday.value;
    }
    loading.value = false;
  });
});

watchEffect(() => {
  formState.email = email.value;
  formState.name = name.value;
  formState.birthday = birthday.value;
  formState.gender = gender.value;
});
</script>
<style lang="scss" scoped>
.account-basic {
  max-width: 540px;

  ::v-deep(.n-loading) {
    z-index: 2;
  }
}
</style>
