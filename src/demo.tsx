import React from 'react';
import { render } from 'react-dom';
import { ShelfEditor } from './index';

interface IState {
  value: any;
}

const initialValue = [
  {
    type: 'title',
    children: [
      { text: 'Title' }
    ]
  },
  {
    type: 'bulleted-list',
    children: [
      { type: 'list-item', children: [{text: 'first item'}]}
    ]
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text "
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:'
      }
    ]
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }]
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }]
  },
  {
    type: 'check-list-item',
    checked: true,
    children: [{ text: 'Check list item example'}]
  }
];

class Demo extends React.Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      value: initialValue
    };
  }

  render() {
    const { value } = this.state;
    
    return (
      <div style={{ width: '800px', margin: '200px auto' }}>
        <ShelfEditor value={value} onChange={this.handleChange} onTitleChange={this.handleTitleChange} />
      </div>
    );
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  handleTitleChange = (title: string) => {
    console.log('Title:', title)
  }
}

render(<Demo />, document.getElementById('root'));
