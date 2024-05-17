interface ValidatorReturnType {
  pass: boolean;
  message?: string;
}

const emptyValidator = (value: string): ValidatorReturnType => {
  if (!value?.trim()) {
    return {
      pass: false,
      message: '欄位為必填'
    };
  }
  return {
    pass: true
  };
};

const nameValidator = (value: string, required: boolean = true): ValidatorReturnType => {
  if (required && !emptyValidator(value).pass) {
    return {
      pass: false,
      message: '暱稱為必填'
    };
  }
  return {
    pass: true
  };
};

const passwordValidator = (value: string, required: boolean = true): ValidatorReturnType => {
  if (required && !emptyValidator(value).pass) {
    return {
      pass: false,
      message: '密碼為必填'
    };
  }
  if (value.length < 8 || value.length > 16) {
    return {
      pass: false,
      message: '密碼長度需介於8~16碼'
    };
  }
  return {
    pass: true
  };
};

const emailValidator = (value: string, required: boolean = true): ValidatorReturnType => {
  if (required && !emptyValidator(value).pass) {
    return {
      pass: false,
      message: 'Email為必填'
    };
  }
  const emailRegex =
    // eslint-disable-next-line no-useless-escape
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

  if (!emailRegex.test(value)) {
    return {
      pass: false,
      message: 'Email 格式不正確'
    };
  }
  return {
    pass: true
  };
};

export default () => ({
  emptyValidator,
  nameValidator,
  passwordValidator,
  emailValidator
});
