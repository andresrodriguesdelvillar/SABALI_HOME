module.exports = {
  port: process.env.PORT || 5000,
  tokenExpires: {
    confirmationMail: 900, // 15 Minutes
    userAuth: 604800 // one Week
  }
};
