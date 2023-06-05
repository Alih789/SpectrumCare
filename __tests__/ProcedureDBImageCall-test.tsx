import React from 'react';
import 'react-native';
import storage from '@react-native-firebase/storage';
import ProcedureList from '../components/ProcedureList';
import renderer from 'react-test-renderer';

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

jest.mock('@react-native-firebase/storage', () =>{
    const ref = jest.fn(() => ({
        getDownloadURL: jest.fn(),
    }))

    const storageMock = jest.fn(() => ({
        ref,
    }));

    return storageMock;
});

describe("Procedure Images", () => {
    
    //both are Staff Storage URL with tokens
    it('Get Image URL: Mock that correct fetch was made', async() => {
    
        const ref = storage().ref("procedureImage/Needle_Pokes_page0.jpeg");
        const getDownloadURLSpy = jest.spyOn(ref, 'getDownloadURL').mockResolvedValue("https://firebasestorage.googleapis.com/v0/b/spectrumcare-d5380.appspot.com/o/procedureImages%2FNeedle_Pokes_page0.jpeg?alt=media&token=564fd33f-0164-4bc1-a5f0-284b0ebd41cb");
        const url = await ref.getDownloadURL();

        const result = "https://firebasestorage.googleapis.com/v0/b/spectrumcare-d5380.appspot.com/o/procedureImages%2FNeedle_Pokes_page0.jpeg?alt=media&token=564fd33f-0164-4bc1-a5f0-284b0ebd41cb";

        //verify that the call to firebase storage was made
        expect(getDownloadURLSpy).toHaveBeenCalled;

        //check that the fetched url matches the static result
        expect(result).toEqual(url);

        getDownloadURLSpy.mockRestore();


    });

    it('Get Image URL: Mock that correct fetch was made compared against incorrect results', async() => {
        const ref = storage().ref("procedureImage/Needle_Pokes_page0.jpeg");
        const getDownloadURLSpy = jest.spyOn(ref, 'getDownloadURL').mockResolvedValue("https://firebasestorage.googleapis.com/v0/b/spectrumcare-d5380.appspot.com/o/procedureImages%2FNeedle_Pokes_page0.jpeg?alt=media&token=564fd33f-0164-4bc1-a5f0-284b0ebd41cb");
        const url = await ref.getDownloadURL();

        const result = "https://firebasestorage.googleapis.com/v0/b/spectrumcare-d5380.appspot.com/o/staffImages%2FArmatiti_Mody.jpeg?alt=media&token=ced5a52a-6d7c-4aab-8953-1fa60f5941f9";

        //verify that the mocked call to firebase storage was made
        expect(getDownloadURLSpy).toHaveBeenCalled;

        //check that the fetched url matches the static result
        expect(url).not.toEqual(result);

        getDownloadURLSpy.mockRestore();

    });
});

    



describe("ProcedureList rendered with the fetched URL", () => {
    
    
    test("renders ProcedureList", async () => {
        const testProcedureData = require('../assets/testData/testProcedureData.json');
    
        const ref = storage().ref("procedureImage/Needle_Pokes_page0.jpeg");
        const getDownloadURLSpy = jest.spyOn(ref, 'getDownloadURL').mockResolvedValue("https://firebasestorage.googleapis.com/v0/b/spectrumcare-d5380.appspot.com/o/procedureImages%2FNeedle_Pokes_page0.jpeg?alt=media&token=564fd33f-0164-4bc1-a5f0-284b0ebd41cb");
        const url = await ref.getDownloadURL();
    
        //verify that the mocked call to firebase storage was made
        expect(getDownloadURLSpy).toHaveBeenCalled;

        //updated content 1
        testProcedureData[0].pages[0].media.content = url;
        //updated content 2
        testProcedureData[0].pages[1].media.content = url;
        //updated content 3
        testProcedureData[0].pages[2].media.content = url;

        const tree = renderer.create(
            <ProcedureList
                data={testProcedureData}
                data-testid="container-test-id"
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

});