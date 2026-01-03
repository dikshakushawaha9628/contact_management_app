// import mongoose from 'mongoose';

// const contactSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     trim: true,
//     lowercase: true,
//     match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
//   },
//   phone: {
//     type: String,
//     required: [true, 'Phone is required'],
//     trim: true,
//     validate: {
//       validator: function(v) {
//         // Remove all non-digit characters and check length
//         const digitsOnly = v.replace(/\D/g, '');
//         return digitsOnly.length >= 10;
//       },
//       message: 'Phone number must contain at least 10 digits'
//     }
//   },
//   message: {
//     type: String,
//     trim: true,
//     default: ''
//   }
// }, {
//   timestamps: true
// });

// const Contact = mongoose.model('Contact', contactSchema);

// export default Contact;

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      validate: {
        validator: function (v) {
          const digitsOnly = v.replace(/\D/g, '');
          return digitsOnly.length >= 10;
        },
        message: 'Phone number must contain at least 10 digits'
      }
    },
    message: {
      type: String,
      trim: true,
      default: ''
    }
  },
  { timestamps: true }
);

/**
 * 🔐 Ensure (email + phone) is unique
 */
contactSchema.index({ email: 1, phone: 1 }, { unique: true });

/**
 * Normalize phone before save
 */
contactSchema.pre('save', function (next) {
  this.phone = this.phone.replace(/\D/g, '');
  next();
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;