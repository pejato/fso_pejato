import React, { useState } from 'react';

function Blog({ blog }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonText = isExpanded ? 'Hide' : 'View';
  const expandedContent = (
    <>
      <div>
        <a href={`//${blog.url}`} target="_blank" rel="noreferrer noopener">
          {blog.url}
        </a>
      </div>
      <div>
        Likes {blog.likes}
        <button>like</button>
      </div>
      <div>Uploaded by {blog.user.name}</div>
    </>
  );

  return (
    <div className="blog-entry">
      <b>
        {blog.title} by {blog.author}
      </b>
      <button
        className="expand-button"
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {buttonText}
      </button>
      {isExpanded && expandedContent}
    </div>
  );
}

export default Blog;
