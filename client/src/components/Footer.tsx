export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-dark text-white/60 text-center text-sm relative z-10">
      <div className="container mx-auto px-6">
        <p>&copy; {currentYear} Hrishikesh Yadav. All rights reserved.</p>
        <p className="mt-2">Designed & Developed with <i className="fas fa-heart text-accent"></i> and AI.</p>
      </div>
    </footer>
  );
}
