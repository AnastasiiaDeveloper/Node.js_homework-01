module.exports = function (email, verif) {
  return {
    to: email,
    from: "anastasianode@hotmail.com",
    subject: "Аккаунт создан",
    html: `
       <h1>вы успешно создали аккаунт </h1>
       <p>ваш email - ${email}</p>
       <p>для верификации перейдите по ссылке <a href='google.com'>активировать</p>
    `,
  };
};
