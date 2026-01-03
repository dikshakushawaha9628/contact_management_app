import { useState, useMemo, useEffect } from 'react';
import './ContactList.css';

const ContactList = ({ contacts, loading, onDelete, onUpdate, editingContact }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [expandedMessages, setExpandedMessages] = useState(new Set());

  // Sync editingId with editingContact prop
  useEffect(() => {
    if (editingContact) {
      setEditingId(editingContact._id);
    } else {
      setEditingId(null);
    }
  }, [editingContact]);

  const toggleMessage = (contactId) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contactId)) {
        newSet.delete(contactId);
      } else {
        newSet.add(contactId);
      }
      return newSet;
    });
  };

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query) ||
      (contact.message && contact.message.toLowerCase().includes(query))
    );
  }, [contacts, searchQuery]);

  // Sort filtered contacts
  const sortedContacts = useMemo(() => {
    return [...filteredContacts].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [filteredContacts, sortBy]);

  const handleEdit = (contact) => {
    if (onUpdate) {
      onUpdate(contact);
    }
  };

  if (loading) {
    return <div className="loading">Loading contacts...</div>;
  }

  return (
    <div className="contact-list-container">
      <div className="contact-list-header">
        <div className="header-top">
          <h2>Contacts</h2>
          <span className="contact-count">{contacts.length}</span>
        </div>
        {contacts.length > 0 && (
          <div className="header-controls">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-search"
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        )}
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No contacts yet. Add your first contact above!</p>
        </div>
      ) : sortedContacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>No contacts found matching "{searchQuery}"</p>
          <button onClick={() => setSearchQuery('')} className="clear-search-btn">
            Clear Search
          </button>
        </div>
      ) : (
        <div className="contacts-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedContacts.map((contact) => (
                <tr key={contact._id} className={editingId === contact._id ? 'editing' : ''}>
                  <td>
                    <div className="contact-name">
                      <span className="name-avatar">{contact.name.charAt(0).toUpperCase()}</span>
                      {contact.name}
                    </div>
                  </td>
                  <td>
                    <a href={`mailto:${contact.email}`} className="email-link">
                      {contact.email}
                    </a>
                  </td>
                  <td>
                    <a href={`tel:${contact.phone}`} className="phone-link">
                      {contact.phone}
                    </a>
                  </td>
                  <td className="message-cell">
                    {contact.message ? (
                      <div className="message-container">
                        {expandedMessages.has(contact._id) ? (
                          <>
                            <div className="message-text-expanded">{contact.message}</div>
                            <button
                              onClick={() => toggleMessage(contact._id)}
                              className="message-toggle-btn"
                              title="Show less"
                            >
                              Show less
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="message-text">
                              {contact.message.length > 80 
                                ? `${contact.message.substring(0, 80)}...` 
                                : contact.message}
                            </div>
                            {contact.message.length > 80 && (
                              <button
                                onClick={() => toggleMessage(contact._id)}
                                className="message-toggle-btn"
                                title="Show more"
                              >
                                Show more
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <span className="no-message">-</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(contact)}
                        className="edit-btn"
                        title="Edit contact"
                        disabled={editingId === contact._id}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => onDelete(contact._id)}
                        className="delete-btn"
                        title="Delete contact"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactList;

