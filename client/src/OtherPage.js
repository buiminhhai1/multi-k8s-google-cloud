import React from 'react';
import { Link } from 'react-router-dom';

export default function OtherPage() {
  console.log('go here')
  return (
    <div>
      I'm some other page!
      <Link to="/">Go back home</Link>
    </div>
  )
}