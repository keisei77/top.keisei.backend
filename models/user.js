const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3
    },
    phone: {
      type: Number,
      unique: true
    },
    hashed_password: {
      type: String
    },
    avatar: {
      type: String
    },
    geoLocation: {
      type: Object
    },
    favorite: {
      type: Array
    },
    userAgent: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    toJSON: {
      transform (doc, ret) {
        delete ret.hashed_password
      }
    }
  }
)

userSchema.virtual('password')
  .set(function setPassword (value) {
    this._password = value
  })
  .get(function getPassword () {
    return this._password
  })

userSchema.pre('save', async function preSave (next) {
  if (!this.password) return next()
  try {
    let hashed = await new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
        resolve(hash)
        })
      })
    })
    // Store hash in your password DB.    
    this.hashed_password = hashed
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = mongoose.model('User', userSchema)