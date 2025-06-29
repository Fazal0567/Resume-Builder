const Footer = () => {
    return (
        <footer className="border-t mt-auto py-6">
            <div className="container mx-auto px-4 text-center text-sm">
               <a 
                 href="https://mohd-fazal-ali.onrender.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-500 hover:underline"
               >
                 Mohd Fazal Ali
               </a> © {new Date().getFullYear()} ALL Rights Reserved
            </div>
        </footer>
    )
}

export default Footer
