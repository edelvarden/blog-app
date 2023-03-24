import React from 'react';
import { shallow } from 'enzyme';
import ReactQuill from 'react-quill';
import FormRichEdit from 'components/FormRichEdit';

describe('FormRichEdit', () => {
  let wrapper;
  const value = 'test';
  const onChange = jest.fn();
  const placeholder = 'placeholder';

  beforeEach(() => {
    wrapper = shallow(<FormRichEdit value={value} onChange={onChange} placeholder={placeholder} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a ReactQuill component', () => {
    expect(wrapper.find(ReactQuill)).toHaveLength(1);
  });

  it('should pass the correct props to ReactQuill', () => {
    const reactQuillProps = wrapper.find(ReactQuill).props();
    expect(reactQuillProps.theme).toBe('snow');
    expect(reactQuillProps.value).toBe(value);
    expect(reactQuillProps.onChange).toBe(onChange);
    expect(reactQuillProps.modules.toolbar).toEqual([
      { header: '2' },
      { bold: true },
      { italic: true },
      { underline: true },
      { strike: true },
      { list: 'ordered' },
      { list: 'bullet' },
      { link: true },
      { 'code-block': true },
    ]);
    expect(reactQuillProps.placeholder).toBe(placeholder);
    expect(reactQuillProps.required).toBe(true);
  });
});