/**
 * @format
 */

import 'react-native';
import React from 'react';
import WFCarousel from '../components/WFCarousel';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<WFCarousel imageURLs={[""]} text={["test"]}/>);
});
