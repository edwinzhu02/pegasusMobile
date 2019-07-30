import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    View,
    Text,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Button
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import EmojiSelector from 'react-native-emoji-selector';
export default class App extends React.Component {
    static navigationOptions = ({navigation}) =>( {
        title: navigation.getParam('name')
    });

    state = {
        messages: [],
        isEmojiPicker: false,
        leftInputIconName: 'ios-happy',
        text: "",
        textEditable: false
    }

    constructor(props){
        super(props)
        setTimeout(()=>{
            let message = this.state.messages.push({
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            })
            this.setState(previousState=>({
                message: GiftedChat.append(previousState.message,message)
            }))
        },1000)
    }


    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    renderAction = () => {
        return (
            <View style={{paddingLeft: 5,justifyItems:'center'}}>
                <TouchableOpacity onPress={()=>this.InputleftActionClickHandler()}>
                    <Icon style={{alignSelf:'center'}} name={this.state.leftInputIconName} size={34}/>
                </TouchableOpacity>
            </View>

    )
    }

    InputleftActionClickHandler = () =>{
        if (this.state.isEmojiPicker==false){
            Keyboard.dismiss()
            this.setState({
                isEmojiPicker: true,
                leftInputIconName: 'ios-keypad',
            })
        }else{
            this.setState({
                isEmojiPicker: false,
                leftInputIconName: 'ios-happy',
            })

        }
    }


    TextChangedHandler = (text) =>{
        this.setState({
            text: text
        })
    }

    TextInputFocus = () =>{
        if (this.state.isEmojiPicker==true){
            this.setState({
                leftInputIconName: 'ios-happy',
                isEmojiPicker: false,

            })
        }
    }


    render() {
        return (
            <View  style={{flex:1}}>
                <View style={{flex:3}}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        alwaysShowSend={true}
                        showUserAvatar={true}
                        placeholder={this.state.isEmojiPicker?"Close emoji picker":"Type a message..."}
                        text={this.state.text}
                        onInputTextChanged={text=>this.TextChangedHandler(text)}
                        showAvatarForEveryMessage={true}
                        renderUsernameOnMessage={true}
                        bottomOffset={50}
                        textInputProps={{
                            onFocus: this.TextInputFocus,
                            editable: !this.state.isEmojiPicker,
                        }}
                        // renderFooter={()=>()}
                        renderActions={()=>this.renderAction()}
                        user={{
                            _id: 1,
                            avatar: 'https://placeimg.com/640/480/any',
                            name: 'Oliver Deng',
                        }}
                    />
                </View>

                {this.state.isEmojiPicker?
                    <View style={{flex:2}}>
                        <EmojiSelector
                            showTabs={true}
                            showSearchBar={false}
                            showHistory={false}
                            columns={10}
                            onEmojiSelected={emoji => this.setState({
                                text: this.state.text + emoji
                            })}
                        />
                    </View>: null}
            </View>
        );
    }

}
