import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

HEIGHT = 180;
WIDTH = 270;
export default class CircularReveal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  animation = new Animated.Value(0.0001);
  widgetOpacity = new Animated.Value(0.0001);
  open = false;

  dialogTransform = {
    transform: [
      {scale: this.animation},
      {
        translateY: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -HEIGHT / 2],
        }),
      },
      {
        translateX: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -WIDTH / 3],
        }),
      },
    ],
  };

  widgetTransform = {
    opacity: this.widgetOpacity,
    transform: [{scale: this.widgetOpacity}],
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Animated.View style={[styles.dialog, this.dialogTransform]}>
          <View style={{flexDirection: 'row'}}>
            <this.widget
              iconName="camerao"
              callback={this.openCamera}
              label="Camera"
            />

            <this.widget
              iconName="picture"
              callback={this.openGallery}
              label="Gallery"
            />

            <this.widget
              iconName="file1"
              callback={this.openDocument}
              label="Document"
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <this.widget
              iconName="picture"
              callback={() => {
                console.log('audio');
              }}
              label="Audio"
            />

            <this.widget
              iconName="enviromento"
              callback={() => {
                console.log('location');
              }}
              label="Location"
            />

            <this.widget
              iconName="contacts"
              callback={() => {
                console.log('contacts');
              }}
              label="Contacts"
            />
          </View>
        </Animated.View>

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

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;
    Animated.sequence([
      Animated.timing(this.animation, {
        toValue,
        // friction: 6,
        duration: 250,
      }),
      Animated.spring(this.widgetOpacity, {
        toValue,
        duration: 50,
      }),
    ]).start();
    this.open = !this.open;
  };

  widget = ({iconName, callback, label}) => {
    return (
      <Animated.View style={[styles.button, this.widgetTransform]}>
        <TouchableOpacity onPress={callback} style={{alignItems: 'center'}}>
          <AntDesign name={iconName} size={30} color="#ffc4a3" />
          <Text style={{color: 'gray', fontSize: 12}}>{label}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

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
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderRadius: 30,
    padding: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: 60,
    height: 60,
    justifyContent: 'center',
    // opacity: 0,
  },
  menu: {
    backgroundColor: '#ff9a76',
    opacity: 1,
    elevation: 5,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  dialog: {
    position: 'absolute',
    // borderWidth: 1,
    borderRadius: 40,
    // flexDirection: 'row',
    padding: 5,
    backgroundColor: '#ffffff',
    elevation: 5,
    top: -HEIGHT / 2,
  },
});
