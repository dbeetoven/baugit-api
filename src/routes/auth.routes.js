const express = require('express');
const router = express.Router();
const auhtCtrl = require('../controllers/auth.controller');
const verifySignUp = require('../middlewares/verifySignUp');
const authJwt = require('../middlewares/verifyJwtToken');
const passportGoogle = require('../auth/google');

router.post("/login", auhtCtrl.login);
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
router.post(
  "/signup",
  [verifySignUp.checkDuplicateUserNameOrEmail],
  auhtCtrl.signup
);
router.get('/google',passportGoogle.authenticate('google', {
    scope: 'https://www.google.com/m8/feeds',
  }),
);

router.get(
  '/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  },
);
// router.post("/login", auhtCtrl.login);

// router.get("/me/:id", [authJwt.verifyToken], auhtCtrl.getUserData);
// router.get("/forgot", auhtCtrl.forgot);
// router.get("/reset/:token", auhtCtrl.reset);
// router.get("/logout", function (req, res) {
//   res.status(200).send({
//     auth: false,
//     token: null,
//   });
// });

module.exports = router;
