import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import '../test/setup';
import { MockedProvider } from 'react-apollo/test-utils';
import HomeScreen from '../screens/HomeScreen';
import { getDataQuery } from '../test/queries';

function setup(props) {
  const mocks = [
    {
      request: { query: getDataQuery },
      result: { data: { quizViewer: { categories: ['Test'] } } }
    }
  ];
  return mount(<MockedProvider mocks={mocks} addTypename={false}>
    <HomeScreen {...props} />
  </MockedProvider>);
}

describe('<HomeScreen/>', () => {
  const props = {
    data: {}
  };

  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => { };
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('should matches the snapshot', () => {
    const wrapper = setup(props);
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('should contain Title', () => {
    const wrapper = setup(props);
    expect(wrapper.find('Title').exists()).toBe(true);
    expect(wrapper.find('Title').text()).toBe("Select Category");
  });

  it('should show/hide Spinner', async () => {
    const wrapper = setup(props);
    expect(wrapper.find('Spinner').exists()).toBe(true);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find('Spinner').exists()).toBe(false);
  });

  it('should category name', async () => {
    const wrapper = setup(props);
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
    expect(wrapper.find('Body').text()).toBe('Test');
  });

})