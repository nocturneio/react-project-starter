import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
  render() {
    return (
      <section>
        <h2 ref="title">404. Not found.</h2>
        <Link to="/">Accueil</Link>
      </section>
    );
  }
}
