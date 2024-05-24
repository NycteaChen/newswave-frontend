<template>
  <div>修改密碼 6-3</div>
  <form class="mt-3">
    <div class="mb-3">
      <label
        for="exampleInputOldPassword"
        class="form-label"
        >舊密碼
      </label>
      <input
        id="exampleInputOldPassword"
        v-model="formState.oldPassword"
        type="password"
        class="form-control"
      />
      <label
        for="exampleInputNewPassword"
        class="form-label"
        >新密碼
      </label>
      <input
        id="exampleInputNewPassword"
        v-model="formState.newPassword"
        type="password"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label
        for="exampleInputConfirmPassword"
        class="form-label"
        >確認新密碼
      </label>
      <input
        id="exampleInputConfirmPassword"
        v-model="formState.confirmPassword"
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
    <p v-if="hintMessage">{{ hintMessage }}</p>
  </form>
</template>
<script lang="ts" setup>
const { updatePassword } = useUserApi();

const initState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

const formState = reactive<{ [key: string]: PasswordType }>({ ...initState });

const hintMessage = ref<string>('');

const btnDisabled = computed(
  () => !formState.oldPassword?.trim() || !formState.newPassword?.trim() || !formState.confirmPassword?.trim()
);

const submit = async () => {
  const { status, message } = await updatePassword(formState);

  if (status) {
    Object.assign(formState, initState);
    hintMessage.value = message;
  } else {
    hintMessage.value = message;
  }
};
</script>
