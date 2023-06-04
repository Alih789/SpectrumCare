import 'react-native';
import React from 'react';
import PrepCarousel from '../components/PrepCarousel';


import renderer from 'react-test-renderer';
import {render} from '@testing-library/react';


describe("PrepCarousel", () => {
    const procedureInfo = require('../assets/testData/ProcedureData.json');

    const renderPrepCarousel = () =>
        render(
        <PrepCarousel
        procedureInfo={procedureInfo['mri']}
        data-testid="container-test-id"
        />
        );

    test("renders PrepCarousel", () => {
        const tree = renderer.create(
            <PrepCarousel
            procedureInfo={procedureInfo['mri']}
            data-testid="container-test-id"
            />
            ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});