import { useState } from 'react';
import Form from '../Form';
import FormInput from "../FormInput";
import FormButton from "../FormButton";
import FormTextArea from "../FormTextArea";
import "./styles.scss";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email && message) {
      // TODO: Add form submission logic here
    }
  };

  const handleEmailChange = (value) => setEmail(value);
  const handleMessageChange = (value) => setMessage(value);

  return (
    <section className="contact">
      <div className='contact__container'>
        <h1 className="contact__title">Contact</h1>
        <Form onSubmit={handleFormSubmit}>
          <FormInput labelText="Email" inputId="email" value={email} onChange={handleEmailChange} required />
          <FormTextArea labelText="Message" value={message} onChange={handleMessageChange} />
          <FormButton text="Send" />
        </Form>
      </div>
    </section>
  );
};

export default ContactPage;
