// import express from 'express';
// import Contact from '../models/Contact.js';

// const router = express.Router();

// // GET all contacts
// router.get('/', async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.json(contacts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // POST create new contact
// router.post('/', async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     // Validation
//     if (!name || !email || !phone) {
//       return res.status(400).json({ message: 'Name, email, and phone are required' });
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: 'Please enter a valid email address' });
//     }

//     // Phone validation - remove non-digits and check length
//     const phoneDigits = phone.replace(/\D/g, '');
//     if (phoneDigits.length < 10) {
//       return res.status(400).json({ message: 'Phone number must contain at least 10 digits' });
//     }

//     // Check for duplicate email
//     const existingEmail = await Contact.findOne({ email: email.toLowerCase() });
//     // if (existingEmail) {
//     //   return res.status(409).json({ message: 'A contact with this email already exists' });
//     // }

//     // Check for duplicate phone
//     const existingPhone = await Contact.findOne({ phone: phone.trim() });
//     if (existingPhone && existingEmail) {
//       return res.status(409).json({ message: 'A contact with this phone number and email already exists' });
//     }

//     const contact = new Contact({
//       name,
//       email,
//       phone,
//       message: message || ''
//     });

//     const savedContact = await contact.save();
//     res.status(201).json(savedContact);
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ message: error.message });
//     }
//     // if (error.code === 11000) {
//     //   // MongoDB duplicate key error
//     //   const field = Object.keys(error.keyPattern)[0];
//     //   return res.status(409).json({ 
//     //     message: `A contact with this ${field} already exists` 
//     //   });
//     // }
//     res.status(500).json({ message: error.message });
//   }
// });

// // PUT update contact by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     // Validation
//     if (!name || !email || !phone) {
//       return res.status(400).json({ message: 'Name, email, and phone are required' });
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ message: 'Please enter a valid email address' });
//     }

//     // Phone validation - remove non-digits and check length
//     const phoneDigits = phone.replace(/\D/g, '');
//     if (phoneDigits.length < 10) {
//       return res.status(400).json({ message: 'Phone number must contain at least 10 digits' });
//     }

//     // Check for duplicate email (excluding current contact)
//     const existingEmail = await Contact.findOne({ 
//       email: email.toLowerCase(),
//       _id: { $ne: req.params.id }
//     });
//     // if (existingEmail) {
//     //   return res.status(409).json({ message: 'A contact with this email already exists' });
//     // }

//     // Check for duplicate phone (excluding current contact)
//     const existingPhone = await Contact.findOne({ 
//       phone: phone.trim(),
//       _id: { $ne: req.params.id }
//     });
//     if (existingPhone && existingEmail) {
//       return res.status(409).json({ message: 'A contact with this phone number already exists' });
//     }

//     const contact = await Contact.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         email,
//         phone,
//         message: message || ''
//       },
//       { new: true, runValidators: true }
//     );

//     if (!contact) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }

//     res.json(contact);
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({ message: error.message });
//     }
//     // if (error.code === 11000) {
//     //   // MongoDB duplicate key error
//     //   const field = Object.keys(error.keyPattern)[0];
//     //   return res.status(409).json({ 
//     //     message: `A contact with this ${field} already exists` 
//     //   });
//     // }
//     res.status(500).json({ message: error.message });
//   }
// });

// // DELETE contact by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const contact = await Contact.findByIdAndDelete(req.params.id);
//     if (!contact) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }
//     res.json({ message: 'Contact deleted successfully', contact });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;

import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

/**
 * GET all contacts
 */
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * CREATE contact
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: 'Name, email and phone are required'
      });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      message
    });

    const saved = await contact.save();
    console.log(saved);
    res.status(201).json(saved);

  } catch (error) {
    //  Duplicate email + phone
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'This email and phone combination already exists'
      });
    }

    res.status(500).json({ message: error.message });
  }
});

/**
 * UPDATE contact
 */
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: 'Name, email, and phone are required'
      });
    }

    const normalizedEmail = email.toLowerCase();
    const normalizedPhone = phone.replace(/\D/g, '');

    //  Check duplicate (email + phone) excluding self
    const existingContact = await Contact.findOne({
      email: normalizedEmail,
      phone: normalizedPhone,
      _id: { $ne: req.params.id }
    });

    if (existingContact) {
      return res.status(409).json({
        message: 'A contact with this email and phone already exists'
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email: normalizedEmail,
        phone: normalizedPhone,
        message
      },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Duplicate email and phone combination'
      });
    }
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE contact
 */
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;