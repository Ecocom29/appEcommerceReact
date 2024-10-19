import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({titulo}) => {
  return (
    <Helmet>
        <title>{titulo} - Ecommerce App</title>
    </Helmet>
  )
}

export default MetaData;