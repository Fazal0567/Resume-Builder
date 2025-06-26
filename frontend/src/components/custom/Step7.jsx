
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, X } from 'lucide-react'



const Step7 = ({ resume, setResume }) => {


    const addCertificate = () => {
        setResume(prev => ({
            ...prev,
            certificates: [...prev.certificates, {
                title: '',
                issuer: '',
                year: '',
                link: ''
            }]
        }))
    }

    const removeCertificate = (index) => {
        setResume(prev => ({
            ...prev,
            certificates: prev.certificates.filter((_, i) => i !== index)
        }))
    }

    const updateCertificate = (index, field, value) => {
        setResume(prev => ({
            ...prev,
            certificates: prev.certificates.map((cert, i) =>
                i === index ? { ...cert, [field]: value } : cert
            )
        }))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Certificates
                    <Button onClick={addCertificate} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Certificate
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {resume.certificates.map((cert, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                            <h4 className="font-medium">Certificate {index + 1}</h4>
                            <Button
                                onClick={() => removeCertificate(index)}
                                variant="outline"
                                size="sm"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={cert.title}
                                onChange={(e) => updateCertificate(index, 'title', e.target.value)}
                                placeholder="Certificate title"
                            />
                            <Input
                                value={cert.issuer}
                                onChange={(e) => updateCertificate(index, 'issuer', e.target.value)}
                                placeholder="Issuing organization"
                            />
                            <Input
                                value={cert.year}
                                onChange={(e) => updateCertificate(index, 'year', e.target.value)}
                                placeholder="Year obtained"
                            />
                            <Input
                                value={cert.link}
                                onChange={(e) => updateCertificate(index, 'link', e.target.value)}
                                placeholder="Certificate URL"
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default Step7