export default function Modal(props: any) {
    return (
      <div className="relative w-auto m-2 bg-white text-black min-w-[450px] p-[40px] rounded-[10px]">
        { props.children }
      </div>
    );
  }