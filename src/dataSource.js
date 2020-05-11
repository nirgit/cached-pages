/**
 * A module simulating a data source facade
 */

const SIMULATED_TIMEOUT = 1500;

const createRandomMessages = () => {
  return Array(10)
    .fill(1)
    .map((_, idx) => createRandomMessage(idx));
};

const createRandomMessage = id => {
  return {
    id,
    sender: "Cozmo Cramer",
    text: "Hey buddy"
  };
};

const createRandomPosts = () => {
  return Array(15)
    .fill(1)
    .map((_, idx) => createRandomPost(idx));
};

const createRandomPost = id => {
  return {
    id,
    text:
      "This is a post with a random number - " +
      Math.ceil(Math.random() * 1000),
    author: "Joan"
  };
};

const DataSource = {
  getPosts() {
    return new Promise(res => {
      setTimeout(() => {
        res(createRandomPosts());
      }, SIMULATED_TIMEOUT);
    });
  },

  getMessages() {
    return new Promise(res => {
      setTimeout(() => {
        res(createRandomMessages());
      }, SIMULATED_TIMEOUT);
    });
  }
};

export default DataSource;
