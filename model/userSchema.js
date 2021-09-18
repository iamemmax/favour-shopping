const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

  role: {
    type: String,
    enum: ["member", "Admin"],
    default: "member",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hashing user password before submitting to database
userSchema.pre("save", function (next) {
  if(!this.isModified('password')) return next

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) return next(err);
                this.password = hash;
                next()
            });
        });

//   compare user password
        userSchema.methods.comparePassword = function(password, cb){
        bcrypt.compare(password, this.password, (err, isMatch)=>{
            if(err)return next(err)
            else
                if(!isMatch)
                    return next(err)
                return cb(null, this)
            

        })
    }
});

const user = mongoose.model("users", userSchema);
// exporting Schema
module.exports = user;
