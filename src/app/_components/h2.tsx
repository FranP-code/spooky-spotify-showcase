export function TypographyH2(props: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const { children, className, ...otherProps } = props;
  return (
    <h2
      {...otherProps}
      className={`scroll-m-20 border-b border-none pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
}
