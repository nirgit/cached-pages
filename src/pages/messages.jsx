import React from "react";
import DataSource from "../dataSource";

class Messages extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    DataSource.getMessages().then(msgs => {
      this.setState({ messages: msgs });
    });
  }

  renderMessages() {
    if (this.state.messages.length === 0) {
      return <div>Fetching messages...</div>;
    }
    return (
      <ul>
        {this.state.messages.map(dataItem => {
          return (
            <li>
              {dataItem.sender}: {dataItem.text}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h2>Messages</h2>
        {this.renderMessages()}
      </div>
    );
  }
}

export default Messages;
