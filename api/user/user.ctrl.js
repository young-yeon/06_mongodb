const UserModel = require("../../models/user");

const showSignupPage = (req, res) => {
  res.render("user/signup");
};

// - 성공: 201 Created, User객체 반환
// - 실패: 입력값 부족 400
//         중복된 email 409
const signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).send("필수 값이 입력되지 않았습니다.");

  UserModel.findOne({ email }, (err, result) => {
    if (err) return res.status(500).send("사용자 조회시 오류가 발생했습니다.");
    if (result) return res.status(409).send("이미 사용중인 E-mail입니다.");
  });
};

module.exports = { showSignupPage, signup };
