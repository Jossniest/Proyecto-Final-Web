import React from 'react';

import { withFirebase } from '../../config/fire';

const SignOutButton = ({ firebase }) => (
  <a onClick={firebase.doSignOut}>
    Cerrar Sesion
  </a>
);

export default withFirebase(SignOutButton);