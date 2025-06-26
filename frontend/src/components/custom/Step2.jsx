
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
const Step2 = ({resume,setResume}) => {
    return (
        
        <Card>
                <CardHeader>
                    <CardTitle>Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={resume.summary || ''}
                        onChange={(e) => setResume(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="Write a brief professional summary..."
                        className="min-h-24"
                    />
                </CardContent>
            </Card >
  )
}

export default Step2