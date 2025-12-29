import { useState } from "react";
import { 
    View, 
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal,
    TextInput,
    ActivityIndicator
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import * as ImagePicker from 'expo-image-picker';
import { WebView } from 'react-native-webview';
import { Privacy } from "./ScreenComponent/privacy";
import { useAuthStore } from "../../services/AuthContext";
import { AuthStackParamList } from "../../types/types";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { api } from "../../services/client";

type AuthScreenNavigationProp = NavigationProp<AuthStackParamList, 'Login'>;

export default function Settings(){
    const [showing, setShowing] = useState(false);
    const [pView, setPView] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [about, setAbout] = useState(false);
    const [imgUri, setImgUri] = useState('');
    const [imgLoad, setImgLoad] = useState(false);
    const [name, setName] = useState(useAuthStore((s) => s.user.full_name));
    const [email, setEmail] = useState(useAuthStore((s) => s.user.email));
    const [proPic, setProPic] = useState(useAuthStore((s) => s.user.profile_picture));
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const navigation = useNavigation<AuthScreenNavigationProp>();
    const token = useAuthStore((s) => s.token);
    const [update, setUpdate] = useState(false);
    const [change, setChange] = useState(false);

    const logout = async() => {
        try {
            await useAuthStore.getState().logout();
            console.log("Logged out");
        } catch (error) {
            
        }
    };

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
            return "Error/no image";
        }

        setImgUri(image.uri);
        setImgLoad(true);
    };

    const updateUser = async() => {
        setUpdate(true);
        try {
            const formData = new FormData();
            formData.append('full_name', name);
            formData.append('email', email);
            formData.append('profile_picture', proPic);

            const res = await api.put('/users/update', 
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setUpdate(false);
            if (res) {
                alert("User Info Updated");
                setShowing(false);
            }
        } catch (error) {
            console.error(error);
            setUpdate(false);
        }
    };

    const changePassword = async() => {
        setChange(true);
        try {
            const formData = new FormData();
            formData.append('old_password', pass1);
            formData.append('new_password', pass2);

            const res = await api.put('/auth/change-password',
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setChange(false);
            if (res) {
                alert("Success");
                setPView(false);
            }
            console.log(res);
        } catch (error) {
            console.error(error);
            setChange(false);
        }
    };

    return(
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Image 
                source={{uri: proPic}}
                style={styles.headerImg}
                />
                <View style={styles.headerTextView}>
                    <Text  style={styles.headerName}>{name}</Text>
                    <Text style={styles.headerEmail}>{email}</Text>
                </View>
            </View>
            <View style={styles.optionView}>
                <TouchableOpacity style={styles.optionBtn} onPress={() => setShowing(true)}>
                    <AntDesign name="profile" size={30} color='white' />
                    <Text style={styles.optionText}>My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionBtn} onPress={() => setPView(true)}>
                    <AntDesign name="lock" size={30} color='white' />
                    <Text style={styles.optionText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionBtn} onPress={() => setPrivacy(true)}>
                    <AntDesign name="key" size={30} color='white' />
                    <Text style={styles.optionText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionBtn} onPress={() => logout()}>
                    <AntDesign name="logout" size={30} color='white' />
                    <Text style={styles.optionText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionBtn} onPress={() => setAbout(true)}>
                    <AntDesign name="apartment" size={30} color='white' />
                    <Text style={styles.optionText}>About Us</Text>
                </TouchableOpacity>
            </View>
            {/*Edit profile*/}
            <Modal
                visible={showing}
                animationType="slide"
            >
                <TouchableOpacity style={styles.imgView} onPress={() => uploadImage()}>
                    {imgLoad 
                    ? (
                        <Image
                            source={{uri: imgUri}}
                            style={styles.img}
                        />
                    ) 
                    : (
                        <Image
                            source={{uri: proPic || 'https://www.vecteezy.com/free-vector/no-photo'}}
                            style={styles.img}
                        />
                    )}
                </TouchableOpacity>
                <View style={styles.inputView}>
                    <View style={styles.textInput}>
                        <Ionicons name="person" size={24} color="black" style={styles.icon}/>
                        <TextInput
                            style={styles.texting}
                            placeholder="Full Name"
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                    </View>
                    <View style={styles.textInput}>
                        <AntDesign name="mail" size={24} color="black" style={styles.icon}/>
                        <TextInput
                            style={styles.texting}
                            placeholder="example@email.com"
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                    </View>
                </View>
                <TouchableOpacity 
                    style={{
                        width: wp('70%'),
                        height: hp('7%'),
                        backgroundColor: '#184d85',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        left: wp('13%')
                    }}
                    onPress={() => updateUser()}
                >
                    {update 
                    ? <ActivityIndicator size={"large"} color={"white"} />
                    :<Text style={{
                        fontSize: 20,
                        color: 'white',
                        fontWeight: '500'
                    }}>Save Update</Text>}
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        width: wp('70%'),
                        height: hp('7%'),
                        backgroundColor: '#184d85',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        left: wp('13%')
                    }}
                    onPress={() => setShowing(false)}
                    >
                        <Text style={{
                            fontSize: 20,
                            color: 'white',
                            fontWeight: '500'
                        }}>Cancel</Text>
                    </TouchableOpacity>
            </Modal>
            {/*Change Password*/}
            <Modal
                visible={pView}
                animationType="fade"
            >
                <View style={styles.inputView}>
                    <View style={styles.textInput}>
                        <Ionicons name="lock-closed" size={24} color="black" style={styles.icon}/>
                        <TextInput
                            style={styles.texting}
                            placeholder="Old Password"
                            keyboardType="visible-password"
                            onChangeText={(text) => setPass1(text)}
                        />
                    </View>
                    <View style={styles.textInput}>
                        <AntDesign name="lock" size={24} color="black" style={styles.icon}/>
                        <TextInput
                            style={styles.texting}
                            placeholder="New Password"
                            keyboardType="visible-password"
                            onChangeText={(text) => setPass2(text)}
                        />
                    </View>
                </View>
                <TouchableOpacity 
                    style={{
                        width: wp('70%'),
                        height: hp('7%'),
                        backgroundColor: '#184d85',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        left: wp('13%')
                    }}
                    onPress={() => changePassword()}
                >
                    {change
                    ? <ActivityIndicator size={"large"} color={"white"} />
                    :<Text style={{
                        fontSize: 20,
                        color: 'white',
                        fontWeight: '500'
                    }}>Save Update</Text>}
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        width: wp('70%'),
                        height: hp('7%'),
                        backgroundColor: '#184d85',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        left: wp('13%')
                    }}
                    onPress={() => setPView(false)}
                    >
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        fontWeight: '500'
                    }}>Cancel</Text>
                </TouchableOpacity>
            </Modal>
            {/*Privacy*/}
            <Modal
                visible={privacy}
                animationType="slide"
            >
                <View style={{marginTop: hp('1%'), marginLeft: wp('1%')}}>
                    <AntDesign name="close-circle" size={30} color='black' onPress={() => setPrivacy(false)} />
                </View>
                <Privacy/>
            </Modal>
            {/*About us*/}
            <Modal
                visible={about}
                animationType="slide"
            >
                <View style={styles.container}>
                    <View style={{marginTop: hp('1%'), marginLeft: wp('1%')}}>
                        <AntDesign name="close-circle" size={30} color='black' onPress={() => setAbout(false)} />
                    </View>
                    <WebView 
                        source={{ uri: 'https://ghost-cyber27.github.io/' }} 
                        style={{ padding: 5 }} 
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerView: {
        flexDirection: 'row',
        padding: 5,
        gap: wp('3%'),
        backgroundColor: 'white',
        marginTop: hp('1%')
    },
    headerImg: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 50,
    },
    headerTextView: {
        gap: hp('1%'),
        marginTop: hp('3.2%')
    },
    headerName: {
        fontSize: 20,
        fontWeight: '500'
    },
    headerEmail: {
        fontSize: 16,
        fontWeight: '300'
    },
    optionView: {
        backgroundColor: 'white',
        padding: 5,
        margin: 5,
        gap: hp('3%')
    },
    optionBtn: {
        width: wp('94%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        alignItems: 'center',
        flexDirection: 'row',
        gap: wp('5%'),
        padding: 5,
        borderRadius: 10
    },
    optionText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white'
    },
    inputView: {
        gap: hp('5%'),
        padding: 10,
        marginTop: hp('5%')
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
    texting: {
        fontSize: 16,
        width: wp('60%')
    },
    icon: {
        paddingTop: hp('2%')
    },
    img: {
        width: wp('70%'),
        height: hp('30%'),
        resizeMode: 'contain',
        borderRadius: 150,
        borderWidth: 3,
        borderColor: '#184d85',
    },
    imgView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('10%'),
    },
    iconView: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: '#184d85',
        width: wp('20%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center'
    }
});
