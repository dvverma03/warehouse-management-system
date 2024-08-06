import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
  } from 'react-native';
  import React, {useRef, useState} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import PhoneInput from 'react-native-phone-number-input';
  import Icon1 from 'react-native-vector-icons/FontAwesome';
  import Icon2 from 'react-native-vector-icons/FontAwesome';
  import DropdownComponent from '../components/Dropdown';
import ActivityIndicatorScreen from '../components/ActivityIndicator';
  
  export default function SignIn() {
    const [name, setName] = useState('');
    const [vehicleNumber, setVehicleNumber]=useState("")
    const [weight, setWeight] = useState('');
    const [contact, setContact] = useState('');
    const [other, setOther] = useState('');
    const [error, setError] = useState('');
    const [agree, setAgree] = useState(false);
    const navigation = useNavigation();
    const [searching, setSearching] = useState(false);
    const [formattedValue, setFormattedValue] = useState('');
  
    const phoneInput = useRef(null);
  
    const SignInHandler = async () => {
      if (!name || !vehicleNumber || !weight ) {
        setError('All fields are required.');
        setTimeout(() => {
          setError('');
        }, 2000);
        return;
      }
  
      setSearching(true);
      try {
        const User = await login(email, contactNumber, countryCode);
        if (User) {
          dispatch(addUser({email, contactNumber, countryCode}));
          navigation.replace('Verification');
        }
      } catch (error) {
        Alert.alert('Error', 'Invalid credential. Please try again later.', [
          {text: 'OK'},
        ]);
      } finally {
        setSearching(false);
      }
    };

    if(searching){
      return <ActivityIndicatorScreen/>
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.Container}>
        <View contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.Container}>
            <View
              style={{
                borderColor: 'white',
                borderWidth: 2,
                paddingHorizontal: 35,
                marginVertical: 35,
                marginHorizontal: 75,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  lineHeight: 30,
                  paddingTop: 5,
                  color: 'white',
                }}>
                Ware House
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  paddingBottom: 5,
                  lineHeight: 20,
                  color: 'white',
                }}>
                Management
              </Text>
            </View>
            <ScrollView style={styles.FormContainer}>
              <Text style={styles.SignInText}>Vehicle registration</Text>
              <View>
                <Text style={styles.EmailText}>Vehicle Name *</Text>
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="Trailer"
                  style={[styles.InputEmail, {color: 'black'}]}
                  value={name}
                  onChangeText={setName}></TextInput>
              </View>
              <View>
                <Text style={styles.EmailText}>Vehicle Number *</Text>
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="Trailer"
                  style={[styles.InputEmail, {color: 'black'}]}
                  value={vehicleNumber}
                  onChangeText={setVehicleNumber}></TextInput>
              </View>
              <View>
                <Text style={styles.EmailText}>Vehicle weight *</Text>
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="0000.00"
                  style={[styles.InputEmail, {color: 'black'}]}
                  value={weight}
                  onChangeText={setWeight}></TextInput>
              </View>
              <View>
                <Text style={styles.EmailText}>Other details</Text>
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="1/121 nawabganj, Kanpur"
                  style={[styles.InputEmail, {color: 'black'}]}
                  value={other}
                  onChangeText={setOther}></TextInput>
              </View>
              {error && <Text style={styles.Error}>{error}</Text>}
  
              <Pressable onPress={SignInHandler} style={styles.PressableButton}>
                <Text style={styles.ButtonText}>Next</Text>
              </Pressable>
              
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    Container: {
      backgroundColor: 'orange', // 400
      height: '100%',
      width:'100%'
    },
    FormContainer: {
      backgroundColor: '#ffffff',
      flex: 1,
      width:"100%",
      marginTop: 20,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    SignInText: {
      paddingLeft: 15,
      fontSize: 20,
      marginTop: 20,
      fontFamily: 'Poppins_500Medium',
      lineHeight: 27,
      color: 'black',
    },
    InputEmail: {
      borderColor: '#eae3e3',
      borderWidth: 2,
      padding: 10,
      fontSize: 20,
      marginHorizontal: 15,
      borderRadius: 10,
    },
    EmailText: {
      fontSize: 16,
      padding: 5,
      paddingLeft: 15,
      marginTop: 15,
      fontFamily: 'Poppins_400Regular',
      color: 'black',
    },
    PressableButton: {
      backgroundColor: 'orange',
      borderRadius: 10,
      marginHorizontal: 15,
      marginTop: 25,
    },
    ButtonText: {
      fontSize: 18,
      padding: 8,
      textAlign: 'center',
      color: 'white',
    },
    SignupLinkContainer: {
      flexDirection: 'row',
      paddingTop: 15,
      paddingHorizontal: 15,
      gap: 10,
      paddingBottom: 20,
    },
    Error: {
      color: 'red',
      fontSize: 16,
      paddingLeft: 15,
      marginTop: 10,
    },
  });
  