import { useState } from "react";
import { 
    View, 
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView 
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export function ProfileDetails(){

    const data = [
        {id: '1', title: 'Mobile App UI Design', description: 'To create a UI for a mobile app', category: 'Design & Creative', budget: '1254.02', status: 'open'},
        {id: '2', title: 'Website UI Design', description: 'To create a UI for a website', category: 'Design & Creative', budget: '3000.0', status: 'closed'},
        {id: '3', title: 'Product Design', description: 'To create a design for a product', category: 'Design & Creative', budget: '1500.0', status: 'pending'},
    ];

    return(
        <ScrollView style={styles.container}>
            {/*Header*/}
            <View style={styles.header}>
                <Image
                    source={require('../../../../assets/icons/Vynil Icons.png')}
                    style={styles.proPic}
                />
                <View style={styles.proTextView}>
                    <Text style={styles.proName}>Full Name, verified</Text>
                    <Text style={styles.proNorm}>Service</Text>
                    <Text style={styles.proNorm}>Rating</Text>
                </View>
            </View>
            {/*Body*/}
            <View style={styles.body}>
                <Text style={styles.bodyHeaderText}>Bio</Text>
                <Text>lksdnvsdvs sdlv sdv sdlsdkv</Text>
                <Text style={styles.bodyHeaderText}>Skills</Text>
                <Text>Writing, Programming, Communication</Text>
                <Text style={styles.bodyHeaderText}>Jobs Completed</Text>
                {data.map((item) => (
                    <View key={item.id} style={styles.jobDisplay}>
                        <Text style={styles.jobTitle}>{item.title}</Text>
                        <Text style={styles.jobNorm}>{item.category}</Text>
                        <Text style={styles.jobDes}>{item.description}</Text>
                        <View style={styles.jobView}>
                            <Text style={styles.jobPrice}>${item.budget}</Text>
                            <Text style={{
                                left: wp('50%'),
                                position: 'absolute',
                                fontSize: 16,
                                fontWeight: '500',
                                color: item.status == 'open' ? 'green' : item.status == 'closed' ? 'red' : 'yellow'
                            }}>{item.status}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginTop: hp('10%'),
        marginBottom: hp('5%')
    },
    header: {
        flexDirection: 'row',
        gap: wp('5%')
    },
    proPic: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 50,
        resizeMode: 'contain'
    },
    proTextView: {
        marginTop: hp('3%')
    },
    proName: {
        fontSize: 20,
        fontWeight: '500'
    },
    proNorm: {
        fontSize: 16,
        fontWeight: '300'
    },
    body: {
        padding: 5,
        gap: hp('3%')
    },
    bodyHeaderText: {
        fontSize: 20,
        fontWeight: '500'
    },
    bodyText: {
        fontSize: 16,
        fontWeight: '300'
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: '400',
    },
    jobDes: {
        fontSize: 16,
        fontWeight: '300', 
    },
    jobNorm: {
        fontSize: 16,
        fontWeight: '200',
        fontStyle: 'italic',
    },
    jobPrice: {
        fontSize: 16,
        fontWeight: '300',
        color: 'green'
    },
    jobView: {
        flexDirection: 'row',
        gap: wp('10%'),
    },
    jobDisplay: {
        width: wp('95%'),
        height: hp('20%'),
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#184d85',
        padding: 5,
        paddingTop: hp('2%'),
        paddingLeft: wp('3%'),
        gap: wp('1%'),

    }
}); 