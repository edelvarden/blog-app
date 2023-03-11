import { useState } from 'react';
import "./styles.scss";

const Label = ({ text }) => <label className="form__label">{text}</label>;

const Input = ({ id, value, onChange, required }) => (
  <input
    className="form__input"
    type="text"
    id={id}
    value={value}
    onChange={onChange}
    required={required}
    autoComplete="off"
  />
);

const TextareaButtons = () => <div className="form__textarea-buttons"></div>;

const SubmitButton = ({ text }) => (
  <button className="form__submit" type="submit">
    {text}
  </button>
);

const Form = ({ onSubmit, children }) => <form className="form" onSubmit={onSubmit}>{children}</form>;

const InputField = ({ labelText, inputId, value, onChange, required = false }) => (
  <>
    <Label text={labelText} />
    <Input id={inputId} value={value} onChange={e => onChange(e.target.value)} required={required} />
  </>
);

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      // TODO: Add form submission logic here
    }
  };

  const TextareaField = ({ labelText, value, onChange }) => (
    <>
      <Label text={labelText} />
      <div>
        <textarea className='form__textarea' />
      </div>
    </>
  );

  return (
    <section className="contact">
      <div className='contact__container'>
        <h1 className="contact__title">Contact</h1>
        <p>
          Have any questions or comments? We'd love to hear from you! Fill out the
          form below and we'll get back to you as soon as possible.
        </p>

        <Form onSubmit={handleFormSubmit}>
          <InputField labelText="Name:" inputId="name" value={name} onChange={setName} required />
          <InputField labelText="Email:" inputId="email" value={email} onChange={setEmail} required />
          <TextareaField labelText="Message:" value={message} onChange={setMessage} />
          <TextareaButtons />
          <SubmitButton text="Send" />
        </Form>
      </div>
    </section>
  );
};

export default ContactPage;
