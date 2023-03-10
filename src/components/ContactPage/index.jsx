import "./styles.scss";
const ContactPage = () => {
  return (
    <>
      <div className="contact__container">
        <h1 className="contact__title">Contact</h1>
        <p>Have any questions or comments? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.</p>
        <form className="contact__form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input className="form-input" type="text" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input className="form-input" type="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea className="form-textarea" id="message"></textarea>
        </div>
        <button className="form__submit" type="submit">Send</button>
      </form>
      </div>
    </>
  );
}

export default ContactPage;