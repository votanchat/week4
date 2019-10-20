import React from 'react';
import {
  View, TextInput, StyleSheet, ScrollView, TouchableOpacity,
  Alert, ImageBackground, KeyboardAvoidingView, Text, StatusBar, Platform
}
  from 'react-native';
import { TODOS } from '../utils/data';
import TodoItem from '../components/TodoItem';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class AllScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TodoList: TODOS,
      inputText: '',
    };
  }

  onChangeText = text => {
    this.setState({
      inputText: text
    }
    );
  }

  onSubmit = () => {
    if (this.state.inputText.toString().trim() !== '') {
      const newTodoItem = {
        body: this.state.inputText,
        status: 'Active',
        id: this.state.TodoList[this.state.TodoList.length-1].id + 1,
      };
      //const newTodoList = TODOS.concat(newTodoItem);
      const newTodoList = [...this.state.TodoList, newTodoItem];
      this.setState({
        TodoList: newTodoList,
        inputText: '',
      })
    }
    else { Alert.alert("Vui lòng nhập vào!"); }
  }

  onPressItem = id => {
    const { TodoList } = this.state;
    const todo = TodoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = TodoList.findIndex(todo => todo.id === id);
    TodoList[foundIndex] = todo;
    const newTodoList = [...TodoList];
    this.setState({
      TodoList: newTodoList,
    });
    setTimeout(() => {
      this.props.navigation.navigate('SingleTodo', { ...todo });
    }, 500);
  }

  onDeleteTodo = id => {
  const newTodoList = this.state.TodoList.filter(todo => todo.id !== id);
  this.setState(
    {
      TodoList: newTodoList,
    }
  );
};

  onLongPressItem = todo => {
  const prompt = `"${todo.body}"`;
  Alert.alert(
    'Delete your todo?',
    prompt,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => this.onDeleteTodo(todo.id) }
    ],
    { cancelable: true }
  );
};

  render() {
    //console.log(TODOS);
    const { TodoList, inputText } = this.state;
    return (
      <ImageBackground style={styles.container}
        source={{
          uri: "https://cdn.unlockboot.com/wp-content/uploads/2017/12/iphone-6s-wallpapers-stock.png"
        }}>
        <StatusBar translucent height={STATUSBAR_HEIGHT} barStyle="light-content" />
        <KeyboardAvoidingView
          enabled behavior="padding">
          <ScrollView style={styles.scrollView}>
            <View style={{
              backgroundColor: 'rgba(0,0,0,0.6)', paddingVertical: 20,
              paddingHorizontal: 10, borderRadius: 10,
            }}>
              <View style={{width: '100%',justifyContent: 'center', alignItems:'center' }}>
                <Text style={{color:'#ffff', fontSize: 25, fontWeight: 'bold'}}>TODO LIST({TodoList.length})</Text>
              </View>
              {
                TodoList.map((item, index) => {
                  console.log(index);
                  return (
                    <View key={item.id}>
                      <TodoItem idx={index} data={item} onPressItem={() => this.onPressItem(item.id)} onLongPressItem={()=>this.onLongPressItem(item)} />
                    </View>
                  );
                })
              }
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.todoInput} onChangeText={this.onChangeText} value={inputText} />
              <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            {/* <Button style={styles.buttonSubmit} title='Submit' onPress={this.onSubmit} /> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

AllScreen.navigationOptions = {
  //title: 'All Todos'
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    backgroundColor: 'black',
    justifyContent: 'center'
  },

  todoInput: {
    width: '100%',
    minHeight: 40,
    color: 'white',
    borderWidth: 1,
    marginTop: '15%',
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  scrollView: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 15,
  }
});