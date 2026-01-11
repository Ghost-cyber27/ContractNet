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

export const users = async(id: Number) => {
    try {
        const res = await api.get(`/users/${id}`);

        if(!res) console.log("Failed to fetch user");

        console.log('Freelancer acct: ', res.data);

        return res.data;
    } catch (error) {
        console.error(error);   
    }
};

export function truncate(text: string, max: number){
	return text.length > max ? text.slice(0, max) + "...": text;
}