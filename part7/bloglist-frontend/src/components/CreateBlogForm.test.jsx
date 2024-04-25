// TODO: Update this test to work with notification reducer
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, test, vi } from 'vitest';
import CreateBlogForm from './CreateBlogForm';
import { renderWithProviders } from '../../testSetup';

describe('CreateBlogForm', () => {
  test('creates blog on submit', async () => {
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
    const adapter = new MockAdapter(axios);
    adapter.onPost('/api/blogs', blog).reply(201, responseBlog);

    const onCreated = vi.fn();
    renderWithProviders(<CreateBlogForm onCreatedBlog={onCreated} />);

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

    expect(onCreated.mock.calls).toHaveLength(1);
    expect(onCreated.mock.calls[0][0]).toStrictEqual(responseBlog);
  });
});
