import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.course.id !== this.props.course.id) {
      this.setState({ course: Object.assign({}, this.props.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    const course = this.state.course;
    course[field] = event.target.value;
    return this.setState({ course });
  }

  saveCourse(event) {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    this.context.router.history.push('/courses');
  }

  render() {
    return (
      <div>
        <h1>Manage Course</h1>
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object,
};

function getCourseById(courses, id) {
  const course = courses.find(course => course.id === id);
  return course ? course : null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.id;

  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: '',
  };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName,
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCoursePage);
