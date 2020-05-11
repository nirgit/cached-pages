import React from "react";
import DataSource from "../dataSource";

class Messages extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data
  }

  getMessages() {
    return this.props.data || []
  }

  componentDidMount() {
    if (this.getMessages().length === 0) {
      DataSource.getMessages().then(msgs => {
        this.props.store.set({type: "set_messages", messages: msgs})
      });
    }
  }

  handleMsgClick(e) {
    console.log("msg click", e.target.getAttribute('msgid'))
  }

  renderMessages() {
    if (this.getMessages().length === 0) {
      return <div>Fetching messages...</div>;
    }
    return (
      <ul>
        {this.getMessages().map(dataItem => {
          return (
            <li key={dataItem.id} msgid={dataItem.id} onClick={e => this.handleMsgClick(e)}>
              {dataItem.sender}: {dataItem.text}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    console.log("Rendering Messages")
    return (
      <div>
        <h2>Messages</h2>
        {this.renderMessages()}
      </div>
    );
  }
}

export default Messages;
