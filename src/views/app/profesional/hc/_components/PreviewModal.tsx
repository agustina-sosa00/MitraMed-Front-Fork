// PreviewModal.tsx
import { useState } from "react";
import { Modal } from "@/views/_components/Modal";
import { IoMdClose, IoMdArrowRoundBack } from "react-icons/io";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ActionButton } from "@/frontend-resourses/components";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type Props = {
  open: boolean;
  onClose: () => void;
  blob: Blob | null;
  ext: string | null; // "pdf" | "png" | "jpg" | ...
};

export default function PreviewModal({ open, onClose, blob, ext }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col w-full max-h-[90vh] min-w-[600px] h-auto overflow-y-auto">
        <div className="flex items-center justify-end w-full px-2">
          <ActionButton
            icon={<IoMdClose />}
            onClick={onClose}
            addClassName="text-xl text-primaryBlue rounded hover:bg-primaryBlue hover:text-white p-1"
          />
        </div>

        {!blob ? (
          <div className="grid flex-1 place-items-center text-primaryBlue/60">
            No hay archivo para mostrar
          </div>
        ) : ext === "pdf" ? (
          <div className="flex flex-col items-center flex-1">
            <Document
              file={blob}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              className="grid flex-1 w-full overflow-y-auto place-items-center"
            >
              <Page pageNumber={page} width={600} className="border rounded" />
            </Document>

            <div className="flex items-center gap-3 py-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className={`px-2 py-1 border rounded ${
                  page <= 1
                    ? "text-gray-400"
                    : "hover:bg-primaryBlue text-primaryBlue hover:text-white"
                }`}
              >
                <IoMdArrowRoundBack className="text-xl" />
              </button>
              <span className="text-primaryBlue">
                Página {page} de {numPages}
              </span>
              <button
                disabled={page >= numPages}
                onClick={() => setPage((p) => p + 1)}
                className={`px-2 py-1 border rounded ${
                  page >= numPages
                    ? "text-gray-400"
                    : "hover:bg-primaryBlue text-primaryBlue hover:text-white"
                }`}
              >
                <IoMdArrowRoundBack className="text-xl rotate-180" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center max-h-[70vh] overflow-y-auto px-4">
            <img
              src={URL.createObjectURL(blob)}
              className="max-h-full h-auto w-auto object-contain border rounded"
              style={{ display: "block" }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
