'use client';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify/amplify_outputs.json';

Amplify.configure(outputs);

export default Amplify;
