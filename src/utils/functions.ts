import * as ImagePicker from 'expo-image-picker';

const uploadImage = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
    });

    if (result.canceled) return null;
    
    const image = result.assets[0];
    console.log('image asset: ',image);

    if (!image.uri) {
        return "Error/no image"
    }

    return image.uri;

    // return image;
}