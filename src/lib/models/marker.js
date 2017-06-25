export default (id, name, position, upvote, downvote) => {
  return {
    id,
    name,
    position,
    key: id,
    defaultAnimation: 2,
    upvote,
    downvote
  }
}