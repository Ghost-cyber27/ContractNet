import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { api } from "../../../services/client";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../../services/AuthContext";
import { Dropdown } from 'react-native-element-dropdown';
import axios from "axios";


export function AddJob(){
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [budget, setBudget] = useState('');
    const token = useAuthStore((s) => s.token);
    const [dead, setDead] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showText, setShowText] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('1');

    const data = [
        { label: 'Select Category...', value: '1' },
        { label: 'Design & Creative', value: 'Design & Creative' },
        { label: 'Development & IT', value: 'Development & IT' },
        { label: 'Writing & Translation', value: 'Writing & Translation' },
        { label: 'Sales & Marketing', value: 'Sales & Marketing' },
        { label: 'Admin & Customer Support', value: 'Admin & Customer Support' },
        { label: 'Finance & Consulting', value: 'Finance & Consulting' },
        { label: 'Music & Audio', value: 'Music & Audio' },
    ];

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowPicker(false); 

        if (selectedDate) {
            setDead(selectedDate);
            console.log(selectedDate);
            setShowText(true);
        }
    };

    const createJob = async() => {
        setLoading(true);
        try {
            const res = await api.post('/jobs/',{
                title: title,
                description: des,
                category: value,
                budget: Number(budget),//convert to float or double
                deadline: dead.toISOString().split("T")[0],
            },{
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            if (!res) {
                console.log('Error: Unsuccessful');
            }
            console.log('data: ', res.data);
            alert("Successful");
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                console.error('API Error:', error.response.data); // <-- This is the key
                console.error('Status Code:', error.response.status);
            } else {
                console.error('An unknown error occurred:', error);
            }
            throw error;
            
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={30} //adjust to test
                >
                    <View style={styles.inputView}>
                        <View style={styles.textInput}>
                            <TextInput
                                style={styles.texting}
                                placeholder="Title of your Job"
                                onChangeText={(text) => setTitle(text)}
                            />
                        </View>
                        <View style={styles.textInput}>
                            <Dropdown
                                style={{
                                    height: hp('8%'),
                                    width: wp('92%'),
                                    borderRadius: 8,
                                    paddingHorizontal: 8,
                                }}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='Role'
                                value={value}
                                onChange={item => {
                                    setValue(item.value);
                                }}
                            />
                        </View>
                        <View style={styles.textInput}>
                            <TextInput
                                style={styles.texting}
                                placeholder="Description"
                                onChangeText={(text) => setDes(text)}
                            />
                        </View>
                        <View style={styles.textInput}>
                            <TextInput
                                style={styles.texting}
                                placeholder="Budget"
                                keyboardType="number-pad"
                                onChangeText={(text) => setBudget(text)}
                            />
                        </View>
                        <TouchableOpacity style={styles.textInput} onPress={() => setShowPicker(true)}>
                            {showText 
                            ? <Text style={{
                                fontSize: 18,
                                fontWeight: '300',
                                top: hp('2%')
                            }}>Deadline: <Text style={{fontWeight: '600'}}>{dead.toDateString()}</Text> </Text>
                            : <Text style={{
                                fontSize: 18,
                                fontWeight: '300',
                                top: hp('2%')
                            }}>Select a Deadline</Text>
                            }
                            {showPicker && (
                                <DateTimePicker
                                value={dead}
                                mode="date"
                                display="default"
                                onChange={onChange}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => createJob()}>
                        {loading 
                        ? <ActivityIndicator size={"large"} color='white' /> 
                        :<Text style={styles.btnText}>CREATE JOB</Text>}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputView: {
        gap: hp('5%'),
        padding: 10,
        marginTop: hp('1%'),
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
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
});