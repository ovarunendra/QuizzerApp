import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Text } from 'react-native';
import { Container, Header, Body, Title, Content, Card, CardItem, Spinner } from 'native-base';

const getDataQuery = gql`
    {
	    quizViewer {
            categories
	    }
    }
`;

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Quizz',
    };

    constructor(props){
        super(props);
    }

    renderCategories = () => {
        const { data, navigation } = this.props;
        if(data.loading) {
            return <Spinner />
        }
        const { categories } = data.quizViewer;
        return categories.map(category => {
            return (
               <Card key={category}>
                    <CardItem button onPress={() => navigation.navigate('QuestionScreen', {category})}>
                        <Body>
                            <Text>{category}</Text>
                        </Body>
                    </CardItem>
                </Card> 
            );
        })
    };

    render() {
        return (
           <Container>
                <Header noLeft style={{backgroundColor: 'green'}}>
                    <Title style={{color: 'white'}}>Select Category</Title>
                </Header>
                <Content padder>
                    {this.renderCategories()}
                </Content>
            </Container>     
        );
    }
}

//make this component available to the app
export default graphql(getDataQuery)(HomeScreen);
