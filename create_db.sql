CREATE TABLE posts (
  postId INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  topic VARCHAR(255),
  message VARCHAR(1000),
  postDate DATE
);

CREATE TABLE postComment (
  commentId INT AUTO_INCREMENT PRIMARY KEY, 
  postId INT, 
  message VARCHAR(255),
  username VARCHAR(255),
  commentDate DATE,
)