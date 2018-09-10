import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path="/" component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:id?" component={ManageCoursePage} />
        <Route path="/about" component={AboutPage} />
      </Layout>
    );
  }
}

export default App;
