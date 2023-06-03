/** @jest-environment jsdom */
import 'react-native';
import React, {useState} from 'react';
import StaffContactEntry from '../components/StaffContactEntry';
import {render, screen} from '@testing-library/react';

describe("StaffContactEntry", () => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePresse = () => {
        setIsPressed(true);
    }

    const renderStaffContactEntry = () =>
      render(
        <StaffContactEntry
        name='Angel Alberto Herrera Guerra, M.D.'
        imagePath=''
        jobTitle='Associate Professor'
        department='Pediatric Allergy, Immunology and Rheumatology'
        phoneNumber='916-734-3112'
        onPress={handlePresse}
        isFavorited={true}
        hyperlink='https://health.ucdavis.edu/pediatrics/team/32290/angel_alberto-herrera_guerra-pediatric_infectious_diseases'
        />
      );

    test("renders StaffContactEntry", () => {
      renderStaffContactEntry();
      // screen.debug is going to print the current DOM into the console
      screen.debug();
    //   expect(screen.getByText(/test/i)).toBeInTheDocument();
    });
  });

