import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Step3 = ({ resume, setResume }) => {
    const addSkill = (skill) => {
        if (skill.trim() && !resume.skills.includes(skill.trim())) {
            setResume(prev => ({
                ...prev,
                skills: [...prev.skills, skill.trim()]
            }))
        }
    }

    const removeSkill = (index) => {
        setResume(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                    {resume.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-2">
                            {skill}
                            <Button onClick={() => removeSkill(index)} variant={"ghost"} size="xs">
                                <X />
                            </Button>
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Input
                        placeholder="Add a skill"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                addSkill(e.target.value)
                                e.target.value = ''
                            }
                        }}
                    />
                    <Button
                        type="button"
                        size="sm"
                        onClick={(e) => {
                            const input = e.target.previousElementSibling
                            addSkill(input.value)
                            input.value = ''
                        }}
                    >
                        Add
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Step3
