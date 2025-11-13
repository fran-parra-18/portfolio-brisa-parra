export default function Footer() {
  return (
    <footer className="py-8 bg-background border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground" style={{ fontSize: '100%' }}>
          &copy; {new Date().getFullYear()} Brisa Parra. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
