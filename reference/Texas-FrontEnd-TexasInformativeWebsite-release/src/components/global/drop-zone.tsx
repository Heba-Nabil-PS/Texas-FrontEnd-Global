import { useDropzone } from "react-dropzone";
import { MAX_FILE_SIZE, AVAILABE_FILE_TYPES } from "@/constants";

type DropzoneProps = {
  fileRejections: string[];
  setFileRejections: React.Dispatch<React.SetStateAction<string[]>>;
  setAcceptedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  acceptedFiles: File[];
  resources: {
    "file-size-exceeds-the-limit-of-5mb": string;
    "invalid-file-type-only-are-allowed": string;
    "you-can-only-upload-maximum": string;
    files: string;
    "total-files-size-exceeds-the-limit": string;
    "upload-files": string;
    "drag-and-drop": string;
    "max-files-total": string;
  };
};

type FilePreviewsProps = {
  acceptedFiles: File[];
  removeFile: (fileToRemove: any) => void;
};

const FilePreviews = (props: FilePreviewsProps) => {
  const { removeFile, acceptedFiles } = props;

  return (
    <>
      {acceptedFiles.length > 0 &&
        acceptedFiles.map((file, i) => (
          <div
            key={i}
            className="mb-5 rounded-md border border-white bg-transparent px-8 py-4"
          >
            <div className="flex items-center justify-between">
              <span className="truncate pr-3 text-base font-medium text-white">
                {file.name}
              </span>
              <button
                type="button"
                className="text-white"
                onClick={() => removeFile(file)}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

const FileErrorMessages = (props: { fileRejections: string[] }) => {
  const { fileRejections } = props;

  return (
    <ul>
      {fileRejections.length > 0 &&
        fileRejections.map((message, index) => (
          <li key={index} className="text-sm font-medium text-red-500">
            {message}
          </li>
        ))}
    </ul>
  );
};

export function Dropzone(props: DropzoneProps) {
  const {
    acceptedFiles,
    fileRejections,
    setAcceptedFiles,
    setFileRejections,
    resources,
  } = props;

  // file controller and validator | we will not validate with the form schema
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // accept: AVAILABE_FILE_TYPES.reduce((acc, type) => {
    //   const key = Object.keys(type)[0];
    //   return { ...acc, [key]: [] };
    // }, {}),
    validator: (file) => {
      if (file.size > MAX_FILE_SIZE) {
        return {
          code: "file-too-large",
          message: resources["file-size-exceeds-the-limit-of-5mb"],
        };
      }

      if (
        !AVAILABE_FILE_TYPES.some((typeObj) =>
          Object.keys(typeObj).includes(file.type),
        )
      ) {
        return {
          code: "invalid-type",
          message: resources["invalid-file-type-only-are-allowed"],
        };
      }

      return null;
    },
    // avoid duplicated files to show only ones
    onDropAccepted: (files) => {
      setFileRejections([]);
      const newUniqueFiles = files.filter(
        (newFile) => !acceptedFiles.some((file) => file.name === newFile.name),
      );

      const MAX_FILES_COUNT = 5;
      const MAX_TOTAL_SIZE = MAX_FILE_SIZE; // 5MB

      const currentTotalSize = acceptedFiles.reduce(
        (acc, file) => acc + file.size,
        0,
      );
      const newFilesSize = newUniqueFiles.reduce(
        (acc, file) => acc + file.size,
        0,
      );
      const totalSize = currentTotalSize + newFilesSize;

      if (acceptedFiles.length + newUniqueFiles.length > MAX_FILES_COUNT) {
        setFileRejections((prev) => [
          ...prev,
          `${resources["you-can-only-upload-maximum"]} ${MAX_FILES_COUNT} ${resources["files"]}.`,
        ]);
        return;
      }

      if (totalSize > MAX_TOTAL_SIZE) {
        setFileRejections((prev) => [
          ...prev,
          resources["total-files-size-exceeds-the-limit"],
        ]);
        return;
      }

      setAcceptedFiles((prev) => [...prev, ...newUniqueFiles]);
    },
    onDropRejected: (rejections) => {
      if (rejections && rejections.length > 0) {
        const rejectionMessages = rejections.flatMap(({ errors }) =>
          errors.map((error: any) => error.message),
        );
        // avoid duplicated error messages to show only ones
        setFileRejections((prev) => {
          return Array.from(new Set(prev.concat(rejectionMessages)));
        });
      }
    },
  });

  const removeFile = (fileToRemove: any) => {
    setFileRejections([]);
    setAcceptedFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  return (
    <>
      <label className="mb-1 block px-5 text-base text-white">
        {resources["upload-files"]}
      </label>
      <div
        {...getRootProps()}
        className={`mb-4 cursor-pointer border-b-2 border-white text-center ${
          isDragActive ? "bg-gray-100" : "bg-transparent"
        }`}
      >
        <input {...getInputProps()} name="file" className="sr-only" />

        <div className="flex cursor-pointer flex-col items-center">
          <img
            src="/images/icons/Upload.png"
            alt="upload"
            width={50}
            height={50}
            className="mb-2 fill-white object-contain text-white"
          />

          <span className="mb-2 block text-lg font-semibold text-white">
            {resources["drag-and-drop"]}
          </span>

          <p className="mb-2 block text-sm font-medium text-[#d1d6e0]">
            {`${AVAILABE_FILE_TYPES.reduce((acc, type, index) => {
              const value = Object.values(type)[0];
              return (
                acc +
                (index < AVAILABE_FILE_TYPES.length - 1
                  ? `${value}, `
                  : `${value}`)
              );
            }, "")} ${resources["max-files-total"]}`}
          </p>
        </div>
      </div>

      <FilePreviews removeFile={removeFile} acceptedFiles={acceptedFiles} />

      <FileErrorMessages fileRejections={fileRejections} />
    </>
  );
}
