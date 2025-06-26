import React, { useEffect, useState } from 'react'
import Template1 from '@/components/custom/Template1'
import Template2 from '@/components/custom/Template2'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import Template3 from './Template3'

const ResumeDownloadModal = ({ resumeId, onClose }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('template1');
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [resume,setResume] = useState(null)
    
     const generatePdf = async() => {
        setIsDownloading(true)
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/resumes/generate`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:'include',
                body:JSON.stringify({template:selectedTemplate,resumeId:resume._id})
            })
            const data = await res.json()
            if(data.success){
              window.open(data.url, '_blank');
            }else{
                toast("Pdf generation failed.")
            }
        }catch(error){
            console.log(error)
            toast("Pdf generation failed.")
        }finally{
            setIsDownloading(false)
        }
    }
    
    const fetchResume = async() => {
        setIsLoading(true)
        try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/resumes/${resumeId}`,{
                credentials:'include'
            })
            const data = await res.json()
            if(res.ok){
                setResume(data)
            }else{
                setResume(null)
            }
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        fetchResume()
    },[resumeId])
    
    return (
        <div className='h-screen w-full bg-black fixed top-0 left-0 p-5 overflow-y-scroll z-50'>
            <div className='absolute right-6 top-0 flex gap-2 p-2 z-50 '>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="template1">Template 1</SelectItem>
                        <SelectItem value="template2">Template 2</SelectItem>
                        <SelectItem value="template3">Template 3</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    onClick={generatePdf}
                    disabled={!resume || isLoading || isDownloading}
                >
                    {isDownloading ? 'Generating...' : 'Generate Pdf'}
                </Button>
                <Button variant="outline" onClick={() => onClose(null)}>
                    <X/>
                </Button>
            </div>

            {
               isLoading ? <p>Loading....</p> : resume ? <div className='mt-20'>
                {selectedTemplate === "template1" && <Template1 resume={resume} />}
                {selectedTemplate === "template2" && <Template2 resume={resume} />}
                {selectedTemplate === "template3" && <Template3 resume={resume} />}
            </div> : <p className='text-xl p-5 text-center text-white'>Resume not found</p>
            }
        </div>
    );
}

export default ResumeDownloadModal;