import React from 'react';
import 'react-native';
import storage from '@react-native-firebase/storage';
import StaffContactEntry from '../components/StaffContactEntry';
import renderer from 'react-test-renderer';



jest.mock('@react-native-firebase/storage', () => {
    const ref = jest.fn(() => ({
        getDownloadURL: jest.fn(),
    }))

    const storageMock = jest.fn(() => ({
        ref,
    }));

    return storageMock;
});

describe("ContactImages", () => {
    //both are Staff Storage URL with tokens
    it('Get Image URL: PASS', async () => {
        const ref = storage().ref("staffImages/Armatiti_Mody.jpeg");
        const getDownloadURLSpy = jest.spyOn(ref, 'getDownloadURL').mockResolvedValue("https://firebasestorage.googleapis.com/v0/b/spectrumcare-d5380.appspot.com/o/staffImages%2FArmatiti_Mody.jpeg?alt=media&token=ced5a52a-6d7c-4aab-8953-1fa60f5941f9");
        const url = await ref.getDownloadURL();

        const result = "https://firebasestorage.googleapis.com/v0/b/spectrumcare-d5380.appspot.com/o/staffImages%2FArmatiti_Mody.jpeg?alt=media&token=ced5a52a-6d7c-4aab-8953-1fa60f5941f9";

        //verify that the call to firebase storage was made
        expect(getDownloadURLSpy).toHaveBeenCalled;

        //check that the fetched url matches the static result
        expect(url).toEqual(result);

        getDownloadURLSpy.mockRestore();



    });
    //Button was pressed
    const handlePress = () => {
        return true;
    }
    //isFavorited set to true to match the color
    test("renders StaffContactEntry with fetched URL", async () => {

        const ref = storage().ref("staffImages/Armatiti_Mody.jpeg");
        const getDownloadURLSpy = jest.spyOn(ref, 'getDownloadURL').mockResolvedValue("https://firebasestorage.googleapis.com/v0/b/spectrumcare-d5380.appspot.com/o/staffImages%2FArmatiti_Mody.jpeg?alt=media&token=ced5a52a-6d7c-4aab-8953-1fa60f5941f9");
        const url = await ref.getDownloadURL();

        //verify that the call to firebase storage was made
        expect(getDownloadURLSpy).toHaveBeenCalled;

        const tree = renderer.create(
            <StaffContactEntry
                name='Armaiti Mody, M.D.'
                imagePath={url}
                jobTitle='Associate Professor'
                department='Pediatric Allergy, Immunology and Rheumatology'
                phoneNumber='916-734-3112'
                onPress={handlePress}
                isFavorited={true}
                hyperlink='https://health.ucdavis.edu/pediatrics/team/42849/armaiti-mody---pediatric-endocrinology-sacramento/'
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();

        getDownloadURLSpy.mockRestore();
    });


    it('Get Image URL: FAIL', async () => {
        //Procedure url not Staff Contact
        const ref = storage().ref("procedureImage/Needle_Pokes_page0.jpeg");
        const getDownloadURLSpy = jest.spyOn(ref, 'getDownloadURL').mockResolvedValue("https://firebasestorage.googleapis.com/v0/b/spectrumcare-d5380.appspot.com/o/procedureImages%2FNeedle_Pokes_page0.jpeg?alt=media&token=564fd33f-0164-4bc1-a5f0-284b0ebd41cb");
        const url = await ref.getDownloadURL();

        const result = "https://firebasestorage.googleapis.com/v0/b/spectrumcare-d5380.appspot.com/o/staffImages%2FArmatiti_Mody.jpeg?alt=media&token=ced5a52a-6d7c-4aab-8953-1fa60f5941f9";

        //verify that the call to firebase storage was made
        expect(getDownloadURLSpy).toHaveBeenCalled;

        //check that the fetched url matches the static result
        expect(result).not.toEqual(url);

        getDownloadURLSpy.mockRestore();
    });
});