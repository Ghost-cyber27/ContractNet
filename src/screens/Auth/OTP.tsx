import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParamList } from "../../types/types";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from '@expo/vector-icons/AntDesign';
import { api } from "../../services/client";

type AuthScreenNavigationProp = NavigationProp<AuthStackParamList, 'OTP'>;
type DetailsScreenNavigationProp = RouteProp<AuthStackParamList, 'OTP'>;

export default function OTP(){
    const [otp, setOtp] = useState('');
    const [pass, setPass] = useState('');
    const route = useRoute<DetailsScreenNavigationProp>();
    const { email } = route.params;
    const navigation = useNavigation<AuthScreenNavigationProp>();

    const reset = async() => {
        try {
            const res = await api.post('/auth/reset-password',
                {
                    email: email,
                    otp: otp,
                    new_password: pass
                }
            );

            if (res) {
                alert("Success");
             navigation.navigate('Login');   
            }
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };


    return(
        <SafeAreaView>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Forgot Password</Text>
            </View>
            <View style={styles.inputView}>
                <View style={styles.textInput}>
                    <AntDesign name="api" size={24} color="black" style={styles.icon}/>
                    <TextInput
                        style={styles.texting}
                        placeholder="OTP"
                        keyboardType="twitter"
                        onChangeText={(text) => setOtp(text)}
                    />
                </View>
                <View style={styles.textInput}>
                    <AntDesign name="lock" size={24} color="black" style={styles.icon}/>
                    <TextInput
                        style={styles.texting}
                        placeholder="New Password"
                        keyboardType="twitter"
                        onChangeText={(text) => setPass(text)}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => reset()}>
                <Text style={styles.btnText}>ENTER</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bgImg: {
        width: wp('150%'),
        height: hp('25%'),
    },
    backbtn: {
        bottom: hp('20%'),
        left: wp('5%'),
        backgroundColor: '#184d85',
        width: wp('20%'),
        height: hp('7%'),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerView: {
        margin: 5
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    },
    inputView: {
        padding: 10,
        gap: hp('3%'),
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
        fontSize: 16
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
    icon: {
        paddingTop: hp('2%')
    },
    iconPass: {
        position: "absolute",
        left: wp('80%'),
        paddingTop: hp('3%'),  
    },
});