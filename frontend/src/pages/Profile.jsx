import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import CreateResume from "@/components/custom/CreateResume"
import { useNavigate } from "react-router-dom"
import { useResumeDialog } from "@/contexts/ResumeDialogContext"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useDispatch, useSelector } from "react-redux"
import { deleteResume, setResumes } from "@/redux/slices/resumeSlice"
import { Plus } from "lucide-react"
import ResumeDownloadModal from "@/components/custom/ResumeDownloadModal"



function Profile() {
  const { resumes } = useSelector(state => state.resume)
  const [currResumeId,setCurrResumeId] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { openDialog } = useResumeDialog()
  const fetchResumes = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/resumes`,
        {
          credentials: "include"
        }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to fetch resumes")
      dispatch(setResumes(data))
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (resumeId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/resumes/${resumeId}`, {
        method: "DELETE",
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Delete failed")
      toast.success(data.message)
      dispatch(deleteResume(resumeId))
    } catch (error) {
      toast.error(error.message)
    }
  }


  const handleEdit = resumeId => {
    // Redirect or open resume builder page
    navigate(`/resume/edit/${resumeId}`)
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  return (
    <section className="min-h-screen w-full">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">My Resumes</h1>
          <Button onClick={openDialog}> <Plus/> Create New Resume</Button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : resumes.length === 0 ? (
          <p className="text-gray-500">No resumes found. Create one!</p>
        ) : (
          <ul className="space-y-4">
            {resumes.map((resume) => (
              <li
                key={resume._id}
                className="flex justify-between items-center border p-4 rounded shadow"
              >
                <span className="font-medium">{resume.title}</span>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(resume._id)} size="sm" variant="outline">
                    Edit
                  </Button>

                  {/* ✅ AlertDialog for Delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your resume titled <strong>{resume.title}</strong>.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(resume._id)}
                          className="bg-destructive text-white hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button size={"sm"} onClick={()=>setCurrResumeId(resume._id)}>
                    View
                  </Button>
                </div>
              </li>
            ))}

          </ul>
        )}
      </div>
      <CreateResume />
      {
         currResumeId && <ResumeDownloadModal resumeId={currResumeId} onClose={setCurrResumeId}/>
      }
      
    </section>
  )
}

export default Profile
