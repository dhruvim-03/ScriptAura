import {Link} from "react-router-dom"

const BookCard = ({data}) => {

  return (
  <>
  <Link to={`/view-book-details/${data._id}`}>
  <div className="bg-stone-400 rounded p-4 flex flex-col">
    <div className="bg-stone-900 rounded flex items-center justify-center">
      <img src={data.url} alt="/" className="h-[30vh]"/>
    </div>
    <h2 className= "mt-4 text-center text-2xl text-zinc-50 font-semibold"> {data.title} </h2>
    <p className="mt-2 text-center text-xl text-zinc-900 font-semibold"> by {data.author}</p>
    <p className="mt-4 text-center text-xl text-zinc-100 text-sm font-semibold"> GENRE: {data.genre || "Unknown Genre"}</p>
    <p className="mt-2 text-zinc-800 text-center font-semibold text-xl">PRICE: ₹ {data.price}</p>
  </div>
  </Link>
  </>
  );
};
export default BookCard
