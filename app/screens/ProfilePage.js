import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Share,
    Linking,
    Platform,
    WebView, ListView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions,NavigationActions, Header } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import stylesCss from '../assets/css/style.js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ScannerQR from './ScannerQR.js';
import ConfettiView from 'react-native-confetti-view';
import CardFlip from 'react-native-card-flip';
import Api from '../config/api.js';
import Maps from '../config/maps.js';

import LocalStorage from '../config/localStorage.js';
import HTML from 'react-native-render-html';
import ImageSlider from 'react-native-image-slider';
import {PacmanIndicator} from 'react-native-indicators';
import MyWebView from 'react-native-webview-autoheight';
import LinearGradient from 'react-native-linear-gradient';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';
import Video from "react-native-af-video-player/components/Video";

const MapHtml = require('../assets/mapHTML.html');


class ProfilePage extends Component {



    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            author: '',
            loading: false,
            scroll: true,
        }

    };


    render() {
        let map = Maps.getInstance()
        console.log(map.getMap('peizerweg 48'))
        const { navigation } = this.props;

        const title = navigation.getParam('title', '');
        const content = navigation.getParam('content', '');
        const authorName = navigation.getParam('author', '');
        const profilePicture = navigation.getParam('profilePicture', '');
        const link = navigation.getParam('link', '');
        const img = navigation.getParam('img', '');
        userdata = {
            id: navigation.getParam('leaderId', '')
        }
        console.log(userdata)
        let api = Api.getInstance()
        api.callApi('api/getLeader','POST', userdata, response => {
            console.log(response)
            this.setState({author: response});
        });
        let imageBackground = <ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')}
                                               style={{width: '100%', height: '100%'}}>
            <LinearGradient
                colors={['#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201']}
                style={{height: Header.HEIGHT}}
            >
                <Toolbar
                    iconSet="MaterialCommunityIcons"
                    centerElement={`Profiel van: ${this.state.author.leaderFirstName}`}
                    leftElement={("arrow-left")}
                    onLeftElementPress={() => this.props.navigation.goBack()}
                />
            </LinearGradient>
            {this.state.loading &&
            <PacmanIndicator color='white'/>
            }
            {!this.state.loading &&
            <View style={styles.cardContainer}>
                <View style={styles.card} elevation={5}>
                    <ScrollView scrollEnabled={this.state.scroll}
                                style={{height: Dimensions.get('window').height - 160, borderRadius: 10,}}>
                        <View style={styles.cardTitle} elevation={5}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 10,
                                width: '100%'
                            }}>
                                <Image
                                    source={{uri: profilePicture}}
                                    resizeMode="cover"
                                    style={{width: 50, height: 50, borderRadius: 10}}
                                />
                                <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            color: 'black'
                                        }}>
                                        {this.state.author.leaderFirstName} {this.state.author.leaderLastName}
                                    </Text>
                                    <Text style={{fontSize: 14, color: 'black'}}>
                                        {this.state.author.leaderEmail}
                                    </Text>
                                </View>
                            </View>
                        </View>


                        <HTML onLinkPress={(evt, href) => {
                            Linking.openURL(href);
                        }} containerStyle={{marginLeft: 10, marginRight: 10}} ignoredTags={['img']} html={' '}
                              imagesMaxWidth={Dimensions.get('window').width}/>
                        <View style={{margin: 20,}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15,}}>
                                Meer over mij:
                            </Text>


                            <Text style={{padding: 10,}}>
                                {this.state.author.leaderBiography}
                            </Text>

                        </View>
                        <View style={{width: '100%', height: 200, paddingBottom: 10, marginBottom: 20}}>
                            <Video source={{uri: 'urlhiero'}}   // Can be a URL or a local file.
                                   ref={(ref) => {
                                       this.player = ref
                                   }}                                      // Store reference
                                   onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                   onError={this.videoError}               // Callback when video cannot be loaded
                                   style={styles.backgroundVideo}/>
                        </View>
                        <View style={{
                                margin: 10,
                                borderRadius: 5,
                                backgroundColor: 'green',}}>
                            <Text style={{textAlign: 'center',fontWeight: 'bold', fontSize: 15,color: 'white',padding: 10,}}>
                                Klik hier voor alle activiteiten van {this.state.author.leaderFirstName}
                                </Text>
                                            /* Als het kan graag hier de activiteiten van de begeleider. */
                        </View>
                    </ScrollView>
                </View>
            </View>
            }
        </ImageBackground>;
        return imageBackground;
    }
}



const styles = StyleSheet.create({

    cardContainer:{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 150

    },

    card: {
        backgroundColor: 'white',
        margin: 10,
        marginBottom: 0,
        borderRadius: 10,
        shadowOffset: {width: 0, height: 13},
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 3,
    },

    cardTitle: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        margin: 0,
        padding: 0,
    },
})


export default ProfilePage;