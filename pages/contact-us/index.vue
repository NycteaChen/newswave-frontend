<template>
  <div class="contact-us container pt-5 px-3">
    <section class="form-box-container rounded-3 d-flex bg-body flex-column flex-wrap flex-lg-row">
      <div class="field-container col-lg-5">
        <h3 class="text-center text-lg-start mb-4">聯絡我們</h3>
        <form
          ref="formRef"
          class="form needs-validation d-flex flex-column gap-4"
          novalidate
        >
          <div
            v-for="field in fieldList"
            :key="field.value"
            class="col-12"
            :class="{ 'col-md-6 col-lg-12 col-xl-8': field.type === 'radio' }"
          >
            <div class="d-flex flex-column">
              <label class="form-label text-sm">
                {{ field.label }}
                <span class="text-accent">*</span>
              </label>
              <n-radio-group
                v-if="field.type === 'radio'"
                v-model:checked="formState[field.value]"
                :options="field.options"
              />
              <textarea
                v-else-if="field.type === 'textarea'"
                v-model="formState[field.value]"
                class="form-control"
                :placeholder="`請輸入${field.label}`"
                :class="{ 'invalid-field': errorMessage[field.value] }"
              />
              <n-input
                v-else
                :id="field.value"
                v-model:value="formState[field.value]"
                :placeholder="`請輸入${field.label}`"
                :has-error="!!errorMessage[field.value]"
                :type="field.type"
              />
              <div
                v-if="errorMessage[field.value]"
                class="invalid-feedback"
              >
                {{ errorMessage[field.value] }}
              </div>
            </div>
          </div>
          <n-button
            class="w-100"
            text="提交"
            :loading="btnLoading"
            @click="submit"
          />
        </form>
        <div class="circle circle-left" />
      </div>
      <div
        class="extra-container col-lg-6 bg-white rounded-bottom-3 flex-fill d-flex flex-column gap-5 justify-content-center"
      >
        <ol class="description text-sm text-muted d-flex flex-column gap-2 gap-lg-3">
          <li>我們收到您的意見後將於工作日由專人以郵件回覆您，請務必確保您的電子信箱地址填寫正確。</li>
          <li>
            提交表單視同授權本單位將您的個資交付內部其他單位。除本公司之外，相關個資將不會交付給任何其他機構或第三人。
          </li>
          <li>
            您的個資僅作為 NewsWave 服務使用，相關規範請參閱本公司
            <nuxt-link
              class="is-btn"
              to="/policy/privacy-policy"
              target="_blank"
            >
              隱私權政策 </nuxt-link
            >。
          </li>
        </ol>
        <ul class="other-contact mx-auto w-100 d-flex flex-column gap-3 gap-lg-4">
          <li
            v-for="item in contactList"
            :key="item.icon"
            class="d-flex align-items-center gap-2 gap-lg-3"
          >
            <img
              class=""
              :src="requireImage(`icon/${item.icon}.svg`)"
            />
            <a
              v-if="item.href"
              class="text-body is-btn"
              :href="`${item.href}${item.value}`"
            >
              {{ item.value }}
            </a>
            <span v-else> {{ item.value }}</span>
          </li>
        </ul>
        <img
          class="d-block mx-auto"
          :src="requireImage('contact-us/banner.svg')"
        />
        <div class="circle circle-right bg-primary" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'info'
});

const contactList = [
  {
    icon: 'location',
    value: '臺北市中山區六角路一段6號4樓'
  },
  {
    href: 'tel:',
    icon: 'phone',
    value: '(02) 1234-9876'
  },
  {
    href: 'mailto:',
    icon: 'email',
    value: 'newswave@cs.com'
  }
];

const { emptyValidator, emailValidator } = useValidator();

const btnLoading = ref<boolean>(false);
const formRef = ref<HTMLElement | null>(null);

interface FieldValueType {
  email: string;
  name: string;
  gender?: string;
  subject: string;
  content: string;
}

interface FieldType {
  label: string;
  value: keyof FieldValueType;
  type: string;
  options?: { label: string; value: string }[];
}

const initState: FieldValueType = {
  email: '',
  name: '',
  gender: '0',
  subject: '',
  content: ''
};

const errorMessage = reactive<FieldValueType>({
  email: '',
  name: '',
  subject: '',
  content: ''
});

const formState = reactive({ ...initState });

const fieldList = computed(
  () =>
    [
      {
        label: '名字',
        value: 'name',
        type: 'text'
      },
      {
        label: '稱謂',
        value: 'gender',
        type: 'radio',
        options: [
          { label: '先生', value: '0' },
          { label: '小姐', value: '1' }
        ]
      },
      {
        label: 'Email',
        value: 'email',
        type: 'text'
      },
      {
        label: '主旨',
        value: 'subject',
        type: 'text'
      },
      {
        label: '內容',
        value: 'content',
        type: 'textarea'
      }
    ] as FieldType[]
);

const checkValidityHandler = (): boolean => {
  let passBool: boolean = true;

  Object.entries(formState).forEach(([key, value]) => {
    const { pass, message } = emptyValidator(value);

    if (!pass) {
      passBool = pass;
    }

    errorMessage[key as keyof FieldValueType] = pass ? '' : message || '';

    if (key === 'email' && value?.trim()) {
      const { pass, message } = emailValidator(value);
      if (!pass) {
        passBool = pass;
      }
      errorMessage[key as 'email'] = pass ? '' : message || '';
    }
  });

  return passBool;
};

const clearValidator = () => {
  formRef.value?.classList.remove('was-invalidated');
};

const submit = () => {
  if (!checkValidityHandler()) {
    formRef.value?.classList.add('was-invalidated');
    return;
  }

  btnLoading.value = true;

  setTimeout(() => {
    showToast({
      id: 'contact-success',
      // icon: 'icon/warning.svg',
      message: '表單發送成功'
    });

    btnLoading.value = false;

    Object.assign(formState, initState);

    clearValidator();
  }, 1000);
};

useHead({
  titleTemplate: (title) => `${title} - 聯絡我們`
});
</script>
<style lang="scss" scoped>
.contact-us {
  .description {
    li {
      padding-left: 8px;
      list-style-type: decimal;
    }
  }

  textarea {
    min-height: 150px;
    resize: none;
  }

  ::v-deep(.n-input input),
  textarea {
    background: #fff;
  }

  .field-container,
  .extra-container {
    position: relative;
    padding: 40px;
  }

  .field-container {
    padding-right: 16px;
    padding-left: 16px;
  }

  .circle {
    display: none;
  }

  .other-contact {
    img {
      width: 24px;
      height: 24px;
    }
  }
}

.invalid-feedback {
  margin-bottom: -15px;
}

@include media-breakpoint-up(sm) {
  .contact-us {
    .field-container {
      padding: 40px;
    }
  }
}

@include media-breakpoint-up(lg) {
  .contact-us {
    .field-container {
      padding-top: 80px;
      padding-bottom: 80px;
    }

    .extra-container {
      padding: 60px;
      border-radius: $border-radius-lg;
    }

    .circle {
      position: absolute;
      top: 24px;
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;

      &-right {
        right: 24px;
      }

      &-left {
        left: 24px;
        background: $gray-300;
      }
    }

    .other-contact {
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
