import React, { createContext, useContext, useState } from "react"

const ResumeDialogContext = createContext({
  open: false,
  openDialog: () => {},
  closeDialog: () => {}
})

export const ResumeDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false)

  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)

  return (
    <ResumeDialogContext.Provider value={{ open, openDialog, closeDialog }}>
      {children}
    </ResumeDialogContext.Provider>
  )
}

export const useResumeDialog = () => useContext(ResumeDialogContext)
