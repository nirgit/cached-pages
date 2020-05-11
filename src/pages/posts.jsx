import React, { Component } from "react";
import DataSource from "../dataSource";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  handlePostClick(e) {
    console.log(e);
  }

  componentDidMount() {
    DataSource.getPosts().then(posts => {
      this.setState({ posts: posts });
    });
  }

  renderPosts() {
    if (this.state.posts.length === 0) return <div>Loading posts...</div>;

    return (
      <ul onClick={e => this.handlePostClick(e)}>
        {this.state.posts.map(post => (
          <li key={post.id} postid={post.id}>
            {post.text}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        {this.renderPosts()}
      </div>
    );
  }
}

export default Posts;
