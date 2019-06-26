import React,{Component} from 'react'
import {View, Text,StyleSheet} from 'react-native'
import moment from 'moment'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
export default class Schedule extends Component{
    static navigationOptions = {
        title: 'Schedule'
    };

    constructor(props) {
        super(props);
        this.state = {
            items: {},
            TodayDate: moment(new Date()).format('YYYY-MM-DD')
        };
    }


    loadItems(day) {
        // setTimeout(() => {
        //     for (let i = -15; i < 85; i++) {
        //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        //         const strTime = this.timeToString(time);
        //         if (!this.state.items[strTime]) {
        //             this.state.items[strTime] = [];
        //             const numItems = Math.floor(Math.random() * 5);
        //             for (let j = 0; j < numItems; j++) {
        //                 this.state.items[strTime].push({
        //                     name: 'Item for ' + strTime,
        //                     height: Math.max(50, Math.floor(Math.random() * 150))
        //                 });
        //             }
        //         }
        //     }
        //     //console.log(this.state.items);
        //     const newItems = {};
        //     Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        //     this.setState({
        //         items: newItems
        //     });
        // }, 1000);
        setTimeout(()=>{
            this.setState(
                {
                    items: {
                        "2019-06-30": [],
                        "2019-06-25": [],
                        "2019-06-27":[{"name":"18:30 one to one course","height":50},{"name":"20:30 one to one course","height":50}],
                        "2019-06-26":[{"name":"15:30 one to one course","height":50}],
                        "2019-06-28":[{"name":"10:00 group Course","height":50}],
                        "2019-06-29":[{"name":"11:00 one to one course","height":50}],
                        "2019-07-29":[{"name":"11:00 one to one course","height":50}],
                    }
                }
            )
        },1000)
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    renderEmptyDate() {
        return (
            <View/>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }


    render(){
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={this.state.TodayDate}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
            />
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});
