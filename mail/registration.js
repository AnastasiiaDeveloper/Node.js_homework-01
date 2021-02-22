module.exports = function (email, tokenId) {
  return {
    to: email,
    from: process.env.EMAIL,
    subject: "Аккаунт создан",
    html: `
       <h1>вы успешно создали аккаунт </h1>
       <p>ваш email - ${email}</p>
       <p>для верификации перейдите по ссылке <a href='${process.env.BASE_URL}/api/auth/verify/${tokenId}'>активировать</p>
    `,
  };
};
