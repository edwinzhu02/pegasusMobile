import React, {Component} from 'react'
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native'
import { FlatGrid, SectionGrid } from 'react-native-super-grid';

class SessionList extends Component{
    static navigationOptions = {
        title: 'Session'
    };
    render(){
        const items = [
            { name: 'Check In', code: '#1abc9c',component: 'CheckIn' },
            { name: 'Check Out', code: '#2ecc71', component: 'CheckOut' },
            { name: 'Schedule', code: '#3498db', component: 'Schedule' },
            // { name: 'Feedback', code: '#9b59b6' },
            // { name: 'Release future', code: '#34495e' }, { name: 'Release future', code: '#16a085' },
            // { name: 'Release future', code: '#27ae60' }, { name: 'Release future', code: '#2980b9' },

        ];
        return (
            <FlatGrid
                itemDimension={130}
                items={items}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                // spacing={20}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate(item.component)}>
                            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                                <Text style={styles.itemName}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        )
    }
}
export default SessionList


const styles = StyleSheet.create({
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        alignSelf: 'center'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});
