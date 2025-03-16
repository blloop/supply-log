import load from "./assets/load.svg"

export default function Loader() {
  return (
    <div className="absolute flex justify-center items-center inset-0 bg-[#00000066] z-50">
      <img className="w-36 h-36" src={load}></img>
    </div>
  )
}
