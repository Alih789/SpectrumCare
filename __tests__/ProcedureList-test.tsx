import 'react-native';
import React from 'react';
import ProcedureList from '../components/ProcedureList';
import renderer from 'react-test-renderer';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

describe("ProcedureList", () => {
    const testProcedureData = require('../assets/testData/testProcedureData.json');

    test("renders ProcedureList", () => {
        const tree = renderer.create(
            <ProcedureList
                data={testProcedureData}
                data-testid="container-test-id"
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

});