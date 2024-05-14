import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "../pages/Main";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}