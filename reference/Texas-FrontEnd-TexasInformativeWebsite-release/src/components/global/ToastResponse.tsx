import { CircleAlert, CircleCheck } from "lucide-react";

export default function ToastResponse(props: {
  title?: string;
  message?: string;
  error?: boolean;
}) {
  const { title, message, error = false } = props;

  return (
    <div className="flex w-full items-center gap-2">
      <span className="shrink-0">
        {error ? (
          <CircleAlert className="size-6 rotate-180" />
        ) : (
          <CircleCheck className="size-6" />
        )}
      </span>

      <div className="flex-grow">
        {title && (
          <h6 className="text-base font-medium capitalize text-primary">
            {title}
          </h6>
        )}
        {message && (
          <p className="text-sm capitalize text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
