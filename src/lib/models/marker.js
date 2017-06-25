export default (id, name, position, upvote, downvote, comment) => {
  return {
    id,
    name,
    position,
    key: id,
    defaultAnimation: 2,
    upvote,
    downvote,
    comment,
  }
}