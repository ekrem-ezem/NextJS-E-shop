const valid = (name, email, password, cf_password) => {
  if (!name || !email || !password) return "请输入正确字段.";

  if (!validateEmail(email)) return "邮件不存在.";

  if (password.length < 6) return "密码必须大于6为字母或数字.";

  if (password !== cf_password) return "确认密码不匹配.";
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;
