import React from "react";
import PropTypes from "prop-types";

import Modal from "../../components/UI/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

withErrorHandler.propTypes = {
  error: PropTypes.object,
  errorConfirmedHandler: PropTypes.func
};

export default withErrorHandler;
