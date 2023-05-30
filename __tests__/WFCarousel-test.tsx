/** @jest-environment jsdom */

import 'react-native';
import React from 'react';
import WFCarousel from '../components/WFCarousel';
import {render, screen} from '@testing-library/react';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// basic render test
// test('renders correctly', () => {
//   const component = renderer.create(<WFCarousel imageURLs={[require("../assets/images/wfImages/03-hosp-enter-radiology/1.png")]} text={["test"]} jumpToIndexFromModal={0}/>);

//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();


// });


// jest.mock("./View",
//   () => 'This is View'
// )

test('click-next', () => {
    const { getByTestId } = render(
        <WFCarousel
            imageURLs={[require("../assets/images/wfImages/03-hosp-enter-radiology/1.png")]}
            text={["test"]}
            jumpToIndexFromModal={0}
            data-testid="container-test-id"
        />

    );

    // expect(getByTestId("container-test-id").props.jumpToIndexFromModal).toBe(0);

    // re render

});


