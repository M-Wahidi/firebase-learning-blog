function sortComments(a, b) {
  if (new Date(a.createdAt.seconds * 1000) < new Date(b.createdAt.seconds * 1000)) {
    return 1;
  } else if (new Date(a.createdAt.seconds * 1000) > new Date(b.createdAt.seconds * 1000)) {
    return -1;
  } else {
    return 0;
  }
}

export default sortComments;
