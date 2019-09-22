import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
export default class ChatBox extends React.Component {
    static navigationOptions = ({navigation}) =>( {
        title: ""
    });

    state = {
        messages: [],
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




    render() {
        return (
            <GiftedChat
                // renderFooter={()=>{return (<Text>xxx is typing ...</Text>)}}
                renderUsernameOnMessage={true}
                showUserAvatar={true}
                // loadEarlier={true}
                placeholder="Type a message..."
                alwaysShowSend={true}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                    name: 'Oliver',
                    avatar: 'https://placeimg.com/140/140/any',
                }}
            />
        );
    }

}
