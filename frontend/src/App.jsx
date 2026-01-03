import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';
const API_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
console.log('API_URL:', API_URL);
function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/contacts`);
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const [editingContact, setEditingContact] = useState(null);

  const handleContactSubmit = async (contactData, contactId) => {
    try {
      // If contactId exists, it's an update
      if (contactId) {
        return await handleUpdateContact(contactId, contactData);
      }

      // Otherwise, it's a new contact
      const response = await fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        const newContact = await response.json();
        setContacts([newContact, ...contacts]);
        setSuccessMessage('Contact added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        return true;
      } else {
        const error = await response.json();
        // Return error object for form to handle
        if (response.status === 409) {
          // Duplicate error - show in email or phone field
          const errorMessage = error.message || 'This contact already exists';
          if (errorMessage.toLowerCase().includes('email')) {
            return { errors: { email: errorMessage } };
          } else if (errorMessage.toLowerCase().includes('phone')) {
            return { errors: { phone: errorMessage } };
          }
          return { errors: { email: errorMessage } };
        }
        // Other validation errors
        if (response.status === 400) {
          const errorMessage = error.message || 'Invalid input';
          if (errorMessage.toLowerCase().includes('email')) {
            return { errors: { email: errorMessage } };
          } else if (errorMessage.toLowerCase().includes('phone')) {
            return { errors: { phone: errorMessage } };
          }
        }
        throw new Error(error.message || 'Failed to add contact');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      alert(error.message || 'Failed to add contact. Please try again.');
      return false;
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  const handleUpdateContact = async (id, contactData) => {
    try {
      const response = await fetch(`${API_URL}/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        const updatedContact = await response.json();
        setContacts(contacts.map(contact => 
          contact._id === id ? updatedContact : contact
        ));
        setEditingContact(null); // Clear editing state
        setSuccessMessage('Contact updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        return true;
      } else {
        const error = await response.json();
        // Return error object for form to handle
        if (response.status === 409) {
          // Duplicate error - show in email or phone field
          const errorMessage = error.message || 'This contact already exists';
          if (errorMessage.toLowerCase().includes('email')) {
            return { errors: { email: errorMessage } };
          } else if (errorMessage.toLowerCase().includes('phone')) {
            return { errors: { phone: errorMessage } };
          }
          return { errors: { email: errorMessage } };
        }
        // Other validation errors
        if (response.status === 400) {
          const errorMessage = error.message || 'Invalid input';
          if (errorMessage.toLowerCase().includes('email')) {
            return { errors: { email: errorMessage } };
          } else if (errorMessage.toLowerCase().includes('phone')) {
            return { errors: { phone: errorMessage } };
          }
        }
        throw new Error(error.message || 'Failed to update contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert(error.message || 'Failed to update contact. Please try again.');
      return false;
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts(contacts.filter(contact => contact._id !== id));
        setSuccessMessage('Contact deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact. Please try again.');
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <span className="title-icon">📇</span>
              Contact Management
            </h1>
            <p className="app-subtitle">Manage your contacts efficiently</p>
          </div>
        </header>
        
        {successMessage && (
          <div className="success-message">
            <span className="success-icon">✓</span>
            {successMessage}
          </div>
        )}

        <ContactForm 
          onSubmit={handleContactSubmit} 
          editContact={editingContact}
          onCancel={handleCancelEdit}
        />
        
        <ContactList 
          contacts={contacts} 
          loading={loading}
          onDelete={handleDeleteContact}
          onUpdate={handleEditContact}
          editingContact={editingContact}
        />
      </div>
    </div>
  );
}

export default App;

