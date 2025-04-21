import React from 'react';
import ReactDOM from 'react-dom/client';

class BasicForm extends React.Component {
  static displayName = "basic-input";
  state = { 
    names: [], 
    name: '',
    email: '',
    phone: '',
    errors: {
      name: '',
      email: '',
      phone: ''
    }
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone number is required';
        else if (!/^\d{10}$/.test(value)) error = 'Phone number must be 10 digits';
        break;
      default:
        break;
    }

    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [fieldName]: error
      }
    }));
  };

  validateForm = () => { 
    const { name, email, phone } = this.state;
    this.validateField('name', name);
    this.validateField('email', email);
    this.validateField('phone', phone);

    return Object.values(this.state.errors).every(error => error === '') &&
           name && email && phone;
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();

    if (this.validateForm()) {
      const { name, email, phone } = this.state;
      const entry = { name, email, phone };
      const names = [...this.state.names, entry];

      this.setState({
        names,
        name: '',
        email: '',
        phone: '',
        errors: {
          name: '',
          email: '',
          phone: ''
        }
      });
    }
  };

  render() {
    const { name, email, phone, errors, names } = this.state;
    return (
      <div style={{ 
        maxWidth: '500px', 
        margin: '0 auto', 
        padding: '20px' 
        }}>
        <h1 style={{ textAlign: 'center' }}>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div>
            <input
              name='name'
              placeholder='Name'
              value={name}
              onChange={this.handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
            {errors.name && <div style={{ color: 'red', fontSize: '0.8em' }}>{errors.name}</div>}
          </div>

          <div>
            <input
              name='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={this.handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
            {errors.email && <div style={{ color: 'red', fontSize: '0.8em' }}>{errors.email}</div>}
          </div>

          <div>
            <input
              name='phone'
              type='tel'
              placeholder='Phone Number'
              value={phone}
              onChange={this.handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
            {errors.phone && <div style={{ color: 'red', fontSize: '0.8em' }}>{errors.phone}</div>}
          </div>

          <button 
            type='submit'
            style={{
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </form>

        <div>
          <h3 style={{ 
            borderBottom: '1px solid #eee', 
            paddingBottom: '5px' }}>
            Entries
          </h3>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {names.map((entry, i) => (
              <li key={i} style={{ 
                padding: '10px 0', 
                borderBottom: '1px solid #eee'
              }}>
                <div><strong>Name:</strong> {entry.name}</div>
                <div><strong>Email:</strong> {entry.email}</div>
                <div><strong>Phone:</strong> {entry.phone}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BasicForm />);

export default BasicForm;