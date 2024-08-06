import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon3 from 'react-native-vector-icons/Entypo';
import DropdownComponent from '../components/Dropdown';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import ActivityIndicatorScreen from '../components/ActivityIndicator';

export default function ProductFormScreen() {
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(false);
  const navigation = useNavigation();
  const [searching, setSearching] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [openExp, setOpenExp] = useState(false);
  const [openMfg, setOpenMfg] = useState(false);
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productType, setProductType] = useState('');
  const [mfgDate, setMfgDate] = useState(new Date());
  const [expDate, setExpDate] = useState(new Date());
  const [other, setOther] = useState('');
  const [quantity, setQuantity] = useState();

  const SignInHandler = async () => {
    if (!productName || !mfgDate || !expDate || !productType || !quantity) {
      setError('All * fields are required.');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    const errorMessage = EmployeeFormValidation(fullName, email, password);
    if (errorMessage) {
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
    {label: 'Grocery', value: 'Grocery'},
    {label: 'Electronics', value: 'Electronics'},
    {label: 'Garments', value: 'Garments'},
    {label: 'Stationary', value: 'Stationary'},
    {label: 'Chiller', value: 'Chiller'},
  ];

  if(searching){
    return <ActivityIndicatorScreen/>
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.Container}>
      <LinearGradient
        colors={['#5200d5', '#8946f6']}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.Container}>
          <View
            style={{
              borderColor: 'white',
              borderWidth: 2,
              paddingHorizontal: 35,
              marginVertical: 45,
              marginHorizontal: 65,
            }}>
            <Text
              style={{
                fontSize: 30,
                lineHeight: 35,
                paddingTop: 5,
                color: 'white',
              }}>
              Ware House
            </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                paddingBottom: 10,
                lineHeight: 20,
                color: 'white',
              }}>
              Management
            </Text>
          </View>
          <ScrollView style={styles.FormContainer}>
            <Text style={styles.SignInText}>Product details</Text>
            <View>
              <Text style={styles.EmailText}>Product Name*</Text>
              <TextInput
                placeholderTextColor="gray"
                placeholder="earbuds"
                style={[styles.InputEmail, {color: 'black'}]}
                value={productName}
                onChangeText={setProductName}></TextInput>
            </View>
            <View>
              <Text style={styles.EmailText}>Product id*</Text>
              <TextInput
                placeholderTextColor="gray"
                placeholder="123456789"
                style={[styles.InputEmail, {color: 'black'}]}
                value={productId}
                onChangeText={setProductId}></TextInput>
            </View>
            <View>
              <Text style={styles.EmailText}>Product quantity*</Text>
              <TextInput
                placeholderTextColor="gray"
                placeholder="123456789"
                style={[styles.InputEmail, {color: 'black'}]}
                value={quantity}
                onChangeText={setQuantity}></TextInput>
            </View>
            <View>
              <Text style={styles.EmailText}>Type of product*</Text>
              <DropdownComponent data={data} setEmployeeType={setProductType} />
            </View>
            <View>
              <Text style={styles.EmailText}>Manufacturing date*</Text>
              <Pressable
                onPress={() => setOpenMfg(true)}
                style={{
                  width: '92%',
                  flexDirection: 'row',
                  borderColor: '#eae3e3',
                  borderWidth: 2,
                  marginLeft: 15,
                  borderRadius: 10,
                }}>
                <Icon3
                  style={{paddingLeft: 10, paddingTop: 5}}
                  name="calendar"
                  size={35}
                  color="black"
                  onPress={() => setOpenMfg(true)}
                />
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="DD/MM/YYYY"
                  style={[{color: 'black', paddingLeft: 15, fontSize: 20}]}
                  value={mfgDate}
                  onChangeText={setMfgDate}
                />
              </Pressable>

              <DatePicker
                modal
                open={openMfg}
                date={mfgDate}
                onConfirm={date => {
                  setOpenMfg(false);
                  setMfgDate(date);
                }}
                onCancel={() => {
                  setOpenMfg(false);
                }}
              />
            </View>
            <View>
              <Text style={styles.EmailText}>Expiry date*</Text>
              <Pressable
                onPress={() => setOpenExp(true)}
                style={{
                  width: '92%',
                  flexDirection: 'row',
                  borderColor: '#eae3e3',
                  borderWidth: 2,
                  marginLeft: 15,
                  borderRadius: 10,
                }}>
                <Icon3
                  style={{paddingLeft: 10, paddingTop: 5}}
                  name="calendar"
                  size={35}
                  color="black"
                  onPress={() => setOpenExp(true)}
                />
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="DD/MM/YYYY"
                  style={[{color: 'black', paddingLeft: 15, fontSize: 20}]}
                  value={expDate}
                  onChangeText={setExpDate}
                />
              </Pressable>

              <DatePicker
                modal
                open={openExp}
                date={expDate}
                onConfirm={date => {
                  setOpenExp(false);
                  setExpDate(date);
                }}
                onCancel={() => {
                  setOpenExp(false);
                }}
              />
            </View>

            <View>
              <Text style={styles.EmailText}>Other details</Text>
              <TextInput
                placeholderTextColor="gray"
                placeholder="100% offer"
                style={[styles.InputEmail, {color: 'black'}]}
                value={other}
                onChangeText={setOther}></TextInput>
            </View>
            {error && <Text style={styles.Error}>{error}</Text>}

            <LinearGradient
              colors={['#5200d5', '#8748ed']}
              onPress={() => console.log('press')}
              style={styles.PressableButton}>
              <Text style={styles.ButtonText}>Next</Text>
            </LinearGradient>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    width: '100%',
  },
  FormContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    width: '100%',
    marginTop: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
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
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 35,
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
