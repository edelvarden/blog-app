import Heading from "@/components/common/Heading"
import ReactDOMServer from "react-dom/server"

const renderJsx = (element) => {
  return ReactDOMServer.renderToStaticMarkup(element)
}

const parseHtml = (html: string) => {
  const domParser = new DOMParser()
  const parsed = domParser.parseFromString(html, "text/html")
  const body = parsed.body

  // Replace HTML tags with components
  body.childNodes.forEach((node) => {
    switch (node.nodeName) {
      case "H1":
        node.replaceWith(renderJsx(<Heading level={1}>{node.textContent}</Heading>))
        break
      case "H2":
        node.replaceWith(renderJsx(<Heading level={2}>{node.textContent}</Heading>))
        break
      case "H3":
        node.replaceWith(renderJsx(<Heading level={3}>{node.textContent}</Heading>))
        break
      default:
        break
    }
  })

  return body.innerHTML
}

export default parseHtml
