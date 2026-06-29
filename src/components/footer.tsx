export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 mt-auto">
      <div className="section-shell flex flex-col gap-4 text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row sm:justify-between">
        <span>© 2026 VYROX. Wear your attitude.</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
          <a href="#shipping" className="hover:text-primary transition-colors">Shipping</a>
        </div>
      </div>
    </footer>
  );
}
