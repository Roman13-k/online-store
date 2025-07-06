export const customValidator = (value: string) => {
  if (value.length < 8) {
    return "Пароль должен содержать 8 или более символов.";
  }
  if ((value.match(/[A-Z]/g) || []).length < 1) {
    return "Пароль должен содержать как минимум 1 заглавную букву.";
  }
  if ((value.match(/[^a-z0-9]/gi) || []).length < 1) {
    return "Пароль должен содержать как минимум 1 символ.";
  }
};
