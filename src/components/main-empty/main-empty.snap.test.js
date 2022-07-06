import React from 'react';
import {render} from '@testing-library/react';
import MainScreenEmpty from './main-empty';

test(`Should MainScreenEmpty render correctly`, () => {
  const {container} = render(<MainScreenEmpty selectedCity='Paris' />);
  expect(container).toMatchSnapshot();
});
