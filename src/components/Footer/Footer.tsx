import { FC } from "react"
import "./Footer.scss"
import { Container } from "react-bootstrap"

interface IFooterProps {}

const Footer: FC<IFooterProps> = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <p className="footer__copy">&copy; {currentYear} My Blog. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer