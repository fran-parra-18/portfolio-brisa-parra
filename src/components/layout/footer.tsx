export default function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4 text-center">
        {/* 
          Puedes cambiar el tamaño del texto del pie de página aquí.
          Usa clases de Tailwind como text-xs, text-sm, text-base.
          El estilo inline 'fontSize' se puede eliminar y controlar todo con Tailwind.
        */}
        <p className="text-sm text-muted-foreground" style={{ fontSize: '100%' }}>
          &copy; {new Date().getFullYear()} Brisa Parra. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
