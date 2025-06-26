import CreateResume from '@/components/custom/CreateResume';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useResumeDialog } from '@/contexts/ResumeDialogContext';

 function Home() {
  const {openDialog} = useResumeDialog()
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <img src="./doc.png" alt="" className='rounded-full mx-auto mb-5 w-32'/>
          <h1 className="text-4xl font-bold  md:text-5xl">
            Build Professional Resumes Instantly
          </h1>
          <p className="mt-4 text-lg">
            Our resume builder helps you create a standout resume in minutes — no design skills required.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={openDialog}>Get Started</Button>
            <Button variant="outline">Live Demo</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Use Our Resume Builder?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Easy to Use',
                content: 'Simple drag-and-drop interface with pre-made templates.'
              },
              {
                title: 'Customizable Templates',
                content: 'Choose from a variety of styles that suit your career.'
              },
              {
                title: 'Export to PDF',
                content: 'Download your resume instantly in high-quality PDF format.'
              }
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  {feature.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-4">
            Ready to create your dream resume?
          </h3>
          <Button size="lg">
            Build Your Resume Now
          </Button>
        </div>
      </section>
      <CreateResume/>
     
    </div>
  );
}


export default Home