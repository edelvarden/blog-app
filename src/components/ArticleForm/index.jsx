import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import FormRichEdit from "components/FormRichEdit";
import React from 'react';
import ModalWindow from "components/ModalWindow";

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postTitle: '',
      postExcerpt: '',
      postContent: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleExcerptChange = this.handleExcerptChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
    // If an existing post was passed in as props, update state with its details
    const { post } = this.props;
    if (post) {
      this.setState({
        postTitle: post.title,
        postExcerpt: post.excerpt,
        postContent: post.content
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { postTitle, postExcerpt, postContent } = this.state;
    const { onSubmit } = this.props;

    // Pass the form data to the onSubmit function
    onSubmit({
      title: postTitle,
      excerpt: postExcerpt,
      content: postContent
    });
  }

  handleTitleChange(e) {
    this.setState({ postTitle: e.target.value });
  }

  handleExcerptChange(e) {
    this.setState({ postExcerpt: e.target.value });
  }

  handleContentChange(value) {
    this.setState({ postContent: value });
  }

  render() {
    const { postTitle, postExcerpt, postContent } = this.state;
    const { isOpen, onClose, title, submitLabel } = this.props;

    return (
      <ModalWindow isOpen={isOpen} onClose={onClose} title={title} submitLabel={submitLabel} onSubmit={this.handleSubmit}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input id="postTitle" type='text' value={postTitle}
            onChange={this.handleTitleChange} required />
          <FormLabel>Excerpt</FormLabel>
          <Input id="postExcerpt" type='text' value={postExcerpt}
            onChange={this.handleExcerptChange} required />
          <FormLabel>Content</FormLabel>
          <FormRichEdit value={postContent} onChange={this.handleContentChange} />

        </FormControl>
      </ModalWindow>

    );
  }
}

export default ArticleForm;
