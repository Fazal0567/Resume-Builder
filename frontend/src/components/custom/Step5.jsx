
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Plus, X } from 'lucide-react'



const Step5 = ({ resume, setResume }) => {

    const addProject = () => {
        setResume(prev => ({
            ...prev,
            projects: [...prev.projects, {
                name: '',
                description: '',
                techStack: [],
                github: '',
                liveDemo: ''
            }]
        }))
    }

    const removeProject = (index) => {
        setResume(prev => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }))
    }

    const updateProject = (index, field, value) => {
        setResume(prev => ({
            ...prev,
            projects: prev.projects.map((project, i) =>
                i === index ? { ...project, [field]: value } : project
            )
        }))
    }

    const addTechToProject = (projectIndex, tech) => {
        if (tech.trim()) {
            setResume(prev => ({
                ...prev,
                projects: prev.projects.map((project, i) =>
                    i === projectIndex ? {
                        ...project,
                        techStack: [...project.techStack, tech.trim()]
                    } : project
                )
            }))
        }
    }

    const removeTechFromProject = (projectIndex, techIndex) => {

        setResume(prev => ({
            ...prev,
            projects: prev.projects.map((project, i) =>
                i === projectIndex ? {
                    ...project,
                    techStack: project.techStack.filter((_, ti) => ti !== techIndex)
                } : project
            )
        }))
    }

    return (



        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Projects
                    <Button onClick={addProject} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Project
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {resume.projects.map((project, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-start">
                            <h4 className="font-medium">Project {index + 1}</h4>
                            <Button
                                onClick={() => removeProject(index)}
                                variant="outline"
                                size="sm"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <Input
                            value={project.name}
                            onChange={(e) => updateProject(index, 'name', e.target.value)}
                            placeholder="Project name"
                        />
                        <Textarea
                            value={project.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            placeholder="Project description..."
                            className="min-h-20"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                value={project.github}
                                onChange={(e) => updateProject(index, 'github', e.target.value)}
                                placeholder="GitHub URL"
                            />
                            <Input
                                value={project.liveDemo}
                                onChange={(e) => updateProject(index, 'liveDemo', e.target.value)}
                                placeholder="Live demo URL"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Tech Stack</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {project.techStack.map((tech, techIndex) => (
                                    <Badge key={techIndex} variant="secondary" className="flex items-center gap-2">
                                        <span>{tech}</span>

                                        <Button size={"xs"} onClick={() => removeTechFromProject(index, techIndex)} >
                                            <X className="h-3 w-3" />
                                        </Button>


                                    </Badge>

                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add technology"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            addTechToProject(index, e.target.value)
                                            e.target.value = ''
                                        }
                                    }}
                                />
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={(e) => {
                                        const input = e.target.previousElementSibling
                                        addTechToProject(index, input.value)
                                        input.value = ''
                                    }}
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default Step5