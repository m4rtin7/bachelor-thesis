import { Modal, Box } from '@mui/material'
import CodeEditor from '@uiw/react-textarea-code-editor'

import styles from '../styles/OutputModal.module.css'

type OutputModalProps = {
  open: boolean
  handleClose: (v: void) => void
  data: string
}

const OutputModal = ({ open, handleClose, data }: OutputModalProps) => {
  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalBox}>
        <CodeEditor
          value={data}
          language="plaintxt"
          padding={15}
          disabled={true}
          style={{
            fontSize: 16,
            backgroundColor: '#f5f5f5',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </Box>
    </Modal>
  )
}

export default OutputModal
