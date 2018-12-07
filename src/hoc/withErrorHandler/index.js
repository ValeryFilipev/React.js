import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Modal from '../../components/UI/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
      };
    }

    componentWillMount () {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
      })
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    };

    render () {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {
              this.state.error
              ?
              this.state.error.message
              :
              null
            }
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      )
    }
  }
};

withErrorHandler.propTypes = {
  errorConfirmedHandler: PropTypes.func
};

export default withErrorHandler;