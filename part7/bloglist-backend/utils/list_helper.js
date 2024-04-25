const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0);

const favoriteBlog = (blogs) => {
  let favorite = null;
  for (let i = 0; i < blogs.length; i += 1) {
    const blog = blogs[i];
    if (!favorite || favorite.likes < blog.likes) {
      favorite = blog;
    }
  }
  return favorite;
};

const mostBy = (elements, keyForElt, valueForElt) => {
  if (elements.length === 0) {
    return null;
  }
  const eltToCounts = new Map();
  let maxEltSoFar = null;

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    const newCount =
      (eltToCounts.get(keyForElt(element)) || 0) + valueForElt(element);
    eltToCounts.set(keyForElt(element), newCount);
    if (!maxEltSoFar || eltToCounts.get(keyForElt(maxEltSoFar)) < newCount) {
      maxEltSoFar = element;
    }
  }

  return {
    element: keyForElt(maxEltSoFar),
    count: eltToCounts.get(keyForElt(maxEltSoFar)),
  };
};

const mostBlogs = (blogs) => {
  const result = mostBy(
    blogs,
    (blog) => blog.author,
    () => 1,
  );
  if (!result) {
    return null;
  }

  return {
    author: result.element,
    blogs: result.count,
  };
};

const mostLikes = (blogs) => {
  const result = mostBy(
    blogs,
    (blog) => blog.author,
    (blog) => blog.likes,
  );
  if (!result) {
    return null;
  }

  return {
    author: result.element,
    likes: result.count,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
