import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const TodoItem = props=> {
    const { data: { body, status, id}, onPressItem, onLongPressItem, idx} = props;
    var backColorButton = status==='Active'? 'green': 'blue';
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: backColorButton}]} 
        onPress={onPressItem}
        onLongPress={onLongPressItem}
        >
            <Text style={styles.todoText}>{idx +1} . {body}</Text>
        </TouchableOpacity>
    );
}

export default TodoItem;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'brown',
        borderRadius: 10,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    todoText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    }
});