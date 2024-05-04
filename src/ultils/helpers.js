import { message, regex } from "../ultils/constants";

export const validate = (payload, setInvalidFields, isLoginForm = false) => {
  let invalids = 0;
  const requiredFields = [
    { key: 'email', message: message.emailRequired },
    { key: 'password', message: message.passwordRequired },
    ...isLoginForm ? [] : [
        { key: 'phone', message: message.phoneRequired },
        { key: 'confirmPassword', message: message.confirmPasswordRequired },
        { key: 'firstName', message: message.firstNameRequired },
        { key: 'lastName', message: message.lastNameRequired },
        { key: 'address', message: message.addressRequired },
    ],
  ];

  const checkFieldValidity = (field, regex = null, customMessage = null) => {
    if (!payload[field.key]?.trim()) {
      invalids++;
      setInvalidFields(prev => [...prev, { name: field.key, message: field.message }]);
    } else if (regex && !regex.test(payload[field.key])) {
      invalids++;
      setInvalidFields(prev => [...prev, { name: field.key, message: customMessage || field.message }]);
    }
  };

  requiredFields.forEach(field => checkFieldValidity(field));
  
  checkFieldValidity({ key: 'email' }, regex.email, message.invalidEmailFormat);
  checkFieldValidity({ key: 'password' }, regex.passwordLength, message.passwordLength);
  if (!isLoginForm) {
    const phoneValue = payload['phone']?.trim();
    if (phoneValue) {
      if (phoneValue.length < 10) {
        invalids++;
        setInvalidFields(prev => [...prev, { name: 'phone', message: message.phoneLength }]);
      } else if (!regex.regexPhone.test(phoneValue)) {
        invalids++;
        setInvalidFields(prev => [...prev, { name: 'phone', message: message.phoneFormat }]);
      }
    }
  }


  return invalids === 0;
};
