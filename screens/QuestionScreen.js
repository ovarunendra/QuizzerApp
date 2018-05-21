import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { Text } from 'react-native';
import { Container, Header, Body, Title, Content, Card, CardItem,
     Spinner, List, ListItem, CheckBox, Icon, Button } from 'native-base';

class QuestionScreen extends Component {

    static navigationOptions = {
        title: 'Question',
    };

    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0,
            isChecked: null,
            isSelectedCorrect: false,
        }
    }

    selectOption = (question, answer, index) => {
        const { correctAnswer } = question;
        this.setState((prevState, props) => ({
            isChecked: index,
            isSelectedCorrect: answer === correctAnswer,
        }));
    }

    renderOptions = (question) => {
        const { isChecked, isSelectedCorrect } = this.state;
        const { options } = question;
        return (
            <List>
                {options.map((answer, index) => {
                    return (
                        <ListItem key={answer} onPress={() => this.selectOption(question, answer, index)}>
                            <CheckBox checked={isChecked === index} color={isChecked === index && isSelectedCorrect ? 'green' : isChecked === index ? 'red' : ''} onPress={() => this.selectOption(question, answer, index)}/>
                            <Text style={{paddingHorizontal: 5}}>{answer}</Text>
                        </ListItem>
                    );
                })}
            </List>
        );
    };

    renderQuestion = () => {
        const { data } = this.props;
        const { currentIndex, isSelectedCorrect } = this.state;
        if(data.loading) {
            return <Spinner />
        }
        const { questions } = data.quizViewer;
        if(!questions.length || currentIndex > questions.length-1) {
            return (
                <Card>
                    <CardItem>
                        <Body>
                            <Text>No Questions Found</Text>
                        </Body>
                    </CardItem>
                </Card>
            );
        }
        const question = questions[currentIndex];
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text>{question.question}</Text>
                    </Body>
                </CardItem>
                {this.renderOptions(question)}
            </Card>
        );
    };

    nextQuestion = () => {
        this.setState((prevState, props) => ({
            isChecked: null,
            isSelectedCorrect: null,
            currentIndex: prevState.currentIndex + 1
        }));
    };

    render() {
        const { navigation } = this.props;
        const { isSelectedCorrect } = this.state;
        const category = navigation.getParam('category');
        return (
           <Container>
                <Content padder>
                    {this.renderQuestion()}
                    {isSelectedCorrect && <Button block success onPress={() => this.nextQuestion()}>
                        <Text style={{color: 'white'}}>Next</Text>
                        <Icon name="arrow-forward" />
                    </Button>}
                </Content>
            </Container>     
        );
    }
}

const GET_QUESTIONS = gql`
    query Question($difficulty: DifficultyType!, $category: CategoryType!) {
        quizViewer {
            questions(difficulty: $difficulty, category: $category) {
                id
                question
                correctAnswer
                options
            }
        }
    }
`;

const withQuestionData = graphql(GET_QUESTIONS, {
    options: ({ navigation }) => ({
        variables: {
            difficulty: 'Easy',
            category: navigation.getParam('category'),
        },
        notifyOnNetworkStatusChange: true,
        ssr: false,
    })
});

//make this component available to the app
export default (withQuestionData)(QuestionScreen);
