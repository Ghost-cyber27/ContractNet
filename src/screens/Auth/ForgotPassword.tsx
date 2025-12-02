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
    Platform
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ForgotPassword(){
    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80} //adjust to test
        >
            <Image
                source={require('../../../assets/bg1.jpg')}
                style={styles.bgImg}
            />
            <TouchableOpacity style={styles.backbtn}></TouchableOpacity>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Forgot Password</Text>
            </View>
            <View style={styles.inputView}>
                <View style={styles.textInput}>
                    <TextInput
                        style={styles.texting}
                        placeholder="Password"
                        secureTextEntry
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>ENTER</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    bgImg: {
        width: wp('150%'),
        height: hp('25%')
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
        padding: 10
    },
    textInput: {
        borderWidth: 2,
        width: wp('95%'),
        height: hp('10%'),
        borderRadius: 10,
        justifyContent: 'center',
        borderColor: '#184d85'
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
});