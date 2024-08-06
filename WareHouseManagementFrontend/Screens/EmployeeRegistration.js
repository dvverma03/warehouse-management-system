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
import { EmployeeFormValidation } from '../utils/FormValidation';
import ActivityIndicatorScreen from '../components/ActivityIndicator';
  
  export default function EmployeeRegistration() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [password, setPassword]=useState("")
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [agree, setAgree] = useState(false);
    const navigation = useNavigation();
    const [searching, setSearching] = useState(false);
    const [formattedValue, setFormattedValue] = useState('');
  
    const phoneInput = useRef(null);
  
    const SignInHandler = async () => {
      if (!fullName || !email || !contact || employeeType.length==0 || address.length==0 || password.length==0) {
        setError('All fields are required.');
        setTimeout(() => {
          setError('');
        }, 2000);
        return;
    }
  
      if (!agree) {
        Alert.alert('Please check the terms and condition box');
        return;
      }
  
      const contactNumber =phoneInput.current?.getNumberAfterPossiblyEliminatingZero().number;
      const countryCode = phoneInput.current?.getCountryCode();

      if(countryCode.length==0){
        setError("Country code must be selected")
        return
      }
      if(contactNumber.length!=10){
        setError("mobile number must be 10 digit")
        return
      }

      const errorMessage=EmployeeFormValidation(fullName, email, password)
      if(errorMessage){
        setError(errorMessage);
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
  
  
    const data = [
      { label: 'Unloading team', value: 'Unloading team' },
      { label: 'Receiving team', value: 'Receiving team' },
      { label: 'Location team', value: 'Location team' },
      { label: 'Picking team', value: 'Picking team' },
      { label: 'Dispatch team', value: 'Dispatch team' },
    ];
  
    const ToggleAgree = () => {
      setAgree(!agree);
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
              <Text style={styles.SignInText}>Employee registration</Text>
              <View>
                <Text style={styles.EmailText}>Full Name</Text>
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="Deepak Verma"
                  style={[styles.InputEmail, {color: 'black'}]}
                  value={fullName}
                  onChangeText={setFullName}></TextInput>
              </View>
              <View>
                <Text style={styles.EmailText}>Email id</Text>
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="deepak123@gmail.com"
                  style={[styles.InputEmail, {color: 'black'}]}
                  value={email}
                  onChangeText={setEmail}></TextInput>
              </View>
              <View>
                <Text style={styles.EmailText}>Phone Number</Text>
                <View
                  style={{
                    width: '92%',
                    borderWidth: 2,
                    borderColor: 'gray',
                    marginHorizontal: 15,
                    borderRadius: 10,
                  }}>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={contact}
                    defaultCode="IN"
                    layout="first"
                    
                    onChangeText={text => {
                      setContact(text);
                    }}
                    onChangeFormattedText={text => {
                      setFormattedValue(text);
                    }}
                    containerStyle={{
                      width: '97%',
                      borderRadius: 20,
                      height: 48,
                    }}
                    textContainerStyle={{
                      backgroundColor: '#ffffff',
                      color: 'black',
                      marginVertical: 0,
                      paddingVertical: 0,
                    }}
                    textInputProps={{
                      fontSize: 19,
                      right: 20,
                      color: 'black',
                      marginTop: 0,
                    }}
                    codeTextStyle={{
                      fontSize: 19,
                      right: 20,
                    }}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.EmailText}>Type of Employee</Text>
                <DropdownComponent data={data} setEmployeeType={setEmployeeType} />
              </View>
              <View>
                <Text style={styles.EmailText}>Address</Text>
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="1/121 nawabganj, Kanpur"
                  style={[styles.InputEmail, {color: 'black'}]}
                  value={address}
                  onChangeText={setAddress}></TextInput>
              </View>
              <View>
                <Text style={styles.EmailText}>Password</Text>
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="Deepak@123"
                  style={[styles.InputEmail, {color: 'black'}]}
                  value={password}
                  onChangeText={setPassword}></TextInput>
              </View>
              {error && <Text style={styles.Error}>{error}</Text>}
  
              <Pressable onPress={SignInHandler} style={styles.PressableButton}>
                <Text style={styles.ButtonText}>Sign in</Text>
              </Pressable>
              <View style={styles.SignupLinkContainer}>
                <Pressable style={{paddingTop: 2}} onPress={ToggleAgree}>
                  {!agree ? (
                    <Icon1 name="circle-o" size={22} color="black" />
                  ) : (
                    <Icon2 name="check-circle-o" size={22} color="black" />
                  )}
                </Pressable>
  
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}>
                  By signing up, you agree to the{' '}
                  <Text
                    style={{
                      fontFamily: 'Poppins_500Medium',
                      color: 'gray',
                    }}
                    onPress={async () => {
                      console.log('pressed');
                    }}>
                    Terms of Service
                  </Text>{' '}
                  and{' '}
                  <Text
                    onPress={async () => {
                      console.log('pressed');
                    }}>
                    Privacy Policy
                  </Text>{' '}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    Container: {
      backgroundColor: 'orange', 
      height: '100%',
      alignItems: 'center',
    },
    FormContainer: {
      backgroundColor: '#ffffff',
      flex: 1,
      width: '100%',
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
  