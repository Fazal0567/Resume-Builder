import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "../../contexts/UserContext"
import { useResumeDialog } from "../../contexts/ResumeDialogContext"
import { useDispatch } from "react-redux"
import { addResume } from "@/redux/slices/resumeSlice"
import { useNavigate } from "react-router-dom"

function CreateResume() {
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const { open, closeDialog } = useResumeDialog()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!user) {
      return toast("Please login.")
    }

    setLoading(true)

    try {  
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/resumes/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ title })
        }
      )

      const data = await res.json()

      if (!res.ok) throw new Error("Resume creation failed !")

      dispatch(addResume(data))

      toast.success("Resume created successfully.")

      closeDialog()
      navigate(`/resume/edit/${data._id}`)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Resume</DialogTitle>
            <DialogDescription>
              Enter a title to create your resume.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Unique title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter resume title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

        

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateResume
