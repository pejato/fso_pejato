// TODO: Update this test to work with notification reducer
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { expect, describe, test, vi, beforeAll } from 'vitest';
import { HttpResponse, http } from 'msw';
import CreateBlogForm from './CreateBlogForm';
import { renderWithProviders, server } from '../../testSetup';
import store from '../store';

describe('CreateBlogForm', () => {
  beforeAll(() => {
    const blog = {
      title: 'My title!',
      author: 'Cornelius Fudge',
      url: 'Hermione Granger',
    };
    const responseBlog = {
      ...blog,
      id: 'some id',
      user: {
        name: 'arry',
        username: 'potter',
        id: 'some user id',
      },
    };
    server.use(
      http.post('/api/blogs', async () => HttpResponse.json(responseBlog)),
    );
  });

  test('creates blog on submit', async () => {
    const onCreated = vi.fn();
    renderWithProviders(<CreateBlogForm onCreatedBlog={onCreated} />, {
      store,
    });

    const titleDiv = screen.getByText('Title:');
    const titleInput = within(titleDiv).getByRole('textbox');

    const authorDiv = screen.getByText('Author:');
    const authorInput = within(authorDiv).getByRole('textbox');

    const urlDiv = screen.getByText('URL:');
    const urlInput = within(urlDiv).getByRole('textbox');

    const user = userEvent.setup();
    await user.type(titleInput, 'My title!');
    await user.type(authorInput, 'Cornelius Fudge');
    await user.type(urlInput, 'Hermione Granger');

    const submitButton = screen.getByText('Create');
    await user.click(submitButton);

    await waitFor(() => expect(onCreated.mock.calls).toHaveLength(1));
  });
});
