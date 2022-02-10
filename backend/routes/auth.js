const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const userdata = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "helloworldthisisamitkumar";

//Route:1 create a user using : POST "/api/auth/createuser" , no login required;
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password must be atleast 5 character').isLength({ min: 8 })
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  let userfind = await userdata.findOne({ email: req.body.email });
  const passwordhash = await bcrypt.hash(req.body.password, 10);

  // cheak the enter username and password is valid or not.
  if (!errors.isEmpty()) {
    return res.status(400).json({success:success , error:errors.array()});
  }
  // cheak whether the user with this email exist already.
  if (userfind) {
    return res.status(400).json({success:success , error:[{msg:"user with this email already exist"}]});
  }
  else {
    try {
      let user = await userdata.create({
        name: req.body.name,
        password: passwordhash,
        email: req.body.email
      });

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success:success , authtoken: authtoken });

    } catch (err) {
      {
        res.json(err),
          console.log(err)
      }
    }
  }
});

//Route:2 Authenticate user using : POST "/api/auth/login" , no login required;
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password must be atleast 5 character').isLength({ min: 5 })
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success:success , errors: errors.array()});
  }
  const { email, password } = req.body;
  try {
    const user = await userdata.findOne({ email: email });
    if (!user) {
      return res.status(400).json({success:success , error: "Invalid login details" });
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      return res.status(400).json({success:success , error: "Invalid login deatils" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success:success , authtoken: authtoken});
  } catch (error) {
    res.json({success:success , error});
    console.error(error.message);
  }
});

//Route:3 Get loggedin user details using: POST "/api/auth/getuser" , loggedin required
router.post('/getuser',fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await userdata.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
