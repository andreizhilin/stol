import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { SigninButton } from '.';

describe('<SigninButton />', () => {
  it('renders correctly', async () => {
    const { asFragment } = render(<SigninButton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
