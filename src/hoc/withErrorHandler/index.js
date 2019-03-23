import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/UI/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);
    
      const reqInterceptor = axios.interceptors.request.use(request => {
        setError(null);
        return request;
      });
      const resInterceptor = axios.interceptors.response.use(response => response, err => {
        setError(err);
      });
  
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }
    }, [reqInterceptor, resInterceptor]);
  
    const errorConfirmedHandler = () => {
      setError(null);
    };
  
    return (
      <>
        <Modal
          show={error}
          modalClosed={errorConfirmedHandler}>
          {
            error
              ?
              error.message
              :
              null
          }
        </Modal>
        <WrappedComponent {...props} />
      </>
    )
  }
};

withErrorHandler.propTypes = {
  error: PropTypes.object,
  errorConfirmedHandler: PropTypes.func
};

export default withErrorHandler;