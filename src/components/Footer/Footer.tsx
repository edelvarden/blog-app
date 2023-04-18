import { FC } from "react"
import "./Footer.scss"
import { Container } from "react-bootstrap"

const currentYear = new Date().getFullYear()

const Footer: FC = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <p className="footer__copy">&copy; {currentYear} Blog. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
