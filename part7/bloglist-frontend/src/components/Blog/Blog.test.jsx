import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, test, expect } from 'vitest';
import Blog from './Blog';
import { renderWithProviders } from '../../../testSetup';

describe('Blog', () => {
  test('renders only title and author when not expanded', async () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'blog url',
      likes: 50,
      user: {
        username: 'some username',
        name: 'some name',
        id: 'some id',
      },
    };
    renderWithProviders(
      <Blog
        currentUser={blog.user}
        blog={blog}
        onLike={() => {}}
        onDeleted={() => {}}
      />,
    );
    screen.getByText('blog title');
    screen.getByText('blog author', { exact: false });
    expect(screen.queryByText('blog url')).toBeNull();
    expect(screen.queryByText('Likes 50')).toBeNull();
    expect(screen.queryByText('Uploaded by some name')).toBeNull();
  });
  test('renders title and author when not expanded', async () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'blog url',
      likes: 50,
      user: {
        username: 'some username',
        name: 'some name',
        id: 'some id',
      },
    };
    const { container } = renderWithProviders(
      <Blog
        currentUser={blog.user}
        blog={blog}
        onLike={() => {}}
        onDeleted={() => {}}
      />,
    );
    screen.getByText('blog title');
    screen.getByText('blog author', { exact: false });
    const user = userEvent.setup();
    const button = container.querySelector('.expand-button');
    await user.click(button);
    screen.getByText('blog url');
    screen.getByText('Likes 50');
    screen.getByText('Uploaded by some name');
  });
  test('when like button is clicked calls onLike handler', async () => {
    // TODO: Fix this test
    // const blog = {
    //   title: 'blog title',
    //   author: 'blog author',
    //   url: 'blog url',
    //   likes: 0,
    //   user: {
    //     username: 'some username',
    //     name: 'some name',
    //     id: 'someid',
    //   },
    // };
    // let likes = 0;
    // server.use(
    //   http.patch('/api/blogs/someid', async () => {
    //     likes += 1;
    //     return HttpResponse.json({ ...blog, likes });
    //   }),
    // );
    // const { container } = renderWithProviders(
    //   <Blog currentUser={blog.user} blog={blog} onDeleted={() => {}} />,
    // );
    // const user = userEvent.setup();
    // const button = container.querySelector('.expand-button');
    // await user.click(button);
    // const likeButton = screen.getByText('like');
    // await waitFor(async () => user.click(likeButton));
    // expect(screen.getByText('Likes 1')).toBeVisible();
    // await waitFor(async () => user.click(likeButton));
    // expect(screen.getByText('Likes 2')).toBeVisible();
  });
});
