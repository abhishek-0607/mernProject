const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    profilePicture: { type: String },
    firstname: { type: String, required: true, min: 3, max: 20, trim: true },
    lastname: { type: String, required: true, min: 3, max: 20, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //const hash = bcrypt.hashSync(this.password,10);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      return next();
    });
  });
});

userSchema.methods.checkPassword = async function (password) {
  // return new Promise((resolve, reject) => {
  //   bcrypt.compare(password, this.password, function (err, same) {
  //     // res === true
  //     if (err) {
  //       return reject(err);
  //     }
  //     resolve(same);
  //   });
  // });

  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);
module.exports = User;
