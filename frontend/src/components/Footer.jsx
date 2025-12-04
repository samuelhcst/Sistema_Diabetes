const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/20 mt-20">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold">
              D
            </div>
            <p className="font-semibold text-foreground text-sm">
              DiabetesRisk <span className="text-muted-foreground font-normal">| Grupo 05</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} Proyecto UPN. Desarrollado con fines educativos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
