import 'react-native';
import React from 'react';
import PrepCarousel from '../components/PrepCarousel';
import renderer from 'react-test-renderer';


describe("PrepCarousel", () => {
    const procedureInfo = require('../assets/testData/ProcedureData.json');

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