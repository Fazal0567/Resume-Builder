
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, X } from 'lucide-react'



const Step4 = ({ resume, setResume }) => {

    const addEducation = () => {
        setResume(prev => ({
            ...prev,
            education: [...prev.education, {
                institution: '',
                degree: '',
                fieldOfStudy: '',
                startYear: '',
                endYear: '',
                gpa:''
            }]
        }))
    }

    const removeEducation = (index) => {
        setResume(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }))
    }

    const updateEducation = (index, field, value) => {
        setResume(prev => ({
            ...prev,
            education: prev.education.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            )
        }))
    }

    return (


        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Education
                    <Button onClick={addEducation} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Education
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {resume.education?.map((edu, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                            <h4 className="font-medium">Education {index + 1}</h4>
                            <Button
                                onClick={() => removeEducation(index)}
                                variant="outline"
                                size="sm"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={edu.institution || ''}
                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                placeholder="Institution name"
                            />
                            <Input
                                value={edu.degree || ''}
                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                placeholder="Degree"
                            />
                          
                           
                              <Input
                                value={edu.gpa || ''}
                                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                                placeholder="Enter cgpa"
                            />
                            <div className="flex gap-2">
                                <Input
                                    value={edu.startYear || ''}
                                    onChange={(e) => updateEducation(index, 'startYear', e.target.value)}
                                    placeholder="Start year"
                                    type="number"
                                />
                                <Input
                                    value={edu.endYear || ''}
                                    onChange={(e) => updateEducation(index, 'endYear', e.target.value)}
                                    placeholder="End year"
                                    type="number"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default Step4