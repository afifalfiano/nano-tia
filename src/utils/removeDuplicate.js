function removeDuplicate(posts = []) {
  const uniqueData = new Set(); // Use Set to keep track of unique device ids
  const filterData = [];

  for (const post of posts) {
      if (!uniqueData.has(post?.id)) {
          uniqueData.add(post?.id);
          filterData.push(post);
      }
  }

  return filterData;
}


export default removeDuplicate;