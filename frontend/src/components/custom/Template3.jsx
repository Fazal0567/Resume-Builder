import { 
    Github, 
    Globe, 
    Linkedin, 
    Mail, 
    MapPin, 
    Phone, 
   
    UserCircle, 
    Zap, 
    Briefcase, 
    GraduationCap, 
    Code, 
    Award, 
    Heart, 
    Calendar,
    ExternalLink
} from "lucide-react";

const Template3 = ({ resume }) => {
    return (
        <div className="bg-white overflow-y-scroll no-scrollbar font-sans h-fit shadow-xl rounded-lg lg:w-[594px] w-full mx-auto">
            
            {/* Header Section */}
            <div className="bg-slate-900 text-white px-6 py-8">
                <div className="text-center">
                   
                    <h1 className="text-3xl font-bold mb-2">
                        {resume.fullName || 'Your Name'}
                    </h1>
                    <p className="text-lg text-slate-300 mb-6">
                        {resume.role || 'Your Role'}
                    </p>
                    
                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {resume.contact?.email && (
                            <div className="flex items-center justify-center gap-2 text-slate-300">
                                <Mail className="w-4 h-4" />
                                <span>{resume.contact.email}</span>
                            </div>
                        )}
                        {resume.contact?.phone && (
                            <div className="flex items-center justify-center gap-2 text-slate-300">
                                <Phone className="w-4 h-4" />
                                <span>{resume.contact.phone}</span>
                            </div>
                        )}
                        {resume.contact?.linkedin && (
                            <a 
                                href={resume.contact.linkedin} 
                                target="_blank" 
                                className="flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                                <span>LinkedIn</span>
                            </a>
                        )}
                        {resume.contact?.github && (
                            <a 
                                href={resume.contact.github} 
                                target="_blank" 
                                className="flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                <span>GitHub</span>
                            </a>
                        )}
                        {resume.contact?.website && (
                            <a 
                                href={resume.contact.website} 
                                target="_blank" 
                                className="flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                <span>Website</span>
                            </a>
                        )}
                        {resume.contact?.location && (
                            <div className="flex items-center justify-center gap-2 text-slate-300">
                                <MapPin className="w-4 h-4" />
                                <span>{resume.contact.location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-6 space-y-6">
                
                {/* Summary Section */}
                {resume.summary && (
                    <section>
                        <div className="flex items-center gap-3 mb-3">
                            <UserCircle className="w-5 h-5 text-slate-600" />
                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 pb-1">
                                Professional Summary
                            </h2>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                            {resume.summary}
                        </p>
                    </section>
                )}

                {/* Skills Section */}
                {resume.skills && resume.skills.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-3">
                            <Zap className="w-5 h-5 text-slate-600" />
                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 pb-1">
                                Skills & Expertise
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {resume.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-slate-800 text-white px-3 py-2 rounded-full text-sm font-medium "
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience Section */}
                {resume.experience && resume.experience.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Briefcase className="w-5 h-5 text-slate-600" />
                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 pb-1">
                                Work Experience
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {resume.experience.map((exp, index) => (
                                <div key={index} className="border-l-4 border-slate-400 pl-4 hover:border-slate-600 transition-colors">
                                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                                            {exp.role || 'Position'}
                                        </h3>
                                        <p className="text-lg font-semibold text-slate-700 mb-2">
                                            {exp.company || 'Company'}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {exp?.startDate?.slice(0,10) || 'Start'} - {exp?.endDate?.slice(0,10) || 'End'}
                                        </p>
                                        {exp.description && (
                                            <p className="text-gray-700 leading-relaxed text-sm">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {resume.education && resume.education.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <GraduationCap className="w-5 h-5 text-slate-600" />
                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 pb-1">
                                Education
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {resume.education.map((edu, index) => (
                                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">
                                                {edu.degree || 'Degree'}
                                            </h3>
                                            <p className="text-lg font-semibold text-slate-700">
                                                {edu.institution || 'Institution'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {edu.startYear || 'Start'} - {edu.endYear || 'End'}
                                            </p>
                                            {edu.gpa && (
                                                <p className="text-sm font-semibold text-slate-800 mt-1">
                                                    GPA: {edu.gpa}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {resume.projects && resume.projects.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Code className="w-5 h-5 text-slate-600" />
                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 pb-1">
                                Featured Projects
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {resume.projects.map((project, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 ">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {project.name || 'Project Name'}
                                    </h3>
                                    {project.techStack && (
                                        <div className="mb-2">
                                            <span className="text-sm font-semibold text-gray-700">Tech Stack: </span>
                                            <span className="text-sm text-slate-600">
                                                {Array.isArray(project.techStack) 
                                                    ? project.techStack.join(', ') 
                                                    : project.techStack}
                                            </span>
                                        </div>
                                    )}
                                    {project.description && (
                                        <p className="text-gray-700 mb-3 leading-relaxed text-sm">
                                            {project.description}
                                        </p>
                                    )}
                                    <div className="flex gap-3">
                                        {project.liveDemo && (
                                            <a 
                                                href={project.liveDemo} 
                                                target="_blank" 
                                                className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-semibold text-sm border border-slate-300 px-3 py-1 rounded hover:bg-slate-50 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.github && (
                                            <a 
                                                href={project.github} 
                                                target="_blank" 
                                                className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-semibold text-sm border border-slate-300 px-3 py-1 rounded hover:bg-slate-50 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certificates Section */}
                {resume.certificates && resume.certificates.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Award className="w-5 h-5 text-slate-600" />
                            <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-900 pb-1">
                                Certificates & Achievements
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {resume.certificates.map((cert, index) => (
                                <div key={index} className="p-4 rounded-lg border border-slate-300">
                                    <h3 className="font-bold text-slate-800 mb-1">
                                        {cert.title || 'Certificate Name'}
                                    </h3>
                                    <p className="text-slate-600 mb-1 text-sm">
                                        {cert.issuer || 'Issuing Organization'}
                                    </p>
                                    {cert.year && (
                                        <p className="text-sm text-slate-800">{cert.year}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages & Interests Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Languages */}
                    {resume.languages && resume.languages.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-3">
                                <Globe className="w-4 h-4 text-slate-600" />
                                <h2 className="text-lg font-bold text-slate-900 border-b-2 border-slate-900 pb-1">
                                    Languages
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {resume.languages.map((lang, index) => (
                                    <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {typeof lang === 'object' 
                                            ? `${lang.name || lang}${lang.level ? ` (${lang.level})` : ''}` 
                                            : lang}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests */}
                    {resume.interests && resume.interests.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-3">
                                <Heart className="w-4 h-4 text-slate-600" />
                                <h2 className="text-lg font-bold text-slate-900 border-b-2 border-slate-900 pb-1">
                                    Interests
                                </h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm">
                                {resume.interests.join(', ')}
                            </p>
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Template3;