import React, { Component } from "react";
import DataSource from "../dataSource";

class Posts extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data
  }

  getPosts() {
    return this.props.data || []
  }

  handlePostClick(e) {
    console.log(e);
  }

  componentDidMount() {
    if (this.getPosts().length === 0) {
      DataSource.getPosts().then(posts => {
        this.props.store.set({type: "set_posts", posts})
      });
    }
  }

  renderPosts() {
    if (this.getPosts().length === 0) return <div>Loading posts...</div>;

    return (
      <ul onClick={e => this.handlePostClick(e)}>
        {this.getPosts().map(post => (
          <li key={post.id} postid={post.id}>
            {post.text}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    console.log("Rendering Posts")
    return (
      <div>
        <h2>Posts</h2>
        {this.renderPosts()}
      </div>
    );
  }
}

export default Posts;
