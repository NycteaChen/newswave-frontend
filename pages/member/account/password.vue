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
        <label
          :for="field.value"
          class="form-label fs-6"
        >
          {{ field.label }}
          <span class="text-accent">*</span>
        </label>
        <n-password-input
          :id="field.value"
          v-model:value="formState[field.value]"
          :placeholder="`請輸入${field.label}`"
          :has-error="!!errorMessage[field.value]"
          @press-enter="submit"
        />
        <div
          v-if="errorMessage[field.value]"
          class="invalid-feedback"
        >
          {{ errorMessage[field.value] }}
        </div>
      </div>
      <div>
        <div class="d-flex flex-column gap-3 flex-sm-row">
          <n-button
            class="w-100"
            text="確認"
            :loading="btnLoading"
            @click="submit"
          />
          <n-button
            class="w-100"
            color="secondary"
            text="清除"
            @click="reset"
          />
        </div>
        <p
          v-show="warnMessage"
          class="text-accent text-sm mt-3 mb-0"
        >
          {{ warnMessage }}
        </p>
      </div>
    </div>
    <img
      class="mt-2"
      :src="requireImage('member/wave-2.svg')"
    />
  </form>
</template>
<script lang="ts" setup>
definePageMeta({
  title: '帳戶管理 - 修改密碼'
});

const { updatePassword } = useUserApi();

interface PasswordFieldType {
  oldPassword: PasswordType;
  newPassword: PasswordType;
  confirmPassword: PasswordType;
}

interface FieldType {
  label: string;
  value: keyof PasswordFieldType;
}

const initState: PasswordFieldType = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

const errorMessage = reactive<PasswordFieldType>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const formState = reactive<PasswordFieldType>({ ...initState });

const btnLoading = ref<boolean>(false);

const fieldList = computed(() => {
  const list = [
    {
      label: '舊密碼',
      value: 'oldPassword'
    },
    {
      label: '新密碼',
      value: 'newPassword'
    },
    {
      label: '確認新密碼',
      value: 'confirmPassword'
    }
  ];
  return list as FieldType[];
});

const warnMessage = ref<string>('');

const formRef = ref<any>();

const { passwordValidator } = useValidator();

const clearValidator = () => {
  formRef.value?.classList.remove('was-invalidated');
};

const checkValidityHandler = (): boolean => {
  let passBool: boolean = true;

  Object.entries(formState).forEach(([key, value]) => {
    const { pass, message } = passwordValidator(value);
    if (!pass) {
      passBool = pass;
    }

    errorMessage[key as keyof PasswordFieldType] = pass ? '' : message || '';
  });

  if (formState.oldPassword.trim() && formState.oldPassword === formState.newPassword) {
    errorMessage.newPassword = '新密碼不可與舊密碼相同';
    passBool = false;
  }

  if (formState.newPassword.trim() && formState.newPassword !== formState.confirmPassword) {
    errorMessage.confirmPassword = '確認密碼與新密碼不同，請重新輸入一次';
    passBool = false;
  }

  return passBool;
};

const reset = () => {
  Object.assign(formState, initState);
  clearValidator();
  warnMessage.value = '';
};

const submit = async () => {
  if (!checkValidityHandler()) {
    warnMessage.value = '';
    formRef.value?.classList.add('was-invalidated');
    return;
  }

  btnLoading.value = true;

  const { status, message } = await updatePassword(formState);

  if (status) {
    reset();
    showToast({
      id: 'password-success',
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

.invalid-feedback {
  margin-bottom: -15px;
}
</style>
