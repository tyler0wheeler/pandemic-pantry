import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function RegisterError(props) {
  const [open, setOpen] = React.useState(true)

  return (
    <Modal
    size="mini"
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    >
      <Modal.Header className="error-modal-header">Error in Registration</Modal.Header>
      <Modal.Content className="error-modal-content">
        <Modal.Description>
          <p id="error-modal-paragraph">
            This Username is already in use.  Please select another. Thank You.
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className="error-modal-actions">
        <Button className="error-modal-buttons" onClick={() => props.closeErrorModals()}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default RegisterError