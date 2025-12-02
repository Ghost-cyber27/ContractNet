import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from "../../services/AuthContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imgUri, setImgUri] = useState('');
    const [imgBase, setImgBase] = useState<string | null>(null);
    const [imgLoad, setImgLoad] = useState(false);
    const [seePass, setSeePass] = useState<boolean>(true);
    //for imageBase6
    //const imageDataUri = 'data: image/png;base64, ${base64}';

    const uploadImage = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
            base64: true,
        });

        if (result.canceled) return null;

        const base = result.assets[0].base64;
        console.log('image base64: ',base);
        //setImgBase(base);
        
        const image = result.assets[0];
        console.log('image asset: ',image);

        if (!image.uri) {
            return "Error/no image"
        }

        setImgUri(image.uri);
        setImgLoad(true);

        // return image;
    }

    const signup = async() => {
        try {
            await useAuthStore.getState().signup(name, email, password, "profile_picture");
        } catch (error) {
            console.log("SignUp failed:", error);
        }
    }

    return(
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : "position"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} //adjust to test
        >
           <ScrollView
           style={styles.container}
            keyboardShouldPersistTaps="handled"
           >
                <Image
                    source={require('../../../assets/bg2.jpg')}
                    style={styles.bgImg}
                />
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Sign Up</Text>
                </View>
                <View style={styles.pic}>
                    {imgLoad 
                    ? <Image source={{uri: imgUri}} style={styles.proPic}/> 
                    : <TouchableOpacity style={styles.proPic} onPress={() => uploadImage()}></TouchableOpacity>
                    }
                    <Image/>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.textInput}>
                        <Ionicons name="person" size={24} color="black" style={styles.icon}/>
                        <TextInput
                            style={styles.texting}
                            placeholder="Full Name"
                        />
                    </View>
                    <View style={styles.textInput}>
                        <AntDesign name="mail" size={24} color="black" style={styles.icon}/>
                        <TextInput
                            style={styles.texting}
                            placeholder="example@email.com"
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={styles.textInput}>
                        <AntDesign name="lock" size={24} color="black" style={styles.icon}/>
                        <TextInput
                            style={styles.texting}
                            placeholder="Password"
                            secureTextEntry={seePass}
                        />
                        {seePass 
                        ? <TouchableOpacity onPress={() => setSeePass(false)}>
                            <Feather name="eye-off" size={24} color="black" style={styles.iconPass}/>
                            </TouchableOpacity>
                        : <TouchableOpacity onPress={() => setSeePass(true)}>
                            <Feather name="eye" size={24} color="black" style={styles.iconPass}/>
                            </TouchableOpacity>}
                    </View>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.regs}>
                    <Text style={styles.regsText}>Already have an account? <Text style={{fontWeight: 'bold', color: '#184d85'}}>Sign Up</Text></Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
           </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: hp('95%'),
    },
    bgImg: {
        width: wp('100%'),
        height: hp('10%')
    },
    headerView: {
        margin: 10
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    },
    pic: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    proPic: {
        width: wp('30%'),
        height: hp('15%'),
        backgroundColor: 'black',
        borderRadius: 50
    },
    inputView: {
        gap: hp('2%'),
        padding: 10
    },
    textInput: {
        borderWidth: 2,
        width: wp('95%'),
        height: hp('10%'),
        borderRadius: 10,
        borderColor: '#184d85',
        flexDirection: 'row',
        padding: 5,
        gap: wp('5%')
    },
    icon: {
        paddingTop: hp('2%')
    },
    iconPass: {
        left: wp('5%'),
        paddingTop: hp('2%'),
        position: "absolute"
    },
    texting: {
        fontSize: 16,
        width: wp('60%')
    },
    btn: {
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        borderRadius: 10,
        left: wp('17%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500'
    },
    regs: {
        top: hp('2%'),
        left: wp('19%')
    },
    regsText: {
        fontSize: 16,
    }
});