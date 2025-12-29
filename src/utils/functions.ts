import * as ImagePicker from 'expo-image-picker';
import { api } from '../services/client';

export const uploadImage = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
    });

    if (result.canceled) return null;
    
    const image = result.assets[0];

    return {
        uri: image.uri,
        name: image.fileName || "image.jpg",
        type: image.mimeType || "image/jpeg",
    };

    // return image;
}