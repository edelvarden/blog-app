import { useState } from 'react';
import Form from 'components/Form';
import FormLabel from "components/FormLabel";
import FormInput from "components/FormInput";
import FormButton from "components/FormButton";
import FormTextArea from "components/FormTextArea";
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
          <FormLabel>Email</FormLabel>
          <FormInput labelText="Email" inputId="email" value={email} onChange={handleEmailChange} required />
          <FormLabel>Message</FormLabel>
          <FormTextArea value={message} onChange={handleMessageChange} />
          <FormButton text="Send" />
        </Form>
      </div>
    </section>
  );
};

export default ContactPage;
