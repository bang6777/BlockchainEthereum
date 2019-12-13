let {User} = require("./userModel")
let bcrypt = require('bcrypt')

let findUser = async (body) => {
  return await User.findOne({
    where: {
      email: body.email,
    },
  });
}

let register = async (body) => {
  let user = await findUser(body);
  if(user == null){ //Kiểm tra xem email đã được sử dụng chưa
    bcrypt.hash(body.password, 10, async (err, hash) => { //Mã hóa mật khẩu trước khi lưu vào db
      if (err) {return next(err);}
      await User.create({
        username: body.username,
        email: body.email,
        role: "customer",
        password: hash,
      });
    })
    return true;
  }else{
    return false;
  }
}
let signIn = async (req) => {
    let user = await findUser(req.body);
    if (user === null) {
      return false;
    } else {
      let comparePass = await bcrypt.compare(req.body.password, user.password);
      if (comparePass === false) {
        return false;
      } else {
        req.session.user = user;
        return true;
      }
    };
  };
  
  let isLogging = async (req) => {
    if (req.session && req.session.user) {
      return true;
    } else {
      return false;
    }
  }
module.exports = {
  register,
  signIn,
  isLogging,
};