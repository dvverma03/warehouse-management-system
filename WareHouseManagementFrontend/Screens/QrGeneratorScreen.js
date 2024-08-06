import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

const QRCodeGenerator = () => {
  const viewShotRef = useRef(null);
  const [imageURI, setImageURI] = useState(null);

  const productDetails = {
    productName: 'Example Product',
    productId: '123456',
    mfgDate: '2024-01-01',
    expDate: '2025-01-01',
    otherDetails: 'Some other details about the product',
  };

  const jsonString = JSON.stringify(productDetails);

  const saveQRCodeAsImage = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      setImageURI(uri);


      console.log('QR Code saved as image:', uri);
    } catch (error) {
      console.error('Failed to save QR code as image:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.qrContainer}>
        <Text style={styles.text}>Product QR Code:</Text>
        <ViewShot ref={viewShotRef} style={styles.qrCodeWrapper}>
          <QRCode
            value={jsonString}
            size={300}
            color="black"
            backgroundColor="white"
          />
        </ViewShot>
      </View>
      {/* <Button title="Save QR Code as Image" onPress={saveQRCodeAsImage} />
      {imageURI && (
        <Image
          source={{ uri: imageURI }}
          style={styles.image}
        />
      )} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop:20
  },
  qrContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
  qrCodeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default QRCodeGenerator;

