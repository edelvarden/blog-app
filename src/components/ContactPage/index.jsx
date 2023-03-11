import { useState } from 'react';
import "./styles.scss";
import Form from '../Form';
import FormInput from "../FormInput";
import FormSubmit from "../FormSubmit";
import FormTextArea from "../FormTextArea";

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

  return (
    <section className="contact">
      <div className='contact__container'>
        <h1 className="contact__title">Contact</h1>
        <Form onSubmit={handleFormSubmit}>
          <FormInput labelText="Email" inputId="email" value={email} onChange={setEmail} required />
          <FormTextArea labelText="Message:" value={message} onChange={setMessage} />
          <FormSubmit text="Send" />
        </Form>
      </div>
    </section>
  );
};

export default ContactPage;
