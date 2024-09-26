import React from 'react';
import FormFactory from './FormFactory';
import CustomDatePicker from './DatePicker';

const App = () => {
  const formConfigs = [
    {
      title: 'Personal Information',
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          validation: { required: 'First name is required' }
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          validation: { required: 'Last name is required' }
        },
        {
          name: 'gender',
          label: 'Gender',
          type: 'select',
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ],
          validation: { required: 'Gender is required' }
        },
        {
          name: 'birthdate',
          label: 'Birthdate',
          type: 'custom',
          component: CustomDatePicker,
          validation: { required: 'Birthdate is required' }
        }
      ]
    },
    {
      title: 'Account Information',
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          validation: {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format'
            }
          }
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          validation: { required: 'Password is required' }
        }
      ]
    }
  ];

  const handleSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <div>
      <h1>Form factory test</h1>
      <FormFactory formConfigs={formConfigs} onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
