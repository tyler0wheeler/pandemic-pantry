import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function LoginError(props) {
  const [open, setOpen] = React.useState(true)

  return (
    <Modal
    size="mini"
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    >
      <Modal.Header className="error-modal-header">Error Logging In</Modal.Header>
      <Modal.Content className="error-modal-content">
        <Modal.Description>
          <p id="error-modal-paragraph">
            The Username and Password do not match one another. If you do not have an account, please Register. Otherwise, try again.
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

export default LoginError
