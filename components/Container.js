export default function Container({ children,}) {
  return (
    <div className=" container-fluid px-5 mx-auto">
      {children}
    </div>
  );
}
