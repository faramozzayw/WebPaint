import React, { Component, Fragments } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Portal from './Portal';

class Modal extends Component {
	render() {
		const { show } = this.props;
		return (
			<Fragments>
				{ show &&
					<Portal>
						<div className="modalOverlay">
							<div className="modalWindow">
								<div className="modalHeader">
									hehehe
								</div>
								<div className="modalBody">
									hehehe
								</div>
								<div className="modalFooter">
									hehehe
								</div>
							</div>
						</div>
					</Portal>
				}
			</Fragments>
		)
	}
}

const mapStateToProps = state => {
	return {
		show: state.modal.show
	}
}

/*const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		resetModal: changeThickness
	}, dispatch);
}*/

Modal.propTypes = {
	show: PropTypes.bool.isRequired
}

export default connect(mapStateToProps/*, mapDispatchToProps*/)(Modal);