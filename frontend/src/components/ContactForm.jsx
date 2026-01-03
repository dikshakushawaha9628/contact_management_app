import { useState, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = ({ onSubmit, editContact, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editContact) {
      setFormData({
        name: editContact.name || '',
        email: editContact.email || '',
        phone: editContact.phone || '',
        message: editContact.message || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }
    setErrors({});
  }, [editContact]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if it has at least 10 digits
    return digitsOnly.length >= 10;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else {
      // Check if phone contains alphabets
      if (/[a-zA-Z]/.test(formData.phone)) {
        newErrors.phone = 'Phone number cannot contain letters';
      } else {
        // Remove non-digits and check length
        const digitsOnly = formData.phone.replace(/\D/g, '');
        if (digitsOnly.length!==10 ) {
          newErrors.phone = 'Phone number must contain at least 10 digits';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone field, allow only numbers and common phone characters
    let processedValue = value;
    if (name === 'phone') {
      // Allow digits, spaces, hyphens, parentheses, and plus sign
      processedValue = value.replace(/[^\d\s\-()+]/, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit(formData, editContact?._id);
    
    if (result === true) {
      // Success - reset form
      if (!editContact) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }
      setErrors({});
      if (onCancel) onCancel();
    } else if (typeof result === 'object' && result.errors) {
      // Backend validation errors
      setErrors(result.errors);
    }
    
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  const isFormValid = formData.name.trim() && 
                      formData.email.trim() && 
                      validateEmail(formData.email) && 
                      formData.phone.trim() &&
                      validatePhone(formData.phone);

  return (
    <div className="contact-form-container">
      <div className="form-header">
        <h2>{editContact ? 'Edit Contact' : 'Add New Contact'}</h2>
        {editContact && (
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., John@gmail.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., 1234567890 or (123) 456-7890"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
          {!errors.phone && formData.phone && (
            <span className="phone-hint">Minimum 10 digits required</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="e.g., Hi!"
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                {editContact ? 'Updating...' : 'Submitting...'}
              </>
            ) : (
              <>
                {editContact ? 'Update Contact' : 'Add Contact'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

