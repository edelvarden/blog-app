import "./styles.scss";

const ContactPage = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    //TODO: Add form validation and submission logic here
  };

  return (
    <section className="contact">
      <h1 className="contact__title">Contact</h1>
      <p>
        Have any questions or comments? We&apos;d love to hear from you! Fill
        out the form below and we&apos;ll get back to you as soon as possible.
      </p>

      <form className="contact__form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input className="form-input" type="text" id="name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="form-input"
            type="email"
            id="email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            className="form-textarea"
            id="message"
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
