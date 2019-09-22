import React, {Component} from 'react'
import {View,StyleSheet,Text} from 'react-native'
import {Card, Title,Paragraph} from 'react-native-paper'
import {Rating} from 'react-native-elements'

const FeedbackViewItem = (props)=>{
    return (
        <View style={styles.container}>
            <Card>
                <Card.Title
                    title= {props.name}
                    subtitle={`lesson date: ${props.lessonStartDate}`}
                    right={(a)=>(
                        <Rating
                            imageSize={20}
                            readonly
                            startingValue={props.rating}
                        />
                    )}
                />
                <Card.Content>
                    <Paragraph>{props.comment}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        paddingBottom: 13
    }
})

export default FeedbackViewItem
