<template>
  <form
    ref="formRef"
    class="form pt-3 needs-validation text-sm bg-body-light rounded-2 my-0 mx-auto mx-md-0 overflow-hidden"
    novalidate
  >
    <div class="bg-body d-flex gap-4 flex-column p-3 mx-3">
      <div class="col-12">
        <label class="form-label fs-6">
          Email
          <span class="text-accent">*</span>
        </label>
        <input type="text " />
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
  title: '帳戶管理 - 修改個人資料'
});
const { updateUserInfo } = useUserApi();

interface UpdateUserInfoFieldType {
  name: UpdateUserInfoType;
  birthday: UpdateUserInfoType;
  gender: UpdateUserInfoType;
  avatar: UpdateUserInfoType;
}

const initState: UpdateUserInfoFieldType = {
  name: '',
  birthday: '',
  gender: '',
  avatar: ''
};

const errorMessage = reactive<UpdateUserInfoFieldType>({
  name: '',
  birthday: '',
  gender: '',
  avatar: ''
});

const formState = reactive<UpdateUserInfoFieldType>({ ...initState });

const btnLoading = ref<boolean>(false);
const warnMessage = ref<string>('');
const formRef = ref<any>();

const { nameValidator } = useValidator();

const clearValidator = () => {
  formRef.value?.classList.remove('was-invalidated');
};

const checkValidityHandler = (): boolean => {
  let passBool: boolean = true;

  Object.entries(formState).forEach(([key, value]) => {
    const { pass, message } = nameValidator(value);
    if (!pass) {
      passBool = pass;
    }

    errorMessage[key as keyof UpdateUserInfoFieldType] = pass ? '' : message || '';
  });

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

  const { status, message } = await updateUserInfo(formState);

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
</style>
