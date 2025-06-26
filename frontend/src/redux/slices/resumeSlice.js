import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  resumes: [],
}

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumes:(state,action) => {
        state.resumes = action.payload
    },
   
    addResume: (state, action) => {
      state.resumes.push(action.payload)
    },
    deleteResume: (state, action) => {
      state.resumes = state.resumes.filter((resume)=>resume._id != action.payload)
    },
  },
})


export const {setResumes, addResume,deleteResume } = resumeSlice.actions

export default resumeSlice.reducer