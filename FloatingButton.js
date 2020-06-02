import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

export default class FloatingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {data: null, mediaType: ''};
  }
  animation = new Animated.Value(0.001);

  widget = ({iconName, callback, position, label}) => {
    return (
      <Animated.View style={[styles.button, this.transformStyle(position)]}>
        <TouchableOpacity onPress={callback} style={{alignItems: 'center'}}>
          <AntDesign name={iconName} size={30} color="#ffc4a3" />
          <Text style={{color: 'gray', fontSize: 12}}>{label}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;
    Animated.timing(this.animation, {
      toValue,
      // friction: 6,
      duration: 400,
    }).start();
    this.open = !this.open;
  };

  transformStyle = (position) => ({
    transform: [
      {scale: this.animation},
      {
        translateY: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, position.y],
        }),
      },
      {
        translateX: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, position.x],
        }),
      },
    ],
  });

  openCamera = () => {
    console.log('camera');
    const options = {
      title: 'Take a photo',
      storageOptions: {
        skipBackup: true,
        path: 'media',
      },
      mediaType: 'photo',
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        this.setState({
          data: response,
          mediaType: 'photo',
        });
      }
    });
  };

  openGallery = () => {
    console.log('gallery');
    const options = {
      title: 'Select any item',
      storageOptions: {
        skipBackup: true,
        path: 'media',
      },
      mediaType: 'mixed',
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({
          data: response,
          mediaType: 'photo | video',
        });
      }
    });
  };

  openDocument = async () => {
    try {
      console.log('document');
      const res = await DocumentPicker.pick();
      // console.log(JSON.stringify(res));
      this.setState({
        data: res.uri,
        mediaType: 'document',
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <this.widget
          iconName="camerao"
          callback={this.openCamera}
          position={{
            x: 0,
            y: -100,
          }}
          label="Camera"
        />

        <this.widget
          iconName="picture"
          callback={this.openGallery}
          position={{
            x: -75,
            y: -100,
          }}
          label="Gallery"
        />

        <this.widget
          iconName="contacts"
          callback={() => {
            console.log('contacts');
          }}
          position={{
            x: 75,
            y: -100,
          }}
          label="Contacts"
        />

        <this.widget
          iconName="enviromento"
          callback={() => {
            console.log('location');
          }}
          position={{
            x: 0,
            y: -175,
          }}
          label="Location"
        />

        <this.widget
          iconName="file1"
          callback={this.openDocument}
          position={{
            x: 75,
            y: -175,
          }}
          label="Document"
        />

        <this.widget
          iconName="picture"
          callback={() => {
            console.log('audio');
          }}
          position={{
            x: -75,
            y: -175,
          }}
          label="Audio"
        />

        <TouchableWithoutFeedback
          onPress={this.toggleMenu}
          style={styles.button}>
          <View style={[styles.button, styles.menu]}>
            <AntDesign name="paperclip" size={40} color="#fff" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderRadius: 30,
    padding: 5,
    backgroundColor: '#fff',
    position: 'absolute',
    elevation: 5,
    alignItems: 'center',
    width: 60,
    height: 60,
    justifyContent: 'center',
  },
  menu: {
    backgroundColor: '#ff9a76',
    position: 'relative',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
});
