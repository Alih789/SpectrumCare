import 'react-native';
import React from 'react';
import ProcedureList from '../components/ProcedureList';
import {PrepInfoProps} from '../assets/customTypes';


import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';


describe("ProcedureList", () => {
    const testProcedureData = require('../assets/testData/testProcedureData.json');

    const renderProcedureList = () =>
        render(
            <ProcedureList
                data={testProcedureData["mri"]}
                data-testid="container-test-id"
            />
        );

    test("renders ProcedureList", () => {
        const tree = renderer.create(
            <ProcedureList
                data={testProcedureData["mri"]}
                data-testid="container-test-id"
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

});