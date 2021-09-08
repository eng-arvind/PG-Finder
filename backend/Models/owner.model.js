const mongoose = require("mongoose");
const crypto = require("crypto");

const OwnerSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  resetPasswordLink: {
    data: String,
    default: "",
  },
});

OwnerSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
OwnerSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return (
        crypto
          // Creates a Hmac(Hashed based message authentication code) object using the specified algorithm and key
          .createHmac("sha1", this.salt)
          .update(password)
          .digest("hex")
      );
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

const Owner = mongoose.model("Owner", OwnerSchema);
module.exports = Owner;
