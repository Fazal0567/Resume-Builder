import ProgressIndicator from '@/components/custom/ProgressIndicator';
import Step1 from '@/components/custom/Step1';
import Step2 from '@/components/custom/Step2';
import Step3 from '@/components/custom/Step3';
import Step4 from '@/components/custom/Step4';
import Step5 from '@/components/custom/Step5';
import Step6 from '@/components/custom/Step6';
import Step7 from '@/components/custom/Step7';
import Step8 from '@/components/custom/Step8';
import Step9 from '@/components/custom/Step9';
import Template1 from '@/components/custom/Template1';
import Template2 from '@/components/custom/Template2';
import Template3 from '@/components/custom/Template3';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Loader2, Save } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner';

const EditResume = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [resume, setResume] = useState(null)
    const [saving, setSaving] = useState(false)
    const [step, setStep] = useState(1);
    const totalSteps = 9;
    const navigate = useNavigate()
    const [selectedTemplate, setSelectedTemplate] = useState('template1');

    const fetchResume = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/resumes/${id}`, {
                credentials: 'include'
            })
            const data = await res.json();
            if (res.ok) {
                // Ensure all required fields exist with defaults
                setResume({
                    fullName: data.fullName || '',
                    role:data.role || '',
                    contact: {
                        email: data.contact?.email || '',
                        phone: data.contact?.phone || '',
                        location: data.contact?.location || '',
                        linkedin: data.contact?.linkedin || '',
                        github: data.contact?.github || '',
                        website: data.contact?.website || ''
                    },
                    summary: data.summary || '',
                    skills: data.skills || [],
                    education: data.education || [],
                    experience: data.experience || [],
                    projects: data.projects || [],
                    certificates: data.certificates || [],
                    languages: data.languages || [],
                    interests: data.interests || []
                })
            } else {
                setResume(null)
            }
        } catch (error) {
            console.log(error.message)
           
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchResume()
    }, [id])


    const handleUpdateResume = async () => {
        if (!resume) return

        setSaving(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/resumes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(resume)
            })
            const data = await res.json();
            if (res.ok) {
                navigate("/profile")
                toast("Resume updated successfully.")
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setSaving(false)
        }
    }

    const handleNextClick = () => {
        if (step < totalSteps) {
            setStep(step + 1)
        }
    }

    const handlePrevClick = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }



    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading...</span>
            </div>
        )
    }

    if (!resume) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Resume not found.</p>
            </div>
        )
    }

    const renderCurrentStep = () => {
        const stepProps = { resume, setResume };
        switch (step) {
            case 1: return <Step1 {...stepProps} />;
            case 2: return <Step2 {...stepProps} />;
            case 3: return <Step3 {...stepProps} />;
            case 4: return <Step4 {...stepProps} />;
            case 5: return <Step5 {...stepProps} />;
            case 6: return <Step6 {...stepProps} />;
            case 7: return <Step7 {...stepProps} />;
            case 8: return <Step8 {...stepProps} />;
            case 9: return <Step9 {...stepProps} />;
            default: return <div>Invalid step</div>;
        }
    }

    return (
        <div className='container mx-auto min-h-screen p-5'>
            <div className="flex items-center justify-between mb-5">
                <h1 className="lg:text-3xl text-xl">Edit Resume</h1>
                <Button onClick={handleUpdateResume} disabled={saving}>
                    {saving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Resume
                        </>
                    )}
                </Button>
            </div>

            <ProgressIndicator currentStep={step} totalSteps={totalSteps} />


            <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
                <div>
                    <div className='flex gap-2 mb-5'>
                        <Button variant={'outline'} onClick={handlePrevClick}>Prev</Button>
                        <Button onClick={handleNextClick}>Next</Button>
                    </div>
                    {renderCurrentStep()}
                </div>
                <div>
                  <div className='mb-5'>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate} >
                        <SelectTrigger>
                            <SelectValue placeholder="Choose a template" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="template1">Template 1</SelectItem>
                            <SelectItem value="template2">Template 2</SelectItem>
                            <SelectItem value="template3">Template 3</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>

                    {selectedTemplate === 'template1' && <Template1 resume={resume} />}
                    {selectedTemplate === 'template2' && <Template2 resume={resume} />}
                    {selectedTemplate === 'template3' && <Template3 resume={resume} />}
                </div>
            </div>


        </div>
    )
}

export default EditResume