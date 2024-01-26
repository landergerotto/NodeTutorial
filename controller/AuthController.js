const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const CryptoJS = require("crypto-js");

class AuthController {
  static async register(req, res) {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      await user.save();
      res.status(201).send({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      return res.status(500).send({ message: "Something failed" });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ message: "Invalid Email" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ message: "Invalid password" });

    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
        // adm true or nao
      },
      secret,
      {
        expiresIn: "2 days",
      }
    );

    /* JWT SERVICE VERIFY SIGNATURE */
    // try {
    //     var decoded = jwt.verify(token, 'elp');
    //     console.log(decoded.id) // string bizarra
    // } catch (error) {
    //     return res.status(200).send({ message: 'Ta me tirando menó?' })
    // }

    return res.status(200).send({ token: token });
  }

  static async registerCrypto(req, res) {
    const { encrypted } = req.body;

    var bytes = CryptoJS.AES.decrypt(encrypted, "a key mais secreta do mundo");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    console.log(decryptedData);
    const { name, email, password } = decryptedData;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      await user.save();
      res.status(201).send({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      return res.status(500).send({ message: "Something failed" });
    }
  }
  static async loginCrypto(req, res) {

    const { encrypted } = req.body;

    var bytes = CryptoJS.AES.decrypt(encrypted, "a key mais secreta do mundo");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
    const { email, password } = decryptedData;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ message: "Invalid Email" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ message: "Invalid password" });

    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
        // adm true or nao
      },
      secret,
      {
        expiresIn: "2 days",
      }
    );

    /* JWT SERVICE VERIFY SIGNATURE */
    // try {
    //     var decoded = jwt.verify(token, 'elp');
    //     console.log(decoded.id) // string bizarra
    // } catch (error) {
    //     return res.status(200).send({ message: 'Ta me tirando menó?' })
    // }

    return res.status(200).send({ token: token });
  }
}
module.exports = AuthController;
