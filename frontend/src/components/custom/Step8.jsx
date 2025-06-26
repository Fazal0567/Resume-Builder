import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const Step8 = ({ resume, setResume }) => {
  const addLanguage = (language) => {
    const trimmed = language.trim()
    if (trimmed && !resume.languages.includes(trimmed)) {
      setResume(prev => ({
        ...prev,
        languages: [...prev.languages, trimmed]
      }))
    }
  }

  const removeLanguage = (index) => {
    setResume(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {resume.languages.map((language, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-2">
              {language}
              <Button onClick={() => removeLanguage(index)} size="xs">
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add a language"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addLanguage(e.target.value)
                e.target.value = ''
              }
            }}
          />
          <Button
            type="button"
            size="sm"
            onClick={(e) => {
              const input = e.target.previousElementSibling
              addLanguage(input.value)
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

export default Step8
