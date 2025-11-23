import { View, Text, StyleSheet } from "react-native";
import Frame4 from "../assets/images/logo.svg";

export default function IntroScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Frame4 width={292 * 2} height={219 * 2} top={10} />
            </View>
            <Text style={styles.text}>PotPan</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF782C',
    },
    container1: {
        backgroundColor: 'white',
        width: 180,
        height: 180,
        borderRadius: 300,
        alignItems: 'center',
        paddingTop: 6,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    }
})