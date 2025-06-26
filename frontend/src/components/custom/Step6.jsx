
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, X } from 'lucide-react'



const Step6 = ({ resume, setResume }) => {


    const addExperience = () => {
        setResume(prev => ({
            ...prev,
            experience: [...prev.experience, {
                company: '',
                role: '',
                startDate: '',
                endDate: '',
                description: ''
            }]
        }))
    }   

    const removeExperience = (index) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }))
    }

    const updateExperience = (index, field, value) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) =>
                i === index ? { ...exp, [field]: value } : exp
            )
        }))
    }

    return (



        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Work Experience
                    <Button onClick={addExperience} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Experience
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {resume.experience.map((exp, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                            <h4 className="font-medium">Experience {index + 1}</h4>
                            <Button
                                onClick={() => removeExperience(index)}
                                variant="outline"
                                size="sm"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                placeholder="Company name"
                            />
                            <Input
                                value={exp.role}
                                onChange={(e) => updateExperience(index, 'role', e.target.value)}
                                placeholder="Job role"
                            />
                            <Input
                                value={exp.startDate}
                                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                placeholder="Start date"
                                type="date"
                            />
                            <Input
                                value={exp.endDate}
                                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                placeholder="End date"
                                type="date"
                            />
                        </div>
                        <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            placeholder="Job description and achievements..."
                            className="min-h-20"
                        />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default Step6