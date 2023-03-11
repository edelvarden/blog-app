import { useState } from 'react';
import "./styles.scss";

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
      <h1 className="contact__title">Contact</h1>
      <p>
        Have any questions or comments? We'd love to hear from you! Fill out the
        form below and we'll get back to you as soon as possible.
      </p>

      <form className="contact__form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            className="form-input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="form-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            className="form-textarea"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            minLength={10}
          ></textarea>
        </div>

        <button className="form__submit" type="submit">
          Send
        </button>
      </form>
    </section>
  );
};

export default ContactPage;
