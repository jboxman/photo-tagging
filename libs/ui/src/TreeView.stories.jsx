import React from 'react';
import { Provider, useDispatch } from 'react-redux';

import configureAppStore from './store';
import * as api from './mocks/tags/tagApi';
import { loadTags } from './store/tagActions';

import TagModalLayout from './features/tags/TagModalLayout';

// fa-plus-circle
// fa-minus
// fa-plus

const store = configureAppStore({ api });

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  dispatch(loadTags());
  return <>{children}</>;
};

// TODO - Storybook severely lags rendering of the tree list.
// This doesn't happen outside of Storybook.
const Template = (args) => <TagModalLayout {...args} />;

export default {
  title: 'Tag Manager',
  component: Template,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (story) => (
      <Provider store={store}>
        <Wrapper>{story()}</Wrapper>
      </Provider>
    ),
  ],
};

export const Me = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Me.args = {
  primary: true,
};
Me.storyName = 'Default';
