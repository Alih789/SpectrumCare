
import 'react-native';
import React from 'react';

import NotesButton from '../components/NotesButton';
import { MMKV } from 'react-native-mmkv';

import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';


//render test


test('renders correctly', () => {
    const tree = renderer.create(<NotesButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });



// Page Toggle
// If prop color changes correctly, then we know usestate has also successfully changed
// Thus page toggling works
describe('NotesButton', () => {
    it('should toggle between pages', () => {
      const { getByTestId } = render(<NotesButton />);
  
      // Get the button that expands the modal
      const expandButton = getByTestId('expand-button');
      fireEvent.press(expandButton);
  
      // Get the page toggle buttons
      const page1Button = getByTestId('page-1-button');
      const page2Button = getByTestId('page-2-button');
      const page3Button = getByTestId('page-3-button');
      const page4Button = getByTestId('page-4-button');
  
      // Initial page is 0, expect page 1 button to be active
      expect(page1Button.props.style).toEqual([{"backgroundColor": "#ffe5fb"}, {"bottom": 0, "fontFamily": "Figtree-Medium", "padding": 16}]);
  
      // Toggle to page 2
      fireEvent.press(page2Button);
      expect(page2Button.props.style).toEqual([{"backgroundColor": "#ecf8f2"}, {"bottom": 0, "fontFamily": "Figtree-Medium", "padding": 16}]);
  
      // Toggle to page 3
      fireEvent.press(page3Button);
      expect(page3Button.props.style).toEqual([{"backgroundColor": "#fffce5"}, {"bottom": 0, "fontFamily": "Figtree-Medium", "padding": 16}]);
  
      // Toggle to page 4
      fireEvent.press(page4Button);
      expect(page4Button.props.style).toEqual([{"backgroundColor": "#e5fffd"}, {"bottom": 0, "fontFamily": "Figtree-Medium", "padding": 16}]);
    });
  });



// Writing Text Test

// test('TextInput renders correctly', () => {
//   const { getByTestId } = render(<NotesButton />);
//   const textInput = getByTestId('notes-text-input');

//   expect(textInput).toBeTruthy(); // Check if TextInput exists
//   expect(textInput.props.value).toBe('Useless Multiline Placeholder'); // Check initial value

//   fireEvent.changeText(textInput, 'New text value'); // Change the value of TextInput
//   expect(textInput.props.value).toBe('New text value'); // Check updated value
// });



//Async store test

describe('ASYNC STORAGE TESTS', () => {
  let storage: MMKV; //new storage

  beforeAll(() => {
    storage = new MMKV();
  });

  it('functions correctly', () => {
    storage.set('testString', 'value');
    storage.set('testNumber', 99);
    storage.set('testBoolean', false);

    expect(storage.getString('testString')).toStrictEqual('value');
    expect(storage.getNumber('testString')).toBeUndefined();
    expect(storage.getBoolean('testString')).toBeUndefined();
    expect(storage.getString('testNumber')).toBeUndefined();
    expect(storage.getNumber('testNumber')).toStrictEqual(99);
    expect(storage.getBoolean('testNumber')).toBeUndefined();
    expect(storage.getString('testBoolean')).toBeUndefined();
    expect(storage.getNumber('testBoolean')).toBeUndefined();
    expect(storage.getBoolean('testBoolean')).toStrictEqual(false);
    expect(storage.getAllKeys()).toEqual(
      expect.arrayContaining(['testString', 'testNumber', 'testBoolean'])
    );

    storage.delete('testBoolean');
    expect(storage.contains('testBoolean')).toBeFalsy();
    expect(storage.getAllKeys()).toEqual(
      expect.arrayContaining(['testString', 'testNumber'])
    );

    storage.clearAll();
    expect(storage.toString()).toStrictEqual('MMKV (mmkv.default): []');
  });
});
