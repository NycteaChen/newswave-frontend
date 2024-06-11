<template>
  <form
    ref="formRef"
    class="form pt-3 needs-validation text-sm bg-body-light rounded-2 my-0 mx-auto mx-md-0 overflow-hidden"
    novalidate
  >
    <div class="bg-body d-flex gap-4 flex-column p-3 mx-3">
      <div
        v-for="field in fieldList"
        :key="field.value"
        class="col-12"
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
          <div
            v-if="field.type === 'radio'"
            class="d-flex gap-3"
          >
            <label
              v-for="option in field.options"
              :key="option.value"
              class="d-flex align-items-center"
            >
              <input
                :id="option.value"
                v-model="formState[field.value]"
                :type="field.type"
                :name="field.value"
                :value="option.value"
                class="me-2"
                :required="field.require"
                @keyup.enter="submit"
              />
              {{ option.label }}
            </label>
          </div>
          <n-input
            v-else
            :id="field.value"
            v-model:value="formState[field.value]"
            :placeholder="`請輸入${field.label}`"
            :has-error="!!errorMessage[field.value]"
            :type="field.type"
            :disabled="field.disabled"
            @press-enter="submit"
          />
        </div>
        <div
          v-if="errorMessage[field.value]"
          class="text-accent"
        >
          {{ errorMessage[field.value] }}
        </div>
      </div>
      <div class="d-flex flex-column gap-3 flex-sm-row">
        <n-button
          class="w-100"
          text="確認"
          :loading="btnLoading"
          @click="submit"
        />
      </div>
      <p
        v-show="warnMessage"
        class="text-accent text-sm mt-3 mb-0"
      >
        {{ warnMessage }}
      </p>
    </div>
    <img
      class="mt-2"
      :src="requireImage('member/wave-2.svg')"
    />
  </form>
</template>
<script lang="ts" setup>
const { updateUserInfo } = useUserApi();
const userStore = useUserStore();
const { email, name, birthday, gender } = storeToRefs(userStore);

definePageMeta({
  title: '帳戶管理 - 修改個人資料'
});

await useAsyncData('user-info', () => userStore.getUserInfo());

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

const initState: UserInfoFieldType = {
  email: email.value,
  name: name.value,
  birthday: birthday.value,
  gender: gender.value
};

const errorMessage = reactive<Partial<UserInfoFieldType>>({
  name: ''
});

const formState = reactive<UserInfoFieldType>({ ...initState });

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

const warnMessage = ref<string>('');

const formRef = ref<any>();

const { nameValidator } = useValidator();

const clearValidator = () => {
  formRef.value?.classList.remove('was-invalidated');
};

const checkValidityHandler = (): boolean => {
  const { pass, message } = nameValidator(formState.name);
  if (!pass) {
    errorMessage.name = message || '';
  } else {
    errorMessage.name = '';
  }
  return pass;
};

const reset = () => {
  Object.assign(errorMessage, {
    name: ''
  });
  warnMessage.value = '';
  clearValidator();
};

const submit = async () => {
  if (!checkValidityHandler()) {
    warnMessage.value = '';
    formRef.value?.classList.add('was-invalidated');
    return;
  }

  btnLoading.value = true;

  const { status, message, data } = await updateUserInfo(formState);

  if (status) {
    userStore.SET_USER_INFO(data);
    Object.assign(formState, data);
    reset();
    showToast({
      id: 'update-info-success',
      message
    });
  } else {
    warnMessage.value = message;
  }

  btnLoading.value = false;
  clearValidator();
};
</script>
<style lang="scss" scoped>
.form {
  max-width: 540px;
}
</style>
