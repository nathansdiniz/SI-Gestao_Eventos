import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog";

const Spinner = () => (
  <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-yellow-600 border-t-transparent"></div>
);

const Carregando = ({ open }: { open: boolean }) => (
  <Dialog open={open}>
    <DialogOverlay className="fixed inset-0 bg-transparent" />
    <DialogContent className="flex items-center justify-center bg-transparent">
      <Spinner />
      <p className="ml-4 text-2xl">Carregando...</p>
    </DialogContent>
  </Dialog>
);

export default Carregando;
