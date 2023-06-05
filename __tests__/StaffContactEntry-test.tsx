/** @jest-environment jsdom */
import 'react-native';
import React from 'react';
import StaffContactEntry from '../components/StaffContactEntry';
import renderer from 'react-test-renderer';


describe("StaffContactEntry", () => {

    //Button was pressed
    const handlePress = () => {
        return true;
    }
    //isFavorited set to true to match the color
    test("renders StaffContactEntry", () => {
        const tree = renderer.create(
            <StaffContactEntry
            name='Angel Alberto Herrera Guerra, M.D.'
            imagePath='https://physicians.ucdavis.edu/Custom/Photos/32290.jpg'
            jobTitle='Associate Professor'
            department='Pediatric Allergy, Immunology and Rheumatology'
            phoneNumber='916-734-3112'
            onPress={handlePress}
            isFavorited={true}
            hyperlink='https://health.ucdavis.edu/pediatrics/team/32290/angel_alberto-herrera_guerra-pediatric_infectious_diseases'
            />
            ).toJSON();
        expect(tree).toMatchSnapshot();
    });
  });
