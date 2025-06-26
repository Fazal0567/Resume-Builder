
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


const Step1 = ({ setResume, resume }) => {
    return (

        <Card>
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">




                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <Label htmlFor="fullName" className={"mb-1"}>Full Name</Label>
                        <Input
                            id="fullName"
                            value={resume.fullName || ''}
                            onChange={(e) => setResume(prev => ({ ...prev, fullName: e.target.value }))}
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="role" className={"mb-1"}>Role</Label>
                        <Input
                            id="role"
                            value={resume.role || ''}
                            onChange={(e) => setResume(prev => ({ ...prev, role: e.target.value }))}
                            placeholder="Enter your role"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className={"mb-1"}>Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={resume.contact?.email || ''}
                            onChange={(e) => setResume(prev => ({
                                ...prev,
                                contact: { ...prev.contact, email: e.target.value }
                            }))}
                            placeholder="your.email@example.com"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone" className={"mb-1"}>Phone</Label>
                        <Input
                            id="phone"
                            value={resume.contact?.phone || ''}
                            onChange={(e) => setResume(prev => ({
                                ...prev,
                                contact: { ...prev.contact, phone: e.target.value }
                            }))}
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                    <div>
                        <Label htmlFor="location" className={"mb-1"}>Location</Label>
                        <Input
                            id="location"
                            value={resume.contact?.location || ''}
                            onChange={(e) => setResume(prev => ({
                                ...prev,
                                contact: { ...prev.contact, location: e.target.value }
                            }))}
                            placeholder="City, State, Country"
                        />
                    </div>
                    <div>
                        <Label htmlFor="linkedin" className={"mb-1"}>LinkedIn</Label>
                        <Input
                            id="linkedin"
                            value={resume.contact?.linkedin || ''}
                            onChange={(e) => setResume(prev => ({
                                ...prev,
                                contact: { ...prev.contact, linkedin: e.target.value }
                            }))}
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>
                    <div>
                        <Label htmlFor="github" className={"mb-1"}>GitHub</Label>
                        <Input
                            id="github"
                            value={resume.contact?.github || ''}
                            onChange={(e) => setResume(prev => ({
                                ...prev,
                                contact: { ...prev.contact, github: e.target.value }
                            }))}
                            placeholder="https://github.com/yourusername"
                        />
                    </div>
                    <div>
                        <Label htmlFor="website" className={"mb-1"}>Website</Label>
                        <Input
                            id="website"
                            value={resume.contact?.website || ''}
                            onChange={(e) => setResume(prev => ({
                                ...prev,
                                contact: { ...prev.contact, website: e.target.value }
                            }))}
                            placeholder="https://yourwebsite.com"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>


    )
}

export default Step1