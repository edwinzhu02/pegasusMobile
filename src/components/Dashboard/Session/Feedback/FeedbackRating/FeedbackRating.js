import React, {Component} from 'react'
import FeedbackTeacher from './FeedbackTeacher/FeedbackTeacher'
import FeedbackLearner from './FeedbackLearner/FeedbackLearner'
import AsyncStorage from '@react-native-community/async-storage';

export default class FeedbackRating extends Component{
    static navigationOptions = {
        title: 'Feedback Rating'
    };

    constructor(props){
        super(props)
    }

    state = {
        rating: 3,
        commentToLearner: "",
        commentToSchool:"",
        commentToTeacher:"",
        role: null
    }

    ratingUpdate = (rating) =>{
        this.setState({
            rating: rating
        })
    }

    ResetHandler = () =>{
        this.setState({
            commentToLearner: "",
            commentToSchool:"",
            commentToTeacher:"",
            rating: 3
        })
    }

    ConfirmHandler = () =>{
        console.log(this.state)
        // this.props.navigation.navigate("Feedback")
    }

    componentWillMount = () =>{
        this.setState({
            role:'teacher'
        })
    }

    render(){
        if (this.state.role == 'teacher'){
            return (
                <FeedbackTeacher
                ratingUpdate={this.ratingUpdate.bind(this)}
                resetAll={()=>this.ResetHandler()}
                Confirm={()=>this.ConfirmHandler()}
                rating={this.state.rating}
                commentToLearner={this.state.commentToLearner}
                commentToSchool={this.state.commentToSchool}
                updateCommentToLearnerText={(text)=>this.setState({commentToLearner: text})}
                updateCommentToSchoolText={(text)=>this.setState({commentToSchool: text})}
            />
            )
        }else{
            return (
                <FeedbackLearner
                    rating={this.state.rating}
                    ratingUpdate={this.ratingUpdate.bind(this)}
                    updateCommentToTeacherText={(text)=>this.setState({commentToTeacher: text})}
                    commentToTeacher={this.state.commentToTeacher}
                    Confirm={()=>this.ConfirmHandler()}
                    resetAll={()=>this.ResetHandler()}

                />
            )
        }
    }
}
