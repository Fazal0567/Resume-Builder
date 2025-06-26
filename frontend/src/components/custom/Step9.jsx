import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Step9 = ({ resume, setResume }) => {
    const addInterest = (interest) => {
        if (interest.trim() && !resume.interests.includes(interest.trim())) {
            setResume(prev => ({
                ...prev,
                interests: [...prev.interests, interest.trim()]
            }))
        }
    }

    const removeInterest = (index) => {
        setResume(prev => ({
            ...prev,
            interests: prev.interests.filter((_, i) => i !== index)
        }))
    }
    return (

        <Card>
            <CardHeader>
                <CardTitle>Interests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                    {resume.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-2">
                            {interest}
                           <Button  onClick={() => removeInterest(index)} size={"xs"}>
                                <X/>
                           </Button>
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Input
                        placeholder="Add an interest"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                addInterest(e.target.value)
                                e.target.value = ''
                            }
                        }}
                    />
                    <Button
                        type="button"
                        size="sm"
                        onClick={(e) => {
                            const input = e.target.previousElementSibling
                            addInterest(input.value)
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

export default Step9