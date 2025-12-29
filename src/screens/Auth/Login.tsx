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
    ActivityIndicator
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuthStore } from "../../services/AuthContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { AuthStackParamList } from "../../types/types";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from "axios";

type AuthScreenNavigationProp = NavigationProp<AuthStackParamList, 'Login'>;

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [seePass, setSeePass] = useState<boolean>(true);
    const navigation = useNavigation<AuthScreenNavigationProp>();

    const login = async () => {
        setLoading(true);
        try {
            await useAuthStore.getState().login(email, password);
            
            console.log("Login Success");
            setLoading(false);
        } catch (err) {
            console.log("Login failed:", err);
            alert(`Login Failed: ${err}`);
            setLoading(false);
            if (axios.isAxiosError(err) && err.response) {
                console.error('API Error:', err.response.data); // <-- This is the key
                console.error('Status Code:', err.response.status);
            } else {
                console.error('An unknown error occurred:', err);
            }
            throw err;
        }
    };

    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={30} //adjust to test
        >
            <Image
                source={require('../../../assets/bg1.jpg')}
                style={styles.bgImg}
            />
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Login</Text>
            </View>
            <View style={styles.inputView}>
                <View style={styles.textInput}>
                    <AntDesign name="mail" size={24} color="black" style={styles.icon}/>
                    <TextInput
                        style={styles.texting}
                        placeholder="example@email.com"
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.textInput}>
                    <AntDesign name="lock" size={24} color="black" style={styles.icon}/>
                    <TextInput
                        style={styles.texting}
                        placeholder="Password"
                        secureTextEntry={seePass}
                        onChangeText={(text) => setPassword(text)}
                    />
                    {seePass 
                    ? <TouchableOpacity onPress={() => setSeePass(false)}>
                        <Feather name="eye-off" size={24} color="black" style={styles.iconPass}/>
                      </TouchableOpacity>
                    : <TouchableOpacity onPress={() => setSeePass(true)}>
                        <Feather name="eye" size={24} color="black" style={styles.iconPass}/>
                      </TouchableOpacity>
                    }
                </View>
            </View>
            <TouchableOpacity style={styles.fPassView} onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.fPass}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => login()}>
                {loading 
                ? <ActivityIndicator size={"large"} color="white" /> 
                :<Text style={styles.btnText}>LOGIN</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.regs} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.regsText}>Don't have an account? <Text style={{fontWeight: 'bold', color: '#184d85'}}>Sign Up</Text></Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bgImg: {
        width: wp('100%'),
        height: hp('20%')
    },
    headerView: {
        margin: 10
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    },
    inputView: {
        gap: hp('5%'),
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
    fPassView: {
        left: wp('62%')
    },
    fPass: {
        fontSize: 16,
        color: 'blue'
    },
    btn: {
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        borderRadius: 10,
        top: hp('2%'),
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
        top: hp('5%'),
        left: wp('20%')
    },
    regsText: {
        fontSize: 16,
    }
});