import { Github, Globe, Linkedin, Mail, Phone } from "lucide-react";

const Template2 = ({ resume }) => {
    return (
        <div className="bg-gray-50 text-gray-900 font-sans mx-auto  shadow-md rounded-md  flex flex-col md:flex-row h-[842px] no-scrollbar  lg:w-[594px] w-full  overflow-y-scroll">
            {/* Sidebar */}
            <aside className="md:w-1/3 bg-white p-6 border-r space-y-6">
                {/* Name */}
                <div className="text-left">
                    <h1 className="text-3xl font-bold">{resume.fullName || 'Your Name'}</h1>
                    <h2 className="text-sm">{resume.role}</h2>
                    <p className="text-sm text-gray-600">{resume.contact?.location || ''}</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                    {resume.contact?.email && <p className="flex items-center"> <Mail size={15}/> {resume.contact.email}</p>}
                    {resume.contact?.phone && <p className="flex items-center"><Phone size={15}/> {resume.contact.phone}</p>}
                    {resume.contact?.website && <p className="flex items-center gap-1"><Globe size={15}/> <a href={resume.contact.website} target="_blank" className="text-blue-600 hover:underline">Website</a></p>}
                    {resume.contact?.linkedin && <p className="flex items-center gap-1"><Linkedin size={15}/> <a href={resume.contact.linkedin} target="_blank" className="text-blue-600 hover:underline">Profile</a></p>}
                    {resume.contact?.github && <p className="flex items-center gap-1"><Github size={15}/> <a href={resume.contact.github} target="_blank" className="text-blue-600 hover:underline">Repo</a></p>}
                </div>

                {/* Skills */}
                {resume.skills?.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold border-b border-gray-100 mb-2">Skills</h2>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                            {resume.skills.map((skill, i) => (
                                <li key={i}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Languages */}
                {resume.languages?.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Languages</h2>
                        <ul className="list-disc pl-5 text-sm">
                            {resume.languages.map((lang, i) => (
                                <li key={i}>
                                    {lang.name} {lang.level && `(${lang.level})`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Interests */}
                {resume.interests?.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Interests</h2>
                        {resume.interests.map((interest, i) => (
                                <li key={i}>
                                    {interest} 
                                </li>
                            ))}
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="md:w-2/3 p-6 space-y-6">
                {/* Summary */}
                {resume.summary && (
                    <section>
                        <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Summary</h2>
                        <p className="text-xs ">{resume.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {resume.experience?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Work Experience</h2>
                        <div className="space-y-4">
                            {resume.experience.map((exp, i) => (
                                <div key={i}>
                                    <h3 className="font-semibold">{exp.role}</h3>
                                    <p className="text-blue-600 text-sm">{exp.company}</p>
                                    <p className="text-xs text-gray-500">{exp.startDate?.slice(0,10)} - {exp.endDate?.slice(0,10)}</p>
                                    <p className="text-sm mt-1">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resume.education?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Education</h2>
                        <div className="space-y-3">
                            {resume.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-semibold">{edu.degree}</h3>
                                    <p className="text-blue-600 text-sm">{edu.institution}</p>
                                    <p className="text-xs text-gray-500">{edu.startYear} - {edu.endYear} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {resume.projects?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold border-b border-gray-300 pb-1  mb-2">Projects</h2>
                        <div className="space-y-3">
                            {resume.projects.map((proj, i) => (
                                <div key={i}>
                                    <h3 className="font-semibold">{proj.name}</h3>
                                    <p className="text-xs text-gray-600">{proj.description}</p>
                                    {proj.techStack && (
                                        <p className="text-xs text-blue-500">{proj.techStack.join(', ')}</p>
                                    )}
                                    <div className="flex gap-4 mt-1 text-sm">
                                        {proj.liveDemo && <a href={proj.liveDemo} target="_blank" className="text-blue-600 hover:underline">Live</a>}
                                        {proj.github && <a href={proj.github} target="_blank" className="text-blue-600 hover:underline">GitHub</a>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certificates */}
                {resume.certificates?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold border-b pb-1 mb-2">Certificates</h2>
                        <ul className="text-sm space-y-2">
                            {resume.certificates.map((cert, i) => (
                                <li key={i}>
                                    <strong>{cert.title}</strong> – {cert.issuer} {cert.year && `(${cert.year})`}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Template2;
