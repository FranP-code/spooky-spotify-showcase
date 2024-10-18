export const PlaceholderDataLink = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <a
        href="/?placeholder-data=true"
        className="text-center text-lg text-white text-opacity-40 backdrop-blur-lg backdrop-filter transition-all duration-300 ease-in-out hover:text-opacity-60 hover:underline"
      >
        {text}
      </a>
    </div>
  );
};

export default PlaceholderDataLink;
