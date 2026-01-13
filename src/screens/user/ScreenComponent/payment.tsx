import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation, RouteProp, useRoute, NavigationProp } from '@react-navigation/native';
import { UserStackParamList } from "../../../types/types";
import { useAuthStore } from '../../../services/AuthContext';

type GoBackScreenNavigationProp = NavigationProp<UserStackParamList, 'Payment'>;

type DetailsScreenNavigationProp = RouteProp<UserStackParamList, 'Payment'>;

export function Payment(){
    const navigation = useNavigation<GoBackScreenNavigationProp>();
    const route = useRoute<DetailsScreenNavigationProp>();
    const {job_id, receiver_id} = route.params;
    return(
        <View
            style={{
                backgroundColor: '#184d85',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1

            }}
        >
            <View
            style={{
                width: wp('80%'),
                height: hp('50%'),
                backgroundColor: 'white',
                elevation: 5,
                padding: 5,
                gap: 5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
            }}
            >
                <View style={styles.textInput}>
                    <TextInput
                        placeholder="Name of Bank"
                        keyboardType="number-pad"
                        style={styles.texting}
                    />
                </View>
                <View style={styles.textInput}>
                    <TextInput
                        placeholder="Amount"
                        keyboardType="number-pad"
                        style={styles.texting}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('chatDetails',
                    {
                        receiver_id: receiver_id
                    }
                    )}>
                    <Text style={styles.btnText}>Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    inputText: {
        fontSize: 20,
        fontWeight: '700'
    },
    textInput: {
        borderWidth: 2,
        width: wp('70%'),
        height: hp('10%'),
        borderRadius: 10,
        borderColor: '#184d85',
        flexDirection: 'row',
        padding: 5,
        gap: wp('5%')
    },
    btn: {
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        borderRadius: 10,
        top: hp('2%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500'
    },
    texting: {
        fontSize: 16,
        width: wp('60%')
    },
});